import React, { useState } from "react";
import { View, Button, Modal, StyleSheet, Dimensions } from "react-native";
import { Picker } from '@react-native-picker/picker';

const { height } = Dimensions.get('window');

export default function Select() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>("");

    function open() {
        setModalVisible(true);
    }

    function close() {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Button title="Open Picker" onPress={open} />
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={close}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue as string)}
                        >
                            <Picker.Item label="Opção 1" value="opcao1" />
                            <Picker.Item label="Opção 2" value="opcao2" />
                            <Picker.Item label="Opção 3" value="opcao3" />
                        </Picker>
                        <Button title="Close" onPress={close} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end', // Alinha o conteúdo na parte inferior
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    },
    modalContent: {
        height: height * 0.5, // Define o modal para ocupar metade da tela
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
