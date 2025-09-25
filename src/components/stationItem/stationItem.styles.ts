import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    stationItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    stationInfo: {
        flex: 1,
        minWidth: 0,
        paddingRight: 12,
        flexShrink: 1,
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
        alignItems: 'center',
        flexShrink: 0,
        width: 88,
        justifyContent: 'flex-end',
    },
    stationActionSpacer: {
        marginLeft: 15,
    },
})