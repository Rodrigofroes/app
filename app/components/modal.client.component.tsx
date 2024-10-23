import React, { useEffect, useState } from "react";
import { View, Button, Modal, StyleSheet, Dimensions, Text } from "react-native";
import Colors from "../constants/colors.constant";
import ButtonPrimary from "./button.primary.component";
import Input from "./input.component";
import { RFValue } from "react-native-responsive-fontsize";
import dados from "../../fakedata.json";

const { height } = Dimensions.get('window');

interface ModalProps {
    close: () => void;
    modalVisible: boolean;
    id: string;
}

export default function ModalInput({ id, close, modalVisible }: ModalProps) {
    let [name, setName] = useState('');
    let [cpf, setCpf] = useState('');
    let [telefone, setTelefone] = useState('');
    let [endereco, setEndereco] = useState('');

    useEffect(() => {
        if (id) {
            getDados(id);

        }
    }, [id]);

    function getDados(id: string) {
        const dado = dados.clintes.lista.find((dado) => dado.id === id);
        if (dado) {
            setName(dado.nome);
            setCpf(dado.cpf);
            setTelefone(dado.telefone);
            setEndereco(dado.endereco);
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={close}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View>
                            <Text style={styles.modalTitle}>Detalhes</Text>
                        </View>
                        <View style={styles.input}>
                            <View>
                                <Input name="Nome:" placeholder="Nome Completo" value={name} onChange={setName} />
                            </View>
                            <View>
                                <Input name="CPF:" placeholder="CPF" value={cpf} onChange={setCpf} boardType={"number-pad"} />
                            </View>
                            <View>
                                <Input name="Telefone:" placeholder="Telefone" value={telefone} onChange={setTelefone} boardType={"number-pad"} />
                            </View>
                            <View>
                                <Input name="Endereço:" placeholder="Endereço" value={endereco} onChange={setEndereco} />
                            </View>
                        </View>
                        <View>
                            <ButtonPrimary title="Confirmar" onPress={close} />
                        </View>
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
        justifyContent: 'flex-end',
        backgroundColor: Colors.transparent,
    },
    modalContent: {
        height: height * 0.6,
        backgroundColor: Colors.offWhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    modalTitle: {
        fontSize: RFValue(20),
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        flexDirection: 'column',
        gap: 5,
    }
});
