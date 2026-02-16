import { Component, OnInit, inject, signal } from '@angular/core';
import { AsideNavbarAdmin } from '../aside-navbar-admin/aside-navbar-admin';
import { OrderService } from '../../services/order.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  imports: [AsideNavbarAdmin, CommonModule, DatePipe],
  templateUrl: './dashboard-admin.html',
})
export class DashboardAdmin implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<any[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading.set(true);
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        const formattedOrders = orders.map(order => {
          const dateStr = order.createdAt || order.orderDate || new Date().toISOString();
          const total = order.total !== undefined ? order.total : (order.totalAmount || 0);
          // Handling missing items array
          const itemCount = order.items ? order.items.length : 0;

          return {
            id: order.id,
            userId: order.userId,
            date: dateStr,
            total: total,
            status: order.status,
            itemsCount: itemCount,
            statusClass: this.getStatusClass(order.status)
          };
        });
        this.orders.set(formattedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading admin orders', err);
        this.isLoading.set(false);
      }
    });
  }

  private getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'entregado':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  }
}
