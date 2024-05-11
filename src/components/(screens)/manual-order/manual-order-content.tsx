// REACTJS IMPORTS
import { useState } from "react";

// REACT NATIVE IMPORTS
import { ScrollView, View, Text } from "react-native";

// EXPO
import { router } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { RenderMenuItem } from "@/components/(screens)/manual-order/render-menu-item";

// TYPES
import { typesManualOrderItem } from "@/types/typesManualOrderItem";
import { typesProduct } from "@/types/typesProduct";

export const ManualOrderContent = () => {
    const menuItems = [
        { id: 1, productName: "Ice Cappuccino", productPrice: 4.0, addOns: true },
        { id: 2, productName: "Cappuccino", productPrice: 2.4, addOns: true },
    ];

    const [selectedItems, setSelectedItems] = useState([]);

    const renderMenuItem = (item: typesManualOrderItem) => {
        return (
            <RenderMenuItem
                key={item.id}
                item={item}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
            />
        );
    };

    const handleReviewOrder = () => {
        if (selectedItems.length > 0) {
            let processedProducts: typesProduct[] = [];
            let total = 0;

            processedProducts = selectedItems.map(item => ({
                productName: item.productName,
                productPrice: item.productPrice
            }));
            total = processedProducts.reduce((acc, product) => acc + product.productPrice, 0);

            router.push({
                pathname: "(screens)/order-details",
                params: {
                    manualOrderItems: processedProducts,
                    totalPrice: total
                }
            });
        }
    };

    const handleSwitchToAIOrder = () => {
        router.replace("(screens)/ai-order");
    };

    return (
        <View className="flex flex-1">
            <View className="flex items-center pt-5">
                <Button variant="gray" onPress={handleSwitchToAIOrder}>
                    Switch to AI Order
                </Button>
            </View>

            <View className="flex flex-col pt-5">
                <Text className="text-center font-bold text-2xl">Menu</Text>
            </View>

            <ScrollView>
                <View className="flex flex-col pt-5">
                    <View className="flex px-7 pt-5 justify-center flex-wrap gap-5">
                        {menuItems.map((item) => renderMenuItem(item))}
                    </View>
                </View>
            </ScrollView>

            <View className="p-4">
                <Button onPress={handleReviewOrder}>
                    Review Order{" "}
                    {selectedItems.length ? "(" + selectedItems.length + ")" : ""}
                </Button>
            </View>
        </View>
    );
};