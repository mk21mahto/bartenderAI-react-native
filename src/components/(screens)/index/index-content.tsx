// REACTJS IMPORTS
import React, { useState } from "react";

// REACT NATIVE IMPORTS
import { View, Text, Image } from "react-native";
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
import { Toast } from "@/components/ui/toast";

const logoPath = "@/assets/images/logo/logo_design_part_transparent.png";

export const IndexContent = () => {
    const { bottom } = useSafeAreaInsets(); // No need for "top" because it gives additional padding and our things wont be really centered but slightly off

    const [privateKey, setPrivateKey] = useState('');

    const handleSubmitPrivateKey = async () => {
        try {
            const response = await axios.post(`${AWS_EC2_PATH}/api/reactnative/check_private_key`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    private_key: privateKey
                })
            });

            if (response.status === 200) {
                Toast.success(response.data.message);
                router.replace("(screens)/home"); // Redirect to home after success, I used .replace so it forbids when you go back on phone to go back on the last page
            } else {
                Toast.error(response.data.error);
            }
        } catch (error) {
            Toast.error('Failed to check private key.');
        }
    };

    return (
        <View style={{ paddingBottom: bottom }} className="flex flex-1 gap-y-28">
            <View className="flex mt-16 items-center">
                <Image 
                    source={require(logoPath)} 
                    className="w-20 h-20"
                />
            </View>

            <View className="flex flex-col items-center gap-y-5">
                <Text className="font-bold text-2xl">Private key</Text>
                <Input 
                    placeholder="Your private key..." 
                    className="w-[90%]" 
                    value={privateKey}
                    onChangeText={setPrivateKey}
                />
                <Button onPress={handleSubmitPrivateKey} className="w-[90%] py-5">Submit</Button>
            </View>

            {/*<Link href="(screens)/home">Go to home</Link>*/}
        </View>
    );
}