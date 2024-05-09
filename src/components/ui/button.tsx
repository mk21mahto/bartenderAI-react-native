// REACTJS IMPORTS
import { router } from "expo-router";
import React from "react";

// REACT NATIVE IMPORTS
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  variant?: string;
  textVariant?: string;
  onPress?: () => void;
  className?: string;
};

const styles = StyleSheet.create({
    defaultButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 64,
        paddingVertical: 16,
        borderRadius: 4,
        backgroundColor: '#e64b4f',
    },
    grayDefaultButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 64,
      paddingVertical: 16,
      borderRadius: 4,
      backgroundColor: '#6B7280',
    },
    mainButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 64,
        paddingVertical: 24,
        borderRadius: 4,
        backgroundColor: '#e64b4f',
    },
    bigButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 64,
        paddingVertical: 32,
        borderRadius: 4,
        backgroundColor: '#e64b4f',
    },
    defaultText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    bigText: {
        color: 'white',
        fontSize: 26,
        fontWeight: '500'
    }
});

const buttonVariants = {
  default: styles.defaultButton,
  gray: styles.grayDefaultButton,
  main: styles.mainButton,
  big: styles.bigButton,
};

const textVariants = {
  default: styles.defaultText,
  big: styles.bigText,
}

export const Button = ({
  children,
  variant = "default",
  textVariant = "default",
  onPress,
  className,
}: ButtonProps) => {
  const buttonStyle = buttonVariants[variant];
  const textStyle = textVariants[textVariant];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      className={className}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};
