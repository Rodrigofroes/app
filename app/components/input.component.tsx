import { TextInput, StyleSheet, Text, View, TouchableOpacity, KeyboardTypeOptions } from "react-native";
import { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../constants/colors.constant";
import { Ionicons } from "@expo/vector-icons";

interface InputProps {
    placeholder: string;
    isPassword?: boolean;
    name?: string;
    onChange: (value: string) => void;
    value: string;
    isSerch?: boolean;
    boardType?: KeyboardTypeOptions;
}

export default function Input({ placeholder, name, isPassword, onChange, value, isSerch, boardType }: InputProps) {
    
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <View>
            <Text style={styles.label}>{name}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    keyboardType={boardType || "default"}
                    placeholderTextColor={Colors.blackInput}
                    secureTextEntry={isPassword && !showPassword}
                    style={[
                        styles.input,
                        isFocused && { borderColor: Colors.primary }
                    ]}
                    placeholder={placeholder}
                    onChangeText={onChange}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            color={Colors.blackInput}
                        />
                    </TouchableOpacity>
                )}
                {isSerch && (
                    <TouchableOpacity
                        style={styles.searchIcon}
                    >
                        <Ionicons
                            name={"search-outline"}
                            size={24}
                            color={Colors.blackInput}
                            style={{ marginRight: 10 }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: RFValue(16),
        color: Colors.black,
        marginBottom: 5,
    },
    inputContainer: {
        position: "relative",
    },
    input: {
        backgroundColor: Colors.offWhite,
        padding: 10,
        borderRadius: 10,
        height: 50,
        borderWidth: 2,
        borderColor: Colors.blackInput,
        paddingRight: 40, // Espaço para o ícone de olho
    },
    eyeIcon: {
        position: "absolute",
        right: 10,
        top: 13,
    },
    searchIcon: {
        position: "absolute",
        right: 10,
        top: 13,
    },
});
