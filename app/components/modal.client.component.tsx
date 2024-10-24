import React, { useEffect, useState } from "react";
import { View, Modal, StyleSheet, Dimensions, Text } from "react-native";
import Colors from "../constants/colors.constant";
import ButtonPrimary from "./button.primary.component";
import Input from "./input.component";
import { RFValue } from "react-native-responsive-fontsize";
import dados from "../../fakedata.json";

const { height } = Dimensions.get('window');


interface ModalInputProps {
    close: () => void;
    modalVisible: boolean;
    id: string;
    fields: {
        name: string;
        placeholder: string;
        value: string;
        onChange: (value: string) => void;
        error?: string;
        keyboardType?: string;
    }[];
    onConfirm: () => void;
    title?: string;
    name: string;
}


export default function ModalInput({ id, close, modalVisible, fields, onConfirm, title = "Detalhes", name }: ModalInputProps) {

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
                            <Text style={styles.modalTitle}>{title}</Text>
                        </View>
                        <View style={styles.input}>
                            {fields.map((field, index) => (
                                <View key={index}>
                                    <Input
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={field.value}
                                        onChange={field.onChange}
                                        boardType={field.keyboardType as any}
                                    />
                                    {field.error && <Text style={styles.error}>* {field.error}</Text>}
                                </View>
                            ))}
                        </View>
                        <View>
                            <ButtonPrimary title={name} onPress={onConfirm} />
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
