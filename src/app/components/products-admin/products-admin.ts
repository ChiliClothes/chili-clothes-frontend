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
    this.isModalOpen = true;
  }

  onProductCreated(newProduct: ProductAdmin) {
    this.productos.push(newProduct);
    this.toastService.success('Product created successfully!');
    // Opcionalmente, recarga la lista de productos desde el servidor
    this.loadProducts();
  }

  onModalClosed() {
    this.isModalOpen = false;
  }

}
