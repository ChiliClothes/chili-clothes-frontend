import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { CreateOrderDto, Order } from '../models/order.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private http = inject(HttpClient);

    createOrder(orderDto: CreateOrderDto): Observable<Order> {
        return this.http.post<Order>(`${API_BASE_URL}/Orders`, orderDto);
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${API_BASE_URL}/Orders`);
    }

    getOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${API_BASE_URL}/Orders/${id}`);
    }

    updateOrderStatus(id: number, status: string): Observable<any> {
        return this.http.put(`${API_BASE_URL}/Orders/${id}/status`, { status });
    }

    cancelOrder(id: number): Observable<any> {
        return this.http.put(`${API_BASE_URL}/Orders/${id}/cancel`, {});
    }
}
