export type Category = 'All' | 'Apparel' | 'Music' | 'Accessories';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
    imageUrl?: string;
    category?: Category; // Optional if backend doesn't provide it yet
    badge?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
}
