import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    stationItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    stationTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    stationGenre: {
        fontSize: 14,
        color: '#666',
    },
    stationAction: {
        flexDirection: 'row',
        gap: 15,
    },
})