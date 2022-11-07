import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Services from '../pages/Services';
import Reserve from '../pages/Reserve';

import { Feather } from '@expo/vector-icons';
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
}

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {

    const { signOut } = useContext(AuthContext);

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
                    }}
                />

        </Stack.Navigator>

    );
}

export default AppRoutes;