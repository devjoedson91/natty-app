import styled from "styled-components/native";

export const Container = styled.View`

    flex: 1;
    background-color: ${({theme}) => theme.colors.white};
    padding: 15px;
    

`;

export const UserName = styled.Text`

    font-size: 18px;
    font-family: ${({theme}) => theme.fonts.bold};
    text-align: center;
    margin-top: 20px;
    color: ${({theme}) => theme.colors.text};

`;

export const ContainerCategories = styled.View`
    
    flex: 1;
    justify-content: center;
`;

export const Logo = styled.Image`
    margin-top: 20px;
    align-self: center;

`;