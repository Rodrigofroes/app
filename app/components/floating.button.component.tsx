import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import ButtonIcon from './button.icon.component';
import Colors from '../constants/colors.constant';

interface FloatingButtonProps {
    onPress: () => void;
    onTrashPress: () => void;
    style?: any;
}

export default function FloatingButton({ onPress, onTrashPress, style }: FloatingButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1;

        Animated.timing(animation, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setIsOpen(!isOpen);
    };

    const trashStyle = {
        transform: [
            {
                scale: animation,
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -80], // Muda para -80 para dar mais espaço ao movimento
                }),
            },
        ],
        opacity: animation, // Controla a opacidade para aparecer/desaparecer
    };

    return (
        <View style={styles.container}>
            {/* Botão de Lixo */}
            <TouchableWithoutFeedback onPress={onTrashPress}>
                <Animated.View style={[styles.button, styles.trash, trashStyle]}>
                    <ButtonIcon
                        name="trash"
                        onPress={onTrashPress}
                        color="#fff"
                        backgroundColor="#f00"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
            
            {/* Botão Principal */}
            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu]}>
                    <ButtonIcon
                        name="plus"
                        onPress={onPress}
                        color="#fff"
                        backgroundColor="#000"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 20,
        marginBottom: 10,
    },
    menu: {
        backgroundColor: Colors.primary,
    },
    trash: {
        backgroundColor: Colors.primary,
        color: '#fff',
    },
});
