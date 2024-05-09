// REACTJS IMPORTS
import React, { useState, useEffect } from "react";

// REACT NATIVE IMPORTS
import { View, Text, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import { router } from "expo-router";

// LIBRARIES
import axios from 'axios';

// CONFIG
import { AWS_EC2_PATH } from "@/config";

// COMPONENTS
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastUtil } from "@/components/ui/toast";

// STORES
import useAuthStore from '@/store/useAuthStore';

const logoPath = "@/assets/images/logo/logo_design_part_transparent.png";

export const IndexContent = () => {
    const { bottom } = useSafeAreaInsets(); // No need for "top" because it gives additional padding and our things wont be really centered but slightly off

    const { loadPrivateKey, privateKey, setPrivateKey } = useAuthStore();
    const [inputPrivateKey, setInputPrivateKey] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await loadPrivateKey();
        };
        fetchData();
    }, [loadPrivateKey]);

    useEffect(() => {
        if (privateKey) {
            router.replace("(screens)/home");
        }
    }, [privateKey, router]);

    const handleSubmitPrivateKey = async () => {
        try {
            const response = await axios.post(`${AWS_EC2_PATH}/api/reactnative/check_private_key`, {
                private_key: inputPrivateKey
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                ToastUtil.success(response.data.success);

                const incrementResponse = await axios.post(`${AWS_EC2_PATH}/api/reactnative/increment_private_key_usage`, {
                    private_key: inputPrivateKey
                });

                if (incrementResponse.status === 200) {
                    console.log("Usage incremented successfully.");
                    setPrivateKey(inputPrivateKey);
                    router.replace("(screens)/home");
                } else {
                    ToastUtil.error("Failed to increment usage");
                }
            } else {
                ToastUtil.error(response.data.error || "Private key incorrect!");
            }
        } catch (error) {
            if (error.response) {
                ToastUtil.error(error.response.data.error || "Private key incorrect, or something else went wrong!");
            } else {
                ToastUtil.error("Network error or server did not respond.");
            }
        }
    };

    return (
        <View style={{ paddingBottom: bottom }} className="flex flex-1 gap-y-28">
            <View className="flex mt-16 items-center">
                <Image source={require(logoPath)} style={styles.logoImage} />
            </View>
            <View className="flex flex-col items-center gap-y-5">
                <Text className="font-bold text-2xl">Private key</Text>
                <Input
                    placeholder="Your private key..."
                    className="w-[90%]"
                    value={inputPrivateKey}
                    onChangeText={setInputPrivateKey}
                />
                <Button onPress={handleSubmitPrivateKey} className="w-[90%] py-5">
                    Submit
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logoImage: {
        width: 80,
        height: 80
    }
});