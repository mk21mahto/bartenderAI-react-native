// REACT NATIVE IMPORTS
import Toast from 'react-native-root-toast';

export const ToastUtil = {
    show: (message: string, duration?: number) => {
        // Defaulting to long duration if not specified
        let toastDuration = duration ? duration : Toast.durations.LONG;
        return Toast.show(message, {
            duration: toastDuration
        });
    },

    success: (message: string = 'Request sent successfully!') => {
        return Toast.show(message, {
            duration: Toast.durations.SHORT,
            backgroundColor: 'green'
        });
    },

    error: (message: string = 'An error occurred!') => {
        return Toast.show(message, {
            duration: Toast.durations.SHORT,
            backgroundColor: 'red'
        });
    }
};