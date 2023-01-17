import styled, {css} from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: ${({theme}) => theme.colors.white};
`;

export const ContainerReservations = styled.View`
    width: 100%;
    /* height: 120px; */
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.colors.grayLight};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 15px;
`;

export const ButtonText = styled.Text`
    font-size: 14px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.white};
`;

interface ButtonProp {
    isFinalized: boolean;
}

export const ButtonReserve = styled.TouchableOpacity<ButtonProp>`
    width: 147px;
    height: 38px;
    border-radius: 6px;
    ${props => css`background-color: ${props.isFinalized ? '#C4A7D0' : '#5841AD'};`}
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const AreaDescription = styled.View`
    
    justify-content: flex-end;
    
`;

export const ServiceName = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text};
    margin-bottom: 5px;
`;

export const Price = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.blue400};
    margin-left: 5px;
`;

export const Hour = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.gray400};
    margin-left: 5px;
`;

export const Date = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.gray400};
    margin-left: 5px;
`;