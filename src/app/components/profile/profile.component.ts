import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    authService = inject(AuthService);
    private orderService = inject(OrderService);

    user = computed(() => {
        const u = this.authService.user();
        const ordersList = this.orders();
        return {
            name: u?.name || 'RHCP Fan',
            email: u?.email || '',
            points: ordersList.length * 50, // Each order gives 50 points
            totalOrders: ordersList.length,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXVII65yAiL6a81_QXDzSdqFTLWJrekVDf2gowJvrSsvBtCUfU68l-U_yzNbT_-60ztSvOlHuhmlecaMDNEtybkuEB6jkfOlshd7YSyNNCwBzSmJM3SMxrvZ9pI2PafkLfe4s-_A0-91SC5q6N1W5SSv8m6HlRcMFE_wJrANI6cxgEjYjCSOwKOkhEv7_jTXlHdT6A_TpZbdV40W5GDHis3ezqb6O6l0hMa6bVjdFwpn7XmzfnXs_bvjnzu86Ud5x9VGHnRMTwlqkw'
        };
    });

    orders = signal<any[]>([]);

    ngOnInit() {
        this.loadOrderHistory();
    }

    loadOrderHistory() {
        this.orderService.getOrders().subscribe({
            next: (orders) => {
                const formattedOrders = orders.map(order => ({
                    id: `RHCP-${order.id}`,
                    date: new Date(order.orderDate).toLocaleDateString(),
                    items: `${order.items.length} Items`,
                    amount: `$${order.totalAmount.toFixed(2)}`,
                    status: order.status,
                    statusClass: this.getStatusClass(order.status),
                    icon: this.getStatusIcon(order.status)
                }));
                this.orders.set(formattedOrders);
            },
            error: (err) => console.error('Error loading orders', err)
        });
    }

    private getStatusClass(status: string): string {
        switch (status.toLowerCase()) {
            case 'delivered':
            case 'entregado':
                return 'bg-green-50 text-green-700 border border-green-200';
            case 'shipped':
            case 'enviado':
            case 'in transit':
                return 'bg-blue-50 text-blue-700 border border-blue-200';
            case 'cancelled':
            case 'cancelado':
                return 'bg-slate-50 text-slate-500 border border-slate-200';
            default:
                return 'bg-slate-50 text-slate-700 border border-slate-200';
        }
    }

    private getStatusIcon(status: string): string {
        switch (status.toLowerCase()) {
            case 'delivered':
            case 'entregado':
                return 'local_shipping';
            case 'shipped':
            case 'enviado':
            case 'in transit':
                return 'inventory_2';
            case 'cancelled':
            case 'cancelado':
                return 'cancel';
            default:
                return 'shopping_bag';
        }
    }

    cancelOrder(order: any) {
        const id = typeof order.id === 'string' ? parseInt(order.id.split('-').pop() || '0') : order.id;
        if (confirm('Are you sure you want to cancel this order?')) {
            this.orderService.cancelOrder(id).subscribe({
                next: () => this.loadOrderHistory(),
                error: (err) => console.error('Error cancelling order', err)
            });
        }
    }
}

