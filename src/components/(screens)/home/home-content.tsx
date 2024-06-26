// REACT NATIVE IMPORTS
import { ScrollView, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import { router } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";

export const HomeContent = () => {
    const { top, bottom } = useSafeAreaInsets();

    const handleChooseAIOrder = () => {
        router.replace("(screens)/ai-order");
    }

    const handleChooseManualOrder = () => {
        router.replace("(screens)/manual-order");
    }

    return (
        <ScrollView style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1">
            <View className="flex flex-1 items-center">
                <Text className="font-bold text-2xl">Welcome to Tallat Coffee</Text>

                <View className="flex pt-5 items-center w-full gap-y-5">
                    <Button 
                        variant="big" 
                        textVariant="big"
                        className="w-[70%]"
                        onPress={handleChooseAIOrder}
                    >
                        AI Order
                    </Button>

                    <Button 
                        variant="big"
                        textVariant="big"
                        className="w-[70%]"
                        onPress={handleChooseManualOrder}
                    >
                        Manual Order
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};