import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Services from '../pages/Services';
import Reserve from '../pages/Reserve';
import MyReservations from '../pages/MyReservations';

import { Feather, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';

export type StackParamsList = {
    Dashboard: undefined;
    Services: {
        category_id: string;
    };
    SignUp: undefined;
    Reserve: {
        service_id: string;
    };
    MyReservations: undefined;
}

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {

    const { signOut, goToMyReservations } = useContext(AuthContext);

    return (

        <Stack.Navigator>

                <Stack.Screen name='Dashboard' component={Dashboard} options={{
                    title: 'Dashboard',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#5841AD',
                    },
                    headerShadowVisible: false, // applied here
                    contentStyle: {
                        borderTopWidth: 1,
                        borderColor: '#A5A4B4'
                    },
                    headerLeft: () => (

                        <TouchableOpacity 
                            style={{marginRight: 12}}
                            onPress={signOut}
                        >
                            <Feather name="log-out" size={28} color='#ff3f4b' />
                        </TouchableOpacity>

                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={goToMyReservations}
                        >
                            <AntDesign name="calendar" size={30} color="black" />
                        </TouchableOpacity>
                    )                  
                }}/>

                <Stack.Screen name='Services' component={Services} options={{
                    title: 'Serviços',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#5841AD'
                    },
                    headerShadowVisible: false, // applied here
                    contentStyle: {
                        borderTopWidth: 1,
                        borderColor: '#A5A4B4'
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={goToMyReservations}
                        >
                            <AntDesign name="calendar" size={30} color="black" />
                        </TouchableOpacity>
                    )
                }} />

                <Stack.Screen 
                    name='Reserve'
                    component={Reserve}
                    options={{
                        title: 'Fazer reserva',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            color: '#5841AD'
                        },
                        headerShadowVisible: false, // applied here
                        contentStyle: {
                            borderTopWidth: 1,
                            borderColor: '#A5A4B4'
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={goToMyReservations}
                            >
                                <AntDesign name="calendar" size={30} color="black" />
                            </TouchableOpacity>
                        )
                    }}
                />

                <Stack.Screen 
                    name='MyReservations' 
                    component={MyReservations} 
                    options={{
                        title: 'Minhas reservas',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            color: '#5841AD'
                        },
                        headerShadowVisible: false,
                        contentStyle: {
                            borderTopWidth: 1,
                            borderColor: '#A5A4B4'
                        },
                    }}
                 />

        </Stack.Navigator>

    );
}

export default AppRoutes;