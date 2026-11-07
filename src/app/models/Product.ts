export interface Product{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

export type createProduct = Omit<Product, 'id'>;