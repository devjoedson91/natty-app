import { useEffect, useState } from 'react';
import { Container, ContainerCategories, UserName } from './styles';

import ListCategories from '../../components/ListCategories';
import { api } from '../../services/api';
import * as Animatable from 'react-native-animatable';
import Loading from '../../components/Loading';
import { Logo } from '../../components/Logo';

export interface UserInfo {
    id: string;
    name: string;
    email: string;
}

export default function Dashboard() {
    const [userInfo, setUserInfor] = useState<UserInfo>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadUser() {
            setLoading(true);

            const response = await api.get('/userinfo');

            setUserInfor(response.data);
            setLoading(false);
        }

        loadUser();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            <Animatable.View 
                animation="fadeInDown" 
                delay={500} 
            >
                <Logo />
            </Animatable.View>

            <Animatable.View animation="fadeInUpBig" delay={500}>
                <UserName>{userInfo && `Bem vindo! ${userInfo?.name}.`}</UserName>
            </Animatable.View>

            <ContainerCategories>
                <Animatable.View animation="fadeIn" delay={1500}>
                    <ListCategories />
                </Animatable.View>
            </ContainerCategories>
        </Container>
    );
}