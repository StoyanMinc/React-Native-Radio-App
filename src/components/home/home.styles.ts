import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        color: '#aaa',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    ctaButton: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 8,
    },
    ctaText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerPlayer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#333',
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footerSubtitle: {
        color: '#999',
        fontSize: 12,
        marginTop: 4,
    },
    footerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
});

