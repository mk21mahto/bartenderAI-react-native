// REACTJS IMPORTS
import { useCallback, useMemo, useState } from "react";

// REACT NATIVE IMPORTS
import { View, Text, TouchableOpacity } from "react-native";

// COMPONENTS
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Button } from "@/components/ui/button";

// TYPES
import { typesProduct } from "@/types/typesProduct";

// EXPO ICONS
import { AntDesign } from '@expo/vector-icons';

type ProductState = {
    quantity: number;
    isOatAdded: boolean;
    isShotAdded: boolean;
    selectedSize: 'S' | 'L';
};

type DisplayProductSheetProps = {
    bottomSheetRef: React.RefObject<BottomSheet>;
    setIsProductSheetVisible: (isVisible: boolean) => void;
    product: typesProduct;
    onConfirm: (productDetails: ProductState & { product: typesProduct }) => void;
};

export const DisplayProductSheet = ({
    bottomSheetRef,
    setIsProductSheetVisible,
    product,
    onConfirm
}: DisplayProductSheetProps) => {
    const [state, setState] = useState<ProductState>({
        quantity: 1,
        isOatAdded: false,
        isShotAdded: false,
        selectedSize: 'S'
    });

    const snapPoints = useMemo(() => ['25%', '50%', '95%'], []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    const incrementQuantity = () => {
        setState(prev => ({ ...prev, quantity: prev.quantity + 1 }));
    };

    const toggleFeature = (feature: keyof typeof state) => {
        setState(prev => ({ ...prev, [feature]: !prev[feature] }));
    };

    const selectSize = (size: 'S' | 'L') => {
        setState(prev => ({ ...prev, selectedSize: size }));
      };

    const resetState = () => {
        setState({ quantity: 1, isOatAdded: false, isShotAdded: false, selectedSize: 'S' });
    };

    const handleConfirmProduct = () => {
        onConfirm({ 
            product, 
            ...state 
        });
        resetState();
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
        setIsProductSheetVisible(false);
        resetState();
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1} 
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop} // Makes background darker when sheet is opened
            enablePanDownToClose={true} // True makes it so you can swipe with finger to close sheet
            onClose={handleClose}
        >
            <BottomSheetScrollView>
                <View className="flex flex-1 justify-between px-5 py-1">
                    <View className="flex flex-col">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="font-medium text-3xl">{product.product_name} x{state.quantity}</Text>
                            <TouchableOpacity onPress={incrementQuantity}>
                                <AntDesign name="pluscircle" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex flex-col pt-5 gap-y-3">
                            <View className="flex flex-row items-center justify-between w-[177px]">
                                <Text className="font-medium text-lg">Size</Text>

                                <View className="flex flex-row items-center gap-x-3">
                                    <TouchableOpacity 
                                        onPress={() => selectSize('L')}
                                        className={`p-2 items-center w-[40px] rounded ${state.selectedSize === 'L' ? 'bg-green-500' : 'bg-red-500'}`}
                                    >
                                        <Text className="text-white font-bold">L</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectSize('S')}
                                        className={`p-2 items-center w-[40px] rounded ${state.selectedSize === 'S' ? 'bg-green-500' : 'bg-red-500'}`}
                                    >
                                        <Text className="text-white font-bold">S</Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>

                            <View className="flex flex-row items-center gap-x-3 justify-between w-[125px]">
                                <Text className="font-medium text-lg">Oat milk</Text>
                                <TouchableOpacity 
                                    onPress={() => toggleFeature('isOatAdded')}
                                    className={`p-2 rounded ${state.isOatAdded ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    <AntDesign name="checkcircle" size={24} color="white" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center justify-between w-[125px]">
                                <Text className="font-medium text-lg">Shot</Text>
                                <TouchableOpacity 
                                    onPress={() => toggleFeature('isShotAdded')}
                                    className={`p-2 rounded ${state.isShotAdded ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    <AntDesign name="checkcircle" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View className="flex flex-col pt-5 gap-y-3">
                        <Button
                            onPress={handleConfirmProduct}
                            className="bg-[#e64b4f]"
                        >
                            <Text className="text-white font-medium">Confirm</Text>
                        </Button>

                        <Button 
                            variant="blue" 
                            onPress={handleClose}
                        >
                            Close
                        </Button>
                    </View>
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    )
}