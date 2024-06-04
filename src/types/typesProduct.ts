export type typesProduct = {
    product_name: string;
    product_price: number;
    id?: number;
    product?: string;
    product_large_variant_price?: number;
    is_addon?: boolean;
};

export type ProductState = {
    quantity: number;
    isOatAdded: boolean;
    isShotAdded: boolean;
    selectedSize: 'S' | 'L';
};