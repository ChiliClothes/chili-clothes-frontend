export interface ProductAdmin {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    imageUrl?: string;
}


