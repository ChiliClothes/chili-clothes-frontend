import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AsideNavbarAdmin } from '../aside-navbar-admin/aside-navbar-admin';
import { CreateProductModal } from '../create-product-modal/create-product-modal';
import { ProductAdminService } from '../../services/product-admin.service';
import { ProductAdmin } from '../../models/product-admin.model';
import { ToastService } from '../../services/toast';
import { finalize } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-products-admin',
  imports: [AsideNavbarAdmin, CreateProductModal, DecimalPipe],
  templateUrl: './products-admin.html',
})
export class ProductsAdmin implements OnInit {

  productos: ProductAdmin[] = [];
  isModalOpen: boolean = false;
  productToEdit: ProductAdmin | null = null;
  isLoading: boolean = false;

  constructor(
    private productService: ProductAdminService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.cdr.detectChanges(); // Forzar estado inicial de carga

    this.productService.getProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (info) => {
          this.productos = info;
        },
        error: (er) => {
          console.error("ERROR", er);
          this.toastService.error('Error loading products. Please try again.');
        }
      });
  }

  openCreateModal() {
    this.productToEdit = null;
    this.isModalOpen = true;
  }

  openEditModal(product: ProductAdmin) {
    this.productToEdit = product;
    this.isModalOpen = true;
  }

  onProductCreated(newProduct: ProductAdmin) {
    this.productos.push(newProduct);
    this.toastService.success('Product created successfully!');
    this.loadProducts();
  }

  onProductUpdated(updatedProduct: ProductAdmin) {
    const index = this.productos.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.productos[index] = updatedProduct;
    }
    this.loadProducts();
  }

  deleteProduct(product: ProductAdmin) {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.toastService.success('Product deleted successfully');
          this.productos = this.productos.filter(p => p.id !== product.id);
        },
        error: (err) => {
          console.error('Error deleting product', err);
          this.toastService.error('Failed to delete product');
        }
      });
    }
  }

  onModalClosed() {
    this.isModalOpen = false;
    this.productToEdit = null;
  }

}
