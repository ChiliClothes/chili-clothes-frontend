export interface CreateOrderItemDto {
    productId: number;
    quantity: number;
}

export interface CreateOrderDto {
    userId?: string;
    items: CreateOrderItemDto[];
}

export interface OrderItem {
    id: number;
    productId: number;
    productName?: string; // Legacy
    quantity: number;
    price: number;
    product?: { // Backend nested object
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        isActive: boolean;
        stock: number;
        createdAt: string;
    }
}

export interface Order {
    id: number;
    userId: string | number;
    orderDate?: string; // Legacy support if needed
    createdAt?: string; // Backend field
    totalAmount?: number; // Legacy
    total?: number; // Backend field
    status: string;
    items?: OrderItem[]; // Optional as it might not be in the list view
    orderItems?: OrderItem[]; // Backend field
    paymentUrl?: string;
}
