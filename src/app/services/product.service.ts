import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, map } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { Product, Category } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private http = inject(HttpClient);

    private productsSignal = signal<Product[]>([]);
    private selectedCategory = signal<Category>('All');
    private searchQuery = signal<string>('');

    // Public readable signals
    readonly productsList = this.productsSignal.asReadonly();

    products = computed(() => {
        let filtered = this.productsSignal();

        // Filter by category
        if (this.selectedCategory() !== 'All') {
            filtered = filtered.filter((p) => p.category === this.selectedCategory());
        }

        // Filter by search query
        const query = this.searchQuery().toLowerCase();
        if (query) {
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    });

    constructor() {
        this.loadProducts();
    }

    loadProducts() {
        this.http.get<Product[]>(`${API_BASE_URL}/Products`).subscribe({
            next: (products) => {
                this.productsSignal.set(products);
            },
            error: (err) => console.error('Error loading products', err)
        });
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${API_BASE_URL}/Products/${id}`);
    }

    setCategory(category: Category) {
        this.selectedCategory.set(category);
    }

    setSearchQuery(query: string) {
        this.searchQuery.set(query);
    }

    getCategory() {
        return this.selectedCategory();
    }
}
