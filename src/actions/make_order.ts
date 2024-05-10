// LIBRARIES
import axios from "axios";

// CONFIG
import { AWS_EC2_PATH } from "@/config"; 

// TYPES
import { typesProduct } from "@/types/typesProduct";

type MakeOrderProps = {
    products: typesProduct[];
    total_price: number;
};

export const makeOrder = async ({
    products,
    total_price
}: MakeOrderProps) => {
    try {
        const productNames = products.map(product => {
            // Remove "-" dash before sending to database(backend)
            return product.productName.replace(/\s*-\s*$/, '').trim();
        }).join(", ");
        
        const response = await axios.post(`${AWS_EC2_PATH}/api/reactnative/make_order`, {
            products: productNames,
            total_price: total_price,
        });

        return response.data;
    } catch (error) {
        console.log("Error at make_order.ts!");
    }
}