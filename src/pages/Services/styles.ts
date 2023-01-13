import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const ContainerService = styled.View`

    width: 100%;
    height: 100px;
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.colors.grayLight};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
`;

export const Price = styled.Text`

    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.blue400};
    margin-left: 5px;

`;

export const ServiceName = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text};
`;

export const ButtonReserve = styled.TouchableOpacity`
    width: 93px;
    height: 38px;
    border-radius: 6px;
    background-color: ${({theme}) => theme.colors.blue400};
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const ButtonText = styled.Text`
    font-size: 14px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.white};
`;

export const ListServices = styled.FlatList``;

export const AreaDescription = styled.View`
    
    justify-content: flex-end;
    
`;