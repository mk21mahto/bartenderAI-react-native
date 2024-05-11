// REACT NATIVE IMPORTS
import { View, Text, TouchableOpacity } from "react-native";

// TYPES
import { typesManualOrderItem } from "@/types/typesManualOrderItem";

type RenderMenuItemProps = {
    item: typesManualOrderItem;
    selectedItems: typesManualOrderItem[];
    setSelectedItems: React.Dispatch<React.SetStateAction<typesManualOrderItem[]>>;
}

export const RenderMenuItem = ({
    item,
    selectedItems,
    setSelectedItems
}: RenderMenuItemProps) => {
    const addItem = (item: typesManualOrderItem) => {
        const existingItemIndex = selectedItems.findIndex((i) => i.id === item.id);
        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].productQuantity += 1;
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, { ...item, productQuantity: 1 }]);
        }
    };

    const removeItem = (item: typesManualOrderItem) => {
        const existingItemIndex = selectedItems.findIndex((i) => i.id === item.id);
        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];

            if (updatedItems[existingItemIndex].productQuantity > 1) {
                updatedItems[existingItemIndex].productQuantity -= 1;
            } else {
                updatedItems.splice(existingItemIndex, 1);
            }
            setSelectedItems(updatedItems);
        }
    };

    return (
        <View
            className="flex flex-row justify-between border-b border-gray-300 py-2"
        >
            <View>
                <Text className="text-lg font-semibold">{item.productName}</Text>
                <Text className="text-lg font-bold text-gray-500">
                    EUR {item.productPrice}
                </Text>
            </View>

            <View className="flex item-center">
                {selectedItems.some((selected) => selected.id === item.id) ? (
                    <View style={{ flexDirection: "row" }} className="w-10 mt-2 mr-2">
                        <TouchableOpacity
                            style={{ borderRadius: 4, backgroundColor: "#e64b4f" }}
                            className="h-5 w-5"
                            onPress={() => removeItem(item)}
                        >
                            <Text className="text-white"> - </Text>
                        </TouchableOpacity>

                        <Text className="mx-2">
                            {
                                selectedItems.find((selected) => selected.id === item.id)
                                    .productQuantity
                            }
                        </Text>

                        <TouchableOpacity
                            style={{ borderRadius: 4, backgroundColor: "#e64b4f" }}
                            className="h-5 w-5"
                            onPress={() => item.addOnsAvailable ? addItem(item): addItem(item)}
                        >
                            <Text className="text-white"> + </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity
                            style={{ borderRadius: 4, backgroundColor: "#e64b4f" }}
                            className="h-7 w-12"
                            onPress={() => addItem(item)}
                        >
                            <Text className="text-white"> Add </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}