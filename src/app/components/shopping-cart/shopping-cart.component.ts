import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/product.model';

import { ToastService } from '../../services/toast';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-shopping-cart',
    imports: [CommonModule],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
    cartService = inject(CartService);
    authService = inject(AuthService);
    private orderService = inject(OrderService);
    private toastService = inject(ToastService);

    increaseQuantity(item: CartItem) {
        this.cartService.updateQuantity(item, item.quantity + 1);
    }

    decreaseQuantity(item: CartItem) {
        this.cartService.updateQuantity(item, item.quantity - 1);
    }

    removeItem(item: CartItem) {
        this.cartService.removeItem(item);
    }

    clearAll() {
        this.cartService.clearCart();
    }

    checkout() {
        if (this.cartService.items().length === 0) return;

        const user = this.authService.user();
        console.log('Current User during checkout:', user);

        const orderDto = {
            userId: user?.userId,
            items: this.cartService.items().map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }))
        };

        console.log('Sending Order DTO:', JSON.stringify(orderDto, null, 2));

        this.orderService.createOrder(orderDto).subscribe({
            next: (order) => {
                console.log('Order created successfully:', order);
                this.cartService.clearCart();

                if (order.paymentUrl) {
                    window.location.href = order.paymentUrl;
                } else {
                    // MOCK: Simulate redirection if backend doesn't provide URL
                    console.warn('Backend did not return paymentUrl. Simulating redirection.');
                    this.toastService.info('Redirecting to payment gateway (Mock)...');
                    setTimeout(() => {
                        window.location.href = 'https://duckduckgo.com/?q=payment+gateway+mock';
                    }, 1500);
                }
            },
            error: (err) => {
                console.error('Error creating order:', err);
                this.toastService.error('Failed to place order.');
            }
        });
    }
}
