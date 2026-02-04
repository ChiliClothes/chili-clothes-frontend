export type Category = 'All' | 'Apparel' | 'Music' | 'Accessories';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: Category;
    description: string;
    badge?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
}
