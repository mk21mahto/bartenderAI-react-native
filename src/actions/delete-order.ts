// LIBRARIES
import axios from "axios";

export const deleteOrder = async (orderId: number): Promise<void> => {
    await axios.delete(`https://api.gameinfiny.com/api/reactnative/delete_order/${orderId}`);
};