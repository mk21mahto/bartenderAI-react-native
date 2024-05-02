import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    defaultButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 64,
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: '#e64b4f',
    },
    mainButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 224,
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: '#e64b4f',
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    }
});

const buttonVariants = {
    default: styles.defaultButton,
    main: styles.mainButton
};

export const Button = ({ children, variant = 'default', onPress }) => {
    const buttonStyle = buttonVariants[variant];

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};