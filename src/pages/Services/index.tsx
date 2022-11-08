import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { 
    Container, 
    ContainerService, 
    Price, 
    ButtonReserve, 
    ButtonText, 
    ServiceName,
    ListServices,
    AreaDescription
} from "./styles";

import { formatPrice } from '../../util/format';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { StackParamsList } from '../../routes/app.routes';

type RouteDetailsParams = {
    Service: {
        category_id: string;
    }   
}

type ServiceRouteProps = RouteProp<RouteDetailsParams, 'Service'>;

interface ServiceProps {
    id: string;
    name: string;
    price: string;
    category_id: string;
}

export default function Services() {

    const route = useRoute<ServiceRouteProps>();

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [services, setServices] = useState<ServiceProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState(route.params.category_id);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadServices() {

            setLoading(true);

            const response = await api.get('/category/service', {
                params: {category_id: categorySelected}
            });

            setServices(response.data);
            setLoading(false);

        }

        loadServices();

    }, [categorySelected]);

    function openReserve(service_id: string) {

        navigation.navigate('Reserve', {service_id});

    }

    if (loading) {

        return (
            <Text>Carregando serviços...</Text>
        );
    }

    return (
        <Container>
            {
                services.length <= 0 ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Sem serviços para a categoria selecionada</Text>
                    </View>
                ) : (
                    <ListServices 
                        data={services}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => 
                            <ContainerService>
                                <AreaDescription>
                                    <ServiceName>{item.name}</ServiceName>
                                    <Price>{formatPrice(item.price)}</Price>
                                </AreaDescription>
                                <ButtonReserve onPress={() => openReserve(item.id)}>
                                    <ButtonText>Reservar</ButtonText>
                                </ButtonReserve>
                            </ContainerService>
                        }
                    />
                )
            }
            
        </Container>
    );

}