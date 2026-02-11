import { Component } from '@angular/core';
import { AsideNavbarAdmin } from '../aside-navbar-admin/aside-navbar-admin';
import { ProductAdminService } from '../../services/product-admin.service'; 
import { ProductAdmin } from '../../models/product-admin.model'

@Component({
  selector: 'app-products-admin',
  imports: [AsideNavbarAdmin],
  templateUrl: './products-admin.html',
})
export class ProductsAdmin {

  productos: ProductAdmin[] = [];

  constructor(private productService : ProductAdminService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (info) => {
        this.productos = info;
        console.log('Productos recibidos :)', this.productos)

      },
      error: (er) => {
        console.error("ERROR", er)
      }
    })
  }
    
}
