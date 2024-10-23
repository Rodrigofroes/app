import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Colors from '../constants/colors.constant';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

interface FloatingButtonProps {
    onTrashPress: () => void;
    style?: any;
    onAddClient: () => void;
    isTrashOpen?: boolean;
}

export default function FloatingButton({ onTrashPress, onAddClient, isTrashOpen }: FloatingButtonProps) {
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
                    outputRange: [0, -140],
                }),
            },
        ],
        opacity: animation,
    };

    const addStyle = {
        transform: [
            {
                scale: animation,
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -70],
                }),
            },
        ],
        opacity: animation,
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onTrashPress}>
                {
                    isTrashOpen ? (
                        <Animated.View style={[styles.button, styles.menu, trashStyle]}>
                            <Ionicons name="checkmark" size={24} color={Colors.offWhite} />
                        </Animated.View>

                    ) : (
                        <Animated.View style={[styles.button, styles.trash, trashStyle]}>
                            <Ionicons name="trash-outline" size={24} color={Colors.offWhite} />
                        </Animated.View>
                    )
                }
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={onAddClient}>
                <Animated.View style={[styles.button, styles.menu, addStyle]}>
                    <Ionicons name="add-outline" size={24} color={Colors.offWhite} />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu]}>
                    <Ionicons name="ellipsis-vertical" size={24} color={Colors.offWhite} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 70,
        right: 50,
    },
    button: {
        position: 'absolute',
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: (width * 0.15) / 2,
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
    },
});
