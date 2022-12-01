import React, { useState, createContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {StackParamsList} from '../routes/app.routes';

// tipagens

type AuthContextData = {

    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>; // <void> promise nao vai devolver nada
    signUp: (credentials: SignUpProps) => Promise<void>;
    signOut: () => Promise<void>;
    goToMyReservations: () => void;
    loadingAuth: boolean;
    loading: boolean

}

type UserProps = {

    id: string;
    name: string;
    email: string;
    token: string;

}

type AuthProviderProps = {

    children: ReactNode;

}

type SignInProps = {

    email: string;
    password: string;

}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [user, setUser] = useState<UserProps>({

        id: '',
        name: '',
        email: '',
        token: ''

    });

    const [loadingAuth, setLoadingAuth] = useState(false); // controle ao logar, se esta carregando ou não
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name; // se user.name for vazio, essa variavel terá valor false e vice versa

    useEffect(() => {

        async function getUser() {
            // pegar os dados salvos do user

            const userInfo = await AsyncStorage.getItem('@nattyapp');

            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            // verificar se recebemos as informações

            if (Object.keys(hasUser).length > 0) {

                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

                setUser({ 
                    id: hasUser.id, 
                    name: hasUser.name, 
                    email: hasUser.email, 
                    token: hasUser.token 
                });

            }

            setLoading(false);

        }

        getUser();

    }, []);

    async function signUp({name, email, password}: SignUpProps) {

        setLoadingAuth(true);

        try {

            const response = await api.post('/users', { name, email, password });
            setLoadingAuth(false);

        } catch(err) {
            console.log('ERRO AO CADASTRAR: ', err);
            setLoadingAuth(false);
        }

    }

    // metodo para fazer login

    async function signIn({email, password}: SignInProps) {

        setLoadingAuth(true);

        try {

            const response = await api.post('/session', { email, password })

            const { id, name, token } = response.data;

            const data = { ...response.data }

            await AsyncStorage.setItem('@nattyapp', JSON.stringify(data));

            // informando o token do usuario para todas as rotas

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({ id, name, email, token });

            setLoadingAuth(false);

        } catch(err) {

            console.log('erro ao acessar', err);
            setLoadingAuth(false);
        }

    }

    // metodo para fazer logout

    async function signOut() {

        await AsyncStorage.clear()
            .then(() => {

                setUser({ id: '', name: '', email: '', token: '' });

            })

    }

    function goToMyReservations() {

        navigation.navigate('MyReservations');

    }

    return (

       <AuthContext.Provider value={{ user, isAuthenticated, loading, loadingAuth, signIn, signOut, signUp, goToMyReservations }}>

            {children}

       </AuthContext.Provider>

    );

}