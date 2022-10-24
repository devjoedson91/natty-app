import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';

import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

export type StackParamsList = {
    Dashboard: undefined;
}

function AppRoutes() {

    const { signOut } = useContext(AuthContext);

    return (

        <Stack.Navigator>

                <Stack.Screen name='Dashboard' component={Dashboard} options={{
                    title: 'Sair',
                    headerStyle: {
                        backgroundColor: '#fff'
                    },
                    headerTintColor: '#363238',
                    headerLeft: () => (

                        <TouchableOpacity 
                            style={{marginRight: 12}}
                            onPress={signOut}
                        >
                            <Feather name="log-out" size={28} color='#ff3f4b' />
                        </TouchableOpacity>

                    )
                    
                }}/>

        </Stack.Navigator>

    );
}

export default AppRoutes;