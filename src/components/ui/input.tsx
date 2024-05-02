// REACTJS IMPORTS
import React from 'react';

// REACT NATIVE IMPORTS
import { TextInput, StyleSheet } from 'react-native';

type InputProps = {
    placeholder: string;
    variant?: string;
    isNumber?: boolean;
    className?: string;
    value?: string;
    onChangeText?: (text: string) => void;
}

const styles = StyleSheet.create({
    defaultInput: {
        backgroundColor: '#D8D8D8',
        padding: 12,
        borderRadius: 20,
    }
});

const inputVariants = {
    default: styles.defaultInput
}

export const Input = ({
    variant = 'default',
    placeholder,
    isNumber,
    className,
    value,
    onChangeText
}: InputProps) => {
    const inputStyle = inputVariants[variant];

    return (
        <TextInput
            style={inputStyle}
            placeholder={placeholder}
            keyboardType={isNumber ? "numeric" : "default"}
            className={className}
            value={value}
            onChangeText={onChangeText}
        />
    );
};