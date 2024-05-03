// REACTJS IMPORTS
import React from "react";

// REACT NATIVE IMPORTS
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import { Link } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";

export const ConfirmationContent = () => {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1">
            <View className="flex flex-1 h-dvh justify-between">
                <View className="flex">
                    <Text>Confirmation Component</Text>
                    
                    <Link href="(screens)/home">Go to Home</Link>
                </View>

                <View>
                    <Button onPress={''}>Checkout</Button>
                </View>
            </View>
        </View>
    )
}