// REACTJS IMPORTS
import React from "react";

// REACT NATIVE IMPORTS
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import { Link } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";

// LUCIDE ICONS
import { Mic } from "lucide-react-native";

export const HomeContent = () => {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1">
            <View className="flex flex-1 justify-between">
                <View className="flex flex-row">
                    <Text>Home Component</Text>
                    
                    <Link href="(screens)/order">Go to Order</Link>
                </View>

                <View>
                    <Mic size={24} />
                </View>

                <View>
                    <Button>Start</Button>
                </View>
            </View>
        </View>
    )
}