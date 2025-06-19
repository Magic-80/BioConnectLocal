import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DetailsOperator = ({ visible, onClose, operateur }) => {
    if (!operateur) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{operateur.nom}</Text>
                    <Text style={styles.label}>Activité:</Text>
                    <Text style={styles.value}>{operateur.domaine_activite}</Text>
                    <Text style={styles.label}>Adresse:</Text>
                    <Text style={styles.value}>{operateur.adresse || 'Adresse non spécifiée'}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        elevation: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#2E7D32',
    },
    label: {
        fontWeight: '600',
        marginTop: 8,
    },
    value: {
        marginBottom: 8,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DetailsOperator;