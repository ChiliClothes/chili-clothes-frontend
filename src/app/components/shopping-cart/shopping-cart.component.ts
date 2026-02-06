import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/product.model';

@Component({
    selector: 'app-shopping-cart',
    imports: [CommonModule],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
    cartService = inject(CartService);
    private orderService = inject(OrderService);

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

        const orderDto = {
            items: this.cartService.items().map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }))
        };

        this.orderService.createOrder(orderDto).subscribe({
            next: (order) => {
                console.log('Order created successfully:', order);
                this.cartService.clearCart();
                alert('Order placed successfully! 🤘');
            },
            error: (err) => {
                console.error('Error creating order:', err);
                alert('Failed to place order. Please check if you are logged in.');
            }
        });
    }
}
