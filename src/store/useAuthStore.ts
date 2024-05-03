// ZUSTAND
import { create } from 'zustand';

// ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
    privateKey: string | null;
    setPrivateKey: (key: string) => void;
    removePrivateKey: () => void;
    loadPrivateKey: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
    privateKey: null,
    setPrivateKey: (key: string) => {
        AsyncStorage.setItem('privateKey', key);
        set({ privateKey: key });
    },
    removePrivateKey: async () => {
        try {
            await AsyncStorage.removeItem('privateKey');
            set({ privateKey: null });
        } catch (error) {
            console.error('Failed to remove private key:', error);
        }
    },
    loadPrivateKey: async () => {
        try {
            const storedKey = await AsyncStorage.getItem('privateKey');
            set({ privateKey: storedKey || null });
        } catch (error) {
            console.error('Failed to load private key:', error);
            set({ privateKey: null });
        }
    },
}));

export default useAuthStore;