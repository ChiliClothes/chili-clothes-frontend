import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductAdmin } from '../models/product-admin.model'
import { API_BASE_URL } from '../constants/api.constants';


@Injectable({
  providedIn: 'root',
})
export class ProductAdminService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductAdmin[]> {
    return this.http.get<ProductAdmin[]>(`${API_BASE_URL}/Products/admin/all`)
  }

  createProduct(product: ProductAdmin): Observable<ProductAdmin> {
    return this.http.post<ProductAdmin>(`${API_BASE_URL}/Products`, product);
  }

  updateProduct(id: number, product: ProductAdmin): Observable<ProductAdmin> {
    return this.http.put<ProductAdmin>(`${API_BASE_URL}/Products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/Products/${id}`);
  }
}
