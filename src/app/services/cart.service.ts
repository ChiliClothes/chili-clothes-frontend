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

    constructor() {
        this.loadCart();
    }

    private loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                this.cartItems.set(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error parsing cart from localStorage', e);
            }
        }
    }

    private saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }

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
        this.saveCart();
    }

    updateQuantity(item: CartItem, quantity: number) {
        if (quantity <= 0) {
            this.removeItem(item);
            return;
        }

        this.cartItems.update((items) =>
            items.map((i) => (i === item ? { ...i, quantity } : i))
        );
        this.saveCart();
    }

    removeItem(item: CartItem) {
        this.cartItems.update((items) => items.filter((i) => i !== item));
        this.saveCart();
    }

    clearCart() {
        this.cartItems.set([]);
        this.saveCart();
    }
}
