import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartItems = signal<CartItem[]>([]);

    // Computed signals
    items = this.cartItems.asReadonly();
    itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
    subtotal = computed(() =>
        this.cartItems().reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0)
    );
    shipping = computed(() => (this.cartItems().length > 0 ? 9.0 : 0));
    total = computed(() => this.subtotal() + this.shipping());

    addToCart(product: Product, size?: string, color?: string) {
        const existingItem = this.cartItems().find(
            (item) =>
                item.product.id === product.id && item.size === size && item.color === color
        );

        if (existingItem) {
            this.updateQuantity(existingItem, existingItem.quantity + 1);
        } else {
            this.cartItems.update((items) => [
                ...items,
                { product, quantity: 1, size, color },
            ]);
        }
    }

    updateQuantity(item: CartItem, quantity: number) {
        if (quantity <= 0) {
            this.removeItem(item);
            return;
        }

        this.cartItems.update((items) =>
            items.map((i) => (i === item ? { ...i, quantity } : i))
        );
    }

    removeItem(item: CartItem) {
        this.cartItems.update((items) => items.filter((i) => i !== item));
    }

    clearCart() {
        this.cartItems.set([]);
    }
}
