// REACT NATIVE IMPORTS
import { ScrollView, View, Text } from "react-native";

// EXPO
import { router } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";

export const ManualOrderContent = () => {
    const handleSwitchToAIOrder = () => {
        router.replace("(screens)/ai-order");
    }
    
    return (
        <ScrollView>
            <View className="flex flex-1 items-center">
                <View className="flex items-center pt-5">
                    <Button 
                        variant="gray"
                        onPress={handleSwitchToAIOrder}
                    >
                        Switch to AI Order
                    </Button>
                </View>
                
                <View className="flex flex-col pt-5">
                    <Text className="text-center font-bold text-2xl">Choose a product</Text>

                    <View className="flex flex-row pt-5 justify-center items-center flex-wrap gap-5">
                        <View className="p-4 bg-[#e64b4f] w-[150px] h-[75px] justify-center">
                            <Text className="text-white text-center">Cappuccino</Text>
                        </View>

                        <View className="p-4 bg-[#e64b4f] w-[150px] h-[75px] justify-center">
                            <Text className="text-white text-center">Ice Cappuccino</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};