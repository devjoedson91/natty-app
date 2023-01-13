import styled from "styled-components/native";

export const Container = styled.View`

    width: 100%;
    
`;

export const ButtonCategory = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.primary};
    width: 110px;
    height: 110px;
    border-radius: 9px;
    justify-content: center;
    align-items: center;
`;

export const IconCategory = styled.Image`
    width: 60px;
    height: 60px;
`;

export const ContainerCategory = styled.View`

    width: 110px;
    margin: 5px;
`;

export const Name = styled.Text`

    margin-top: 7px;
    font-size: 16px;
    text-align: center;
    color: ${({theme}) => theme.colors.text};
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-size: 18px;
    text-transform: uppercase;
    font-family: ${({theme}) => theme.fonts.medium};
    margin-bottom: 15px;
`;