import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
    },
    header: {
        marginVertical: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },

    currentStationContainer: {
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: '#333',
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    currentStationText: {
        color: '#fff',
    },
    currentStationTitle: {
        color: '#fff',
        fontSize: 16,
        marginTop: 5,
    },
    currentStationControls: {
        flexDirection: 'row',
        gap: 20,
    },
    currentStationControlText: {
        color: '#fff',
        fontSize: 16,
    },
    genreContainer: {
        marginBottom: 16,
        padding: 20
    },
    genreBtn: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%'
    },
    genreText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    genreDropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginTop: 2,
        backgroundColor: '#fff',
    },
    genreDropdownList: {
        maxHeight: 500,
    },
    genreDropdownText: {
        padding: 12
    },
    list: {
        width: '100%'
    }

})