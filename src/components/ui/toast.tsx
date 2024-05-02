// REACT NATIVE IMPORTS
import { ToastAndroid } from "react-native";

type ToastDuration = typeof ToastAndroid.LONG | typeof ToastAndroid.SHORT;

export const Toast = {
    show: (message: string, duration: ToastDuration = ToastAndroid.SHORT): void => {
        ToastAndroid.show(message, duration);
    },

    success: (message: string = 'Request sent successfully!'): void => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    },

    error: (message: string = 'An error occurred!'): void => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
};