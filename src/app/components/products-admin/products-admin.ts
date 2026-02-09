import { Component } from '@angular/core';
import { AsideNavbarAdmin } from '../aside-navbar-admin/aside-navbar-admin';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-admin',
  imports: [AsideNavbarAdmin],
  templateUrl: './products-admin.html',
})
export class ProductsAdmin {
    
}
