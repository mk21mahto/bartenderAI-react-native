// REACT NATIVE IMPORTS
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import { useLocalSearchParams } from 'expo-router';

export const FinalOrderContent = () => {
    const { top, bottom } = useSafeAreaInsets();

    const { transcribedText } = useLocalSearchParams<{ transcribedText?: string }>();

    const items = transcribedText ? transcribedText.split('\n') : [];
    const total = items.length > 0 ? items[items.length - 1] : ''; // Separate Total Price to not be product but <View> of its own
    const products = items.slice(0, -1); // All except the last line

    return (
        <ScrollView>
            <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1">
                <Text className="text-center font-bold text-2xl">Order details</Text>

                {products.map((item, index) => (
                    <View key={index} className="p-5 bg-gray-500 mt-2">
                        <Text className="text-lg">{item}</Text>
                    </View>
                ))}

                <View className="p-5 bg-gray-500">
                    <Text className="font-bold text-xl text-white">{total}</Text>
                </View>
            </View>
        </ScrollView>
    )
};