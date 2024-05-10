// REACTJS IMPORTS
import React, { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';

// REACT NATIVE IMPORTS
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';

// ACTIONS
import { fetchOrders } from "@/actions/fetch-active-orders";

// COMPONENTS
import { DisplayOrderModal } from "@/components/(screens)/active-orders/display-order-modal";

// TYPES
import { typesOrders } from "@/types/typesOrders";

export const ActiveOrdersContent = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getBackgroundColor = (created_at: Date) => {
        const elapsedMinutes = Math.floor((new Date().getTime() - created_at.getTime()) / 60000);
        if (elapsedMinutes >= 15) {
            return 'bg-red-500'; // Red background after 15 minutes
        } else if (elapsedMinutes >= 5) {
            return 'bg-orange-500'; // Orange background after 5 minutes
        }
        return 'bg-gray-300'; // Default background for less than 5 minutes
    };

    const handleOpenModal = (order: typesOrders) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const formatDuration = (created_at: Date) => {
        const totalSeconds = Math.floor((currentTime.getTime() - created_at.getTime()) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
    
        let timeString = "";
    
        if (hours > 0) {
            timeString += `${hours}h `;
        }
        if (minutes > 0 || hours > 0) {
            timeString += `${minutes}m `;
        }
        timeString += `${seconds}s`;
    
        return timeString.trim(); // Trim any extra space for neatness
    };

    const renderProducts = (productsString: string) => {
        return productsString.split(', ').map((product, index) => (
            <Text key={index} className="pt-2">
                {index + 1}. {product}
            </Text>
        ));
    };

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isError) {
        return (
            <View>
                <Text>Error fetching orders</Text>
            </View>
        );
    }

    return (
        <>
            <ScrollView>
                <View className='flex flex-1 p-5'>
                    <Text className='text-center font-bold text-2xl'>Active Orders</Text>

                    {orders && orders.length > 0 ? (
                        orders.map(order => (
                            <TouchableOpacity
                                key={order.id}
                                onLongPress={() => handleOpenModal(order)}
                            >
                                <View className={`flex flex-col mt-2 p-2 rounded-md  ${getBackgroundColor(order.created_at)}`}>
                                    <Text className='text-center font-bold text-2xl text-black'>{order.order_number}</Text>

                                    <View className="flex flex-col gap-y-3">
                                        {renderProducts(order.products)}
                                        <Text>{formatDuration(order.created_at)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text className="pt-10 text-center text-xl font-medium">There are currently no active orders!</Text>
                    )}
                </View>
            </ScrollView>

            {modalVisible && (
                <DisplayOrderModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    selectedOrder={selectedOrder}
                />
            )}
        </>
    );
}