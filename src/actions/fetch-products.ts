// LIBRARIES
import axios from "axios";

// TYPES
import { typesProduct } from "@/types/typesProduct";

export const fetchProducts = async (): Promise<typesProduct[]> => {
    const response = await axios.get<typesProduct[]>('https://api.gameinfiny.com/api/reactnative/fetch_products');
    
    return response.data;
};