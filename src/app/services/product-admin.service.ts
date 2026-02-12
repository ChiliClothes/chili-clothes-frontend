import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductAdmin } from '../models/product-admin.model'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductAdminService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductAdmin[]> {
    return this.http.get<ProductAdmin[]>(`${environment.apiUrl}/api/Products/admin/all`)
  }

  createProduct(product: ProductAdmin): Observable<ProductAdmin> {
    return this.http.post<ProductAdmin>(`${environment.apiUrl}/api/Products`, product);
  }

  updateProduct(id: number, product: ProductAdmin): Observable<ProductAdmin> {
    return this.http.put<ProductAdmin>(`${environment.apiUrl}/api/Products/${id}`, product);
  }
  
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/Products/${id}`);
  }
}
