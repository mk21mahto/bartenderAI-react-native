// REACTJS IMPORTS
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// REACT NATIVE IMPORTS
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

// EXPO
import { router } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { DisplayProductSheet } from "@/components/(screens)/manual-order/display-product-sheet";
import BottomSheet from "@gorhom/bottom-sheet";

// ACTIONS
import { fetchProducts } from "@/actions/fetch-products";

// TYPES
import { typesProduct, ProductState } from "@/types/typesProduct";

// EXPO ICONS
import { Ionicons } from '@expo/vector-icons';

export const ManualOrderContent = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const [isProductSheetVisible, setIsProductSheetVisible] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<typesProduct | null>(null);
    const [confirmedProducts, setConfirmedProducts] = useState<(ProductState & { product: typesProduct })[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const { data: menuItems, isLoading, isError, error } = useQuery({
        queryKey: ['products'], 
        queryFn: fetchProducts
    });

    useEffect(() => {
        setTotalPrice(calculateTotalPrice(confirmedProducts));
    }, [confirmedProducts]);

    const handleSwitchToAIOrder = () => {
        router.replace("(screens)/ai-order");
    };

    const handleOpenProductSheet = (item: typesProduct) => {
        setSelectedProduct(item);
        setIsProductSheetVisible(true);
        bottomSheetRef.current?.expand();
    }

    const handleConfirmProduct = (productDetails: ProductState & { product: typesProduct }) => {
        setConfirmedProducts(prevProducts => [...prevProducts, productDetails]);
        setIsProductSheetVisible(false);
        bottomSheetRef.current?.close();
    }

    const calculateTotalPrice = (products: (ProductState & { product: typesProduct })[]): number => {
        return products.reduce((total, product) => {
            const basePrice = product.selectedSize === 'L' && product.product.product_large_variant_price 
                ? product.product.product_large_variant_price 
                : product.product.product_price;
            const oatMilkPrice = product.isOatAdded ? 0.2 : 0;
            const shotPrice = product.isShotAdded ? 0.5 : 0;
            return total + (basePrice + oatMilkPrice + shotPrice) * product.quantity;
        }, 0);
    };

    const handleRemoveProduct = (index: number) => {
        setConfirmedProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
    };

    const handleReviewOrder = () => {
        console.log('Confirmed Products:', confirmedProducts);
        console.log('Total Price:', totalPrice.toFixed(2));
        router.push({
            pathname: "(screens)/manual-order-details",
            params: {
                totalPrice: totalPrice.toFixed(2),
                confirmedProducts: JSON.stringify(confirmedProducts),
            },
        });
    }

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (isError) {
        return <Text>Error: {error?.message || "Unknown error"}</Text>;
    }

    return (
        <>
            <ScrollView>
                <View className="flex flex-col">
                    <View className="flex items-center pt-5">
                        <Button variant="gray" onPress={handleSwitchToAIOrder}>
                            Switch to AI Order
                        </Button>
                    </View>

                    <View className="flex flex-row justify-between w-full gap-x-3">
                        <View className="w-[50%]">
                            <View className="flex flex-col pt-5">
                                <Text className="text-center font-bold text-2xl">Menu</Text>
                            </View>

                            <ScrollView>
                                {menuItems && menuItems.map((item) => (
                                    <TouchableOpacity 
                                        key={item.id} 
                                        className="flex flex-row justify-between p-4 border-b border-gray-300"
                                        onPress={() => handleOpenProductSheet(item)}
                                    >
                                        <Text className="font-bold">{item.product_name}</Text>
                                        <Text>${item.product_price ? item.product_price.toFixed(2) : "N/A"}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View className="h-full w-[1px] bg-gray-300"></View>

                        <View className="w-[50%] gap-y-3">
                            <View className="flex flex-col pt-5">
                                <Text className="text-center font-bold text-2xl">Ordered products</Text>
                            </View>

                            <ScrollView>
                                {confirmedProducts.length > 0 ? (
                                    confirmedProducts.map((product, index) => (
                                        <View key={index} className="flex flex-col p-4 border-b border-gray-300">
                                            <View className="flex flex-row items-center gap-x-5">
                                                <Text className="font-bold">{product.product.product_name} x{product.quantity}</Text>
                                                <TouchableOpacity onPress={() => handleRemoveProduct(index)}>
                                                    <Ionicons name="remove-circle" size={24} color="red" />
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <Text>Size: {product.product.product_large_variant_price ? (product.selectedSize === 'S' ? 'S' : 'L') : 'Normal'}</Text>
                                                {product.isOatAdded && <Text>Oat Milk: Yes</Text>}
                                                {product.isShotAdded && <Text>Shot: Yes</Text>}
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text className="text-center">No products selected</Text>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </View>

                <Button className="mt-10" onPress={handleReviewOrder}>Review Order</Button>
            </ScrollView>

            {isProductSheetVisible && selectedProduct && (
                <DisplayProductSheet
                    bottomSheetRef={bottomSheetRef}
                    setIsProductSheetVisible={setIsProductSheetVisible}
                    product={selectedProduct}
                    onConfirm={handleConfirmProduct}
                />
            )}
        </>
    );
};