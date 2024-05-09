// REACTJS IMPORTS
import { useCallback, useMemo, useState } from "react";

// REACT NATIVE IMPORTS
import { View, Text, TouchableOpacity } from "react-native";

// EXPO
import Checkbox from "expo-checkbox";

// COMPONENTS
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Button } from "@/components/ui/button";

// EXPO ICONS
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

type DisplayPaymentSheetProps = {
    bottomSheetRef: React.RefObject<BottomSheet>;
    setIsPaymentSheetVisible: (isVisible: boolean) => void;
    totalPrice: number;
}

export const DisplayPaymentSheet = ({
    bottomSheetRef,
    setIsPaymentSheetVisible,
    totalPrice
}: DisplayPaymentSheetProps) => {
    const [paymentOption, setPaymentOption] = useState('Credit Card');

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    const handleSetCreditCardPayment = () => {
        setPaymentOption('Credit Card');
    };
    
    const handleSetCashPayment = () => {
        setPaymentOption('Cash');
    };

    const handleClosePaymentSheet = () => {
        bottomSheetRef.current?.close();
        setIsPaymentSheetVisible(false);
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1} 
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop} // Makes background darker when sheet is opened
            enablePanDownToClose={true} // True makes it so you can swipe with finger to close sheet
        >
            <View className="flex flex-1 justify-between p-5">
                <View className="flex flex-col">
                    <Text className="font-medium text-3xl">Select Payment Method</Text>

                    <View className="pt-5 gap-y-4">
                        <TouchableOpacity onPress={handleSetCreditCardPayment}>
                            <View className="flex flex-row items-center justify-between">
                                <View className="flex flex-row items-center gap-x-5">
                                    <AntDesign name="creditcard" size={24} color="red" />
                                    <Text className="font-medium text-xl">Debit/Credit Card</Text>
                                </View>

                                <Checkbox value={paymentOption === 'Credit Card'} onValueChange={handleSetCreditCardPayment} />
                            </View>
                        </TouchableOpacity>

                        <View className="h-[1px] w-full bg-gray-300"></View>

                        <TouchableOpacity onPress={handleSetCashPayment}>
                            <View className="flex flex-row items-center justify-between">
                                <View className="flex flex-row items-center gap-x-5">
                                    <Ionicons name="cash-sharp" size={24} color="green" />
                                    <Text className="font-medium text-xl">Cash</Text>
                                </View>

                                <Checkbox value={paymentOption === 'Cash'} onValueChange={handleSetCashPayment} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex flex-col gap-y-3">
                    <TouchableOpacity className="flex flex-row items-center justify-between bg-[#e64b4f] p-5 rounded-md">
                        <Text className="text-white font-medium">Place order</Text>
                        <Text className="text-white"><FontAwesome name="euro" size={14} color="white" /> {totalPrice}</Text>
                    </TouchableOpacity>

                    <Button 
                        variant="blue" 
                        onPress={handleClosePaymentSheet}
                    >
                        Close
                    </Button>
                </View>
            </View>
        </BottomSheet>
    )
}