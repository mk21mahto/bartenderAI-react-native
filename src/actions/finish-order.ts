// LIBRARIES
import axios from "axios";

export const finishOrder = async (orderId: number): Promise<void> => {
    await axios.delete(`https://api.gameinfiny.com/api/reactnative/finish_order/${orderId}`);
};