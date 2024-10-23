import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors.constant";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps {
    title: string;
    onPress: () => void;
    color?: string;
}

export default function Button({ title, onPress, color }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.buttonText &&
                { color: color ? color : Colors.primary }
            }>{title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        textAlign: "center",
        fontSize: RFValue(16),
    },
});