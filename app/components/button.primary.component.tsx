import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from "../constants/colors.constant";

interface ButtonPrimaryProps {
    title: string;
    onPress: () => void;
    isPressed?: boolean;
}

export default function ButtonPrimary({ title, onPress, isPressed }: ButtonPrimaryProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={isPressed}>
            {
                isPressed ? (
                    <ActivityIndicator size="small" color={Colors.offWhite}/>
                ) : (
                    <Text style={styles.buttonText}>{title}</Text>
                )
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
        height: 50,
        justifyContent: "center", 
        alignItems: "center", 
    },
    buttonText: {
        color: Colors.offWhite,
        textAlign: "center",
        fontSize: RFValue(16),
    }
});
