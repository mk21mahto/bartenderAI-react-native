// REACTJS IMPORTS
import { useMutation, useQueryClient } from "@tanstack/react-query";

// REACT NATIVE IMPORTS
import { View, Text, Modal } from "react-native";

// ACTIONS
import { deleteOrder } from "@/actions/delete-order";
import { finishOrder } from "@/actions/finish-order";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { ToastUtil } from "@/components/ui/toast";

// TYPES
import { typesOrders } from "@/types/typesOrders";

type DisplayOrderModalProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedOrder: typesOrders;
};

export const DisplayOrderModal = ({
    modalVisible,
    setModalVisible,
    selectedOrder
}: DisplayOrderModalProps) => {
    const queryClient = useQueryClient();

    const finishOrderMutation = useMutation({
        mutationFn: () => finishOrder(selectedOrder.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setModalVisible(false);
            ToastUtil.success("Order finished!");
        },
        onError: () => {
            ToastUtil.error("Error finishing order!");
        }
    });

    const deleteOrderMutation = useMutation({
        mutationFn: () => deleteOrder(selectedOrder.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setModalVisible(false);
            ToastUtil.success("Order deleted successfully!");
        },
        onError: () => {
            ToastUtil.error("Error deleting order!");
        }
    });

    const handleFinishOrder = () => {
        finishOrderMutation.mutate();
    }

    const handleDeleteOrder = () => {
        deleteOrderMutation.mutate();
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View className="flex flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className="bg-white items-center px-5 py-7 rounded-md w-[80%]">
                    <Text className="font-bold text-xl">Order: {selectedOrder.order_number}</Text>
                    <Text className="pt-3 text-center text-sm">Note: If you click "Delete order" it will count that order as a mistake and it will not be added to analytics!</Text>

                    <View className="flex flex-col pt-5 gap-y-3">
                        <Button onPress={handleFinishOrder}>
                            Finish order
                        </Button>

                        <Button onPress={handleDeleteOrder}>
                            Delete order
                        </Button>

                        <Button variant="gray" onPress={handleCloseModal}>Cancel</Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}