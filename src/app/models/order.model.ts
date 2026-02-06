export interface CreateOrderItemDto {
    productId: number;
    quantity: number;
}

export interface CreateOrderDto {
    items: CreateOrderItemDto[];
}

export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    userId: string;
    orderDate: string;
    totalAmount: number;
    status: string;
    items: OrderItem[];
}
