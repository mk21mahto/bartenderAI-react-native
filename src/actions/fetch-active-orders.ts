// LIBRARIES
import axios from "axios";

// TYPES
import { typesOrders } from "@/types/typesOrders";

export const fetchOrders = async (): Promise<typesOrders[]> => {
    const { data } = await axios.get<typesOrders[]>('https://api.gameinfiny.com/api/reactnative/fetch_orders');

    // We have to convert created_at to date because of counting from 0 to infinite seconds ...
    return data.map(order => ({
        ...order,
        created_at: new Date(order.created_at)
    }));
};