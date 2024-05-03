// REACTJS IMPORTS
import React from 'react';

// REACT NATIVE IMPORTS
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
    children: React.ReactNode;
    variant?: string;
    onPress?: () => void;
    className?: string;
}

const styles = StyleSheet.create({
    defaultButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 64,
        paddingVertical: 16,
        borderRadius: 4,
        backgroundColor: '#e64b4f',
    },
    mainButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 64,
        paddingVertical: 24,
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

export const Button = ({ 
    children, 
    variant = 'default', 
    onPress,
    className,
}: ButtonProps) => {
    const buttonStyle = buttonVariants[variant];

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle} className={className}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};