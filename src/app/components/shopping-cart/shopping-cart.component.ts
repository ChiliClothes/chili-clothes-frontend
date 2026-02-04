import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
    selector: 'app-shopping-cart',
    imports: [CommonModule],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
    cartService = inject(CartService);

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
        console.log('Proceeding to checkout...');
        // TODO: Implement checkout logic
    }
}
