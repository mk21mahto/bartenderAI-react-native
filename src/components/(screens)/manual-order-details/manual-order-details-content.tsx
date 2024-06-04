// REACTJS IMPORTS
import React, { useRef, useState } from "react";

// REACT NATIVE IMPORTS
import { ScrollView, View, Text } from "react-native";

// EXPO
import { useLocalSearchParams } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { DisplayPaymentSheet } from "@/components/(screens)/manual-order-details/display-payment-sheet";
import BottomSheet from "@gorhom/bottom-sheet";

// TYPES
import { typesProduct, ProductState } from "@/types/typesProduct";

export const ManualOrderDetailsContent = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isPaymentSheetVisible, setIsPaymentSheetVisible] = useState(false);

    const { totalPrice: initialTotalPrice, confirmedProducts: initialConfirmedProducts } = useLocalSearchParams() as {
        totalPrice: string;
        confirmedProducts: string;
    };

    const products: (ProductState & { product: typesProduct })[] = JSON.parse(initialConfirmedProducts);
    const totalPrice = parseFloat(initialTotalPrice);

    const calculateProductPrice = (product: ProductState & { product: typesProduct }): number => {
        const basePrice = product.selectedSize === 'L' && product.product.product_large_variant_price 
            ? product.product.product_large_variant_price 
            : product.product.product_price;
        const oatMilkPrice = product.isOatAdded ? 0.2 : 0;
        const shotPrice = product.isShotAdded ? 0.5 : 0;
        return (basePrice + oatMilkPrice + shotPrice) * product.quantity;
    };

    const handleOpenPaymentSheet = () => {
        setIsPaymentSheetVisible(true);
        bottomSheetRef.current?.expand();
    }

    // Extracting products data to match typesProduct[] type
    const productList: typesProduct[] = products.map(product => {
        let modifiedProductName = product.product.product_name;

        if (product.product.product_large_variant_price !== 0) {
            if (product.selectedSize === 'L') {
                modifiedProductName = `L ${modifiedProductName}`;
            } else if (product.selectedSize === 'S') {
                modifiedProductName = `S ${modifiedProductName}`;
            }
        }

        if (product.isOatAdded) {
            modifiedProductName = `${modifiedProductName} Oat`;
        }

        if (product.isShotAdded) {
            modifiedProductName = `${modifiedProductName} Shot`;
        }

        return {
            ...product.product,
            product_name: modifiedProductName
        };
    });

    return (
        <>
            <ScrollView>
                <View className="flex flex-col p-4">
                    <Text className="text-center font-bold text-2xl">Order Details</Text>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <View key={index} className="flex flex-col p-4 border-b border-gray-300">
                                <View className="flex flex-row justify-between">
                                    <Text className="font-bold">{product.product.product_name} x{product.quantity}</Text>
                                    <Text>${calculateProductPrice(product).toFixed(2)}</Text>
                                </View>
                                <Text>Size: {product.product.product_large_variant_price ? (product.selectedSize === 'S' ? 'S' : 'L') : 'Normal'}</Text>
                                {product.isOatAdded && <Text>Oat Milk: Yes</Text>}
                                {product.isShotAdded && <Text>Shot: Yes</Text>}
                            </View>
                        ))
                    ) : (
                        <Text className="text-center">No products selected</Text>
                    )}
                    <Text className="text-center font-bold text-xl mt-4">Total Price: ${totalPrice.toFixed(2)}</Text>
                    <Button className="mt-10" onPress={handleOpenPaymentSheet}>Payment method</Button>
                </View>
            </ScrollView>

            {isPaymentSheetVisible && (
                <DisplayPaymentSheet
                    bottomSheetRef={bottomSheetRef}
                    setIsPaymentSheetVisible={setIsPaymentSheetVisible}
                    products={productList}
                    totalPrice={totalPrice}
                />
            )}
        </>
    );
};