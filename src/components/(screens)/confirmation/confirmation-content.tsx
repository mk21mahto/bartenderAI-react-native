// REACTJS IMPORTS
import React from "react";

// REACT NATIVE IMPORTS
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import { Link, router } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";

export const ConfirmationContent = () => {
    const { top, bottom } = useSafeAreaInsets();

    const routeToHome = () => {
        router.replace("(screens)/home");
    }
    return (
        <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1">
            <View className="flex flex-1 h-dvh">
                <View className="flex">
                    <Text>Your Order is confirmed</Text>
                    <Text>Order Id: 123456789</Text>
                    <Button variant="main" onPress={routeToHome}>Start New Order</Button>
                </View>

            </View>
        </View>
    )
}