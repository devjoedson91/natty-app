import { View, StyleSheet, Text } from "react-native";

export function Logo() {

    return (
        <View style={styles.containerLogo}>
            <Text style={styles.natty}>Natty</Text>
            <Text style={styles.app}>App</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerLogo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    natty: {
        fontSize: 50,
        fontFamily: 'Inter_800ExtraBold',
        marginRight: 5,
        color: '#ee4691',
    },
    app: {
        fontSize: 50,
        fontFamily: 'Inter_800ExtraBold',
        color: '#5841AD'
    }
});