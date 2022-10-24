import React from 'react';
import { StatusBar } from 'react-native';
console.disableYellowBox = true;
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <StatusBar translucent={false} />
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
