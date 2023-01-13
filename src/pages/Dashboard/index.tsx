import React, { useEffect, useState } from 'react';
import { Container, Logo, ContainerCategories, UserName } from './styles';

import ListCategories from '../../components/ListCategories';
import { api } from '../../services/api';
import * as Animatable from 'react-native-animatable';
import Loading from '../../components/Loading';

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
            <Animatable.View animation="fadeInDown" delay={500}>
                <Logo source={require('../../assets/logo.png')} />
            </Animatable.View>

            <Animatable.View animation="fadeInUpBig" delay={500}>
                <UserName>{userInfo && `Bem vindo(a), ${userInfo?.name}.`}</UserName>
            </Animatable.View>

            <ContainerCategories>
                <ListCategories />
            </ContainerCategories>
        </Container>
    );
}
