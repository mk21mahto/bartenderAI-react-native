// REACTJS IMPORTS
import { useState, useEffect, useRef } from "react";

// REACT NATIVE IMPORTS
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import { useLocalSearchParams } from 'expo-router';

// COMPONENTS
import { Button } from "@/components/ui/button";
import { DisplayPaymentSheet } from "@/components/(screens)/ai-order-details/display-payment-sheet";
import BottomSheet from "@gorhom/bottom-sheet";

// TYPES
import { typesProduct } from "@/types/typesProduct";

// EXPO ICONS
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const AIOrderDetailsContent = () => {
    const { top, bottom } = useSafeAreaInsets();
    const { 
        transcribedText,
    }: { 
        transcribedText?: string, 
    } = useLocalSearchParams();

    const [products, setProducts] = useState<typesProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isPaymentSheetVisible, setIsPaymentSheetVisible] = useState(false);

    useEffect(() => {
        if (transcribedText) {
            const lines = transcribedText.split('\n');
            const parsedProducts = lines.slice(0, -1)
                .filter(line => line.trim() !== "")
                .map(line => {
                    const priceMatch = line.match(/(\d+(\.\d+)?)\s*EUR$/);
                    const product_price = priceMatch ? parseFloat(priceMatch[1]) : 0;

                    const product_name = line
                        .replace(/(\d+(\.\d+)?)\s*EUR$/, '') // Remove price
                        .replace(/^\d+\.\s*/, '') // Remove number like 1., 2. ....
                        .trim(); // Remove any remaining white space
                    return { product_name, product_price };
                });
    
            const total = parsedProducts.reduce((acc, product) => acc + product.product_price, 0);
            console.log("Calculated Total Price:", total);
            setProducts(parsedProducts);
            setTotalPrice(total);
        }
    }, [transcribedText]);

    const removeProduct = (index: number) => {
        const newProducts = [...products];
        const priceToSubtract = newProducts[index].product_price;
        newProducts.splice(index, 1);
        setProducts(newProducts);
        setTotalPrice(prevTotal => prevTotal - priceToSubtract);
    };

    const handleOpenPaymentSheet = () => {
        setIsPaymentSheetVisible(true);
        bottomSheetRef.current?.expand();
    }

    return (
        <>
            <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1 justify-between">
                <View className="flex flex-col px-5">
                    <Text className="text-center font-bold text-2xl">Order details</Text>

                    <View className="flex flex-col pt-5 gap-y-3">
                        {products.map((item, index) => {
                            const itemName = item.product_name || "Unknown product";
                            const itemPrice = item.product_price !== undefined ? `${item.product_price} EUR` : "Price not available";

                            return (
                                <View key={index} className="flex flex-row p-3 justify-between bg-gray-500 mt-2 rounded-md">
                                    <Text className="text-lg text-white">{index + 1}. {itemName} {itemPrice}</Text>

                                    <TouchableOpacity onPress={() => removeProduct(index)}>
                                        <Feather name="x-circle" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}

                        <Text className="font-bold text-xl">Total price: {totalPrice} EUR</Text>

                        <View className="flex items-center">
                            <TouchableOpacity>
                                <MaterialIcons name="add-circle" size={36} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Button onPress={handleOpenPaymentSheet}>Payment method</Button>
            </View>

            {isPaymentSheetVisible && (
                <DisplayPaymentSheet
                    bottomSheetRef={bottomSheetRef}
                    setIsPaymentSheetVisible={setIsPaymentSheetVisible}
                    products={products}
                    totalPrice={totalPrice}
                />
            )}
        </>
    )
};