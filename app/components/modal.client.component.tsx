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
    let [name, setName] = useState<string>('');
    let [cpf, setCpf] = useState<string>('');
    let [telefone, setTelefone] = useState<string>('');
    let [endereco, setEndereco] = useState<string>('');
    let [error, setError] = useState<{ [key: string]: string }>({});

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

    function validateInput() {
        let errors: { [key: string]: string } = {};
        let regex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;

        if (!name) {
            errors.name = "Nome não pode ser vazio";
        }

        if (!cpf) {
            errors.cpf = "CPF não pode ser vazio";
        } else if (!regex.test(cpf) || cpf.length !== 14 || cpf === "000.000.000-00") {
            errors.cpf = "CPF inválido";
        }

        if (!telefone) {
            errors.telefone = "Telefone não pode ser vazio";
        }

        if (!endereco) {
            errors.endereco = "Endereço não pode ser vazio";
        }

        setError(errors);
        return Object.keys(errors).length === 0; 
    }

    function handleConfirm() {
        if (validateInput()) {
            close();
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
                                {error.name && <Text style={styles.error}>* {error.name}</Text>}
                            </View>
                            <View>
                                <Input name="CPF:" placeholder="CPF" value={cpf} onChange={setCpf} boardType={"number-pad"} />
                                {error.cpf && <Text style={styles.error}>* {error.cpf}</Text>}
                            </View>
                            <View>
                                <Input name="Telefone:" placeholder="Telefone" value={telefone} onChange={setTelefone} boardType={"number-pad"} />
                                {error.telefone && <Text style={styles.error}>* {error.telefone}</Text>}
                            </View>
                            <View>
                                <Input name="Endereço:" placeholder="Endereço" value={endereco} onChange={setEndereco} />
                                {error.endereco && <Text style={styles.error}>* {error.endereco}</Text>}
                            </View>
                        </View>
                        <View>
                            <ButtonPrimary title="Confirmar" onPress={handleConfirm} />
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
    },
    error: {
        color: Colors.error,
        fontSize: RFValue(12),
    },
});
