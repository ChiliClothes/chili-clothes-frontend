import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
import { Product, Category } from '../../models/product.model';

@Component({
    selector: 'app-shop',
    imports: [
        CommonModule,
        FormsModule,
        ProductCardComponent,
        ShoppingCartComponent,
    ],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.css',
})
export class ShopComponent {
    productService = inject(ProductService);
    cartService = inject(CartService);
    themeService = inject(ThemeService);

    searchQuery = '';
    categories: Category[] = ['All', 'Apparel', 'Music', 'Accessories'];

    onSearchChange(query: string) {
        this.productService.setSearchQuery(query);
    }

    selectCategory(category: Category) {
        this.productService.setCategory(category);
    }

    isActiveCategory(category: Category): boolean {
        return this.productService.getCategory() === category;
    }

    onAddToCart(product: Product) {
        // For simplicity, adding with default size/color
        // In a real app, you'd show a modal to select size/color
        this.cartService.addToCart(product, 'M', 'Black');
        console.log('Added to cart:', product.name);
    }
}
