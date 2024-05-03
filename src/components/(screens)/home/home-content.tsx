// REACTJS IMPORTS
import React, { useState } from "react";

// REACT NATIVE IMPORTS
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// COMPONENTS
import { Button } from "@/components/ui/button";

// LUCIDE ICONS
import { Mic } from "lucide-react-native";

export const HomeContent = () => {
    const { top, bottom } = useSafeAreaInsets();

    const [language, setLanguage] = useState('');

    const handleSetLanguageEnglish = () => {
        setLanguage("English");
    };

    const handleSetLanguageSpanish = () => {
        setLanguage("Spanish");
    };

    const handleResetLanguage = () => {
        setLanguage('');
    };

    const handleStartRecognizing = () => {

    };

    const viewClass = language ? "flex flex-1 justify-between" : "flex flex-1 mt-10";

    return (
        <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1">
            <View className={viewClass}>
                <View className="flex items-center">
                    <Text className="font-bold text-2xl">Welcome to Tallat Coffee</Text>
                    {language ? (
                        <Button onPress={handleResetLanguage} className="mt-5">Change language</Button>
                    ) : (
                        <Text>To order, please choose the language first</Text>
                    )}
                </View>

                <View className="flex items-center">
                    {!language && (
                        <View className="flex flex-col mt-36 gap-y-3">
                            <Text>Please choose the language</Text>
                            <Button onPress={handleSetLanguageEnglish}>English</Button>
                            <Button onPress={handleSetLanguageSpanish}>Spanish</Button>
                        </View>
                    )}
                    {language && (
                        <View className="flex border border-red-500 p-7 rounded-full">
                            <Mic color="gray" size={64} />
                        </View>
                    )}
                </View>

                {language && (
                    <View className="flex items-center">
                        <Button onPress={() => console.log('Starting...')} className="w-[90%]">Start</Button>
                    </View>
                )}
            </View>
        </View>
    );
};