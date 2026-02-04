import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartItems = signal<CartItem[]>([
        // Initial mock cart items
        {
            product: {
                id: 1,
                name: 'Asterisk Logo Tee',
                price: 35.0,
                image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAFK3d8qNbMgjo0vFMBU056fpDMd__Kl1ScOmEt8Fiu2L3LyVtGLP1f-cpIEEgnn9HUw-EsYQeLaIgCb6Cz_StEX1lNkxNG7digq8MCoOfSj4Dlk5vnR3R527VGreA5YZdc3ryWpSpK4j5iKcnO7DN8Y9xV8rFCq34qxXoXjAS8bwYBGK5kLsrehuDBltlqxmj1l76ReUflzto1tZcXhij-DCuGeOu8U9Ta4vkMo5mHirYx9kKxIRznAFcgYVlY3QITaaae_NmWP7q7',
                category: 'Apparel',
                description: 'Classic red asterisk logo on premium heavyweight black cotton tee.',
                badge: 'BESTSELLER',
            },
            quantity: 1,
            size: 'Large',
            color: 'Black',
        },
        {
            product: {
                id: 4,
                name: 'Unlimited Love Cap',
                price: 28.0,
                image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuA153_V3vjuzyx8cYcYD_kvAtSQ3FdomGs6DC2bKQygYtsABB5J5kb8HIHn2kBWPXxclt1WNuOFsd6f8JpKzUEc07A7CgyH1dIYrhxatUtHJt-lrPJx4CtkCKkdiNmFzoaLT-Ttb6FEHUft_inBmbL4fJ2bF10cnrvbZTNTnjaXKPawr7SjBrdTVODcI5WcebCc6tOt5qVJ6OGpaFSwAkn6QmXTDgGizKxQIZxE90-j9jGpKY_TUry3_D7SlgV3proUMNBYni1LIsOB',
                category: 'Accessories',
                description: 'Adjustable dad hat with embroidered neon logo.',
                badge: 'ACCESSORY',
            },
            quantity: 1,
            size: 'OSFA',
            color: 'Neon Blue',
        },
    ]);

    // Computed signals
    items = this.cartItems.asReadonly();
    itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
    subtotal = computed(() =>
        this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
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
