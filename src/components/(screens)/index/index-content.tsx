// REACTJS IMPORTS
import React from "react";

// REACT NATIVE IMPORTS
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// COMPONENTS
import { Input } from "@/components/ui/input";
import { Link } from "expo-router";

export const IndexContent = () => {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1">
            <Input placeholder="Your private key..." />

            <Link href="(screens)/home">Go to home</Link>
        </View>
    );
}