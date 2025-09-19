import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) { }

  // Lấy tất cả sản phẩm
  getAllProducts(): Observable<Product[]> {
    // Tạm thời trả về mock data, sau này sẽ thay bằng API call thực
    return this.getMockProducts();
    
    // Khi có API thực, sử dụng:
    // return this.http.get<Product[]>(this.apiUrl)
    //   .pipe(catchError(this.handleError));
  }

  // Tìm kiếm sản phẩm theo tên
  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }

  // Lọc sản phẩm theo danh mục
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      ))
    );
  }

  // Lấy sản phẩm theo ID
  getProductById(id: number): Observable<Product | undefined> {
    return this.getAllProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  // Mock data để test
  private getMockProducts(): Observable<Product[]> {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with amazing camera and performance',
        price: 999,
        imageUrl: '/assets/images/iphone15.jpg',
        category: 'Electronics',
        inStock: true
      },
      {
        id: 2,
        name: 'Samsung Galaxy S24',
        description: 'Powerful Android smartphone with AI features',
        price: 899,
        imageUrl: '/assets/images/galaxy-s24.jpg',
        category: 'Electronics',
        inStock: true
      },
      {
        id: 3,
        name: 'MacBook Air M3',
        description: 'Lightweight laptop with M3 chip for professionals',
        price: 1299,
        imageUrl: '/assets/images/macbook-air.jpg',
        category: 'Computers',
        inStock: false
      },
      {
        id: 4,
        name: 'Nike Air Jordan',
        description: 'Classic basketball shoes with modern comfort',
        price: 180,
        imageUrl: '/assets/images/air-jordan.jpg',
        category: 'Fashion',
        inStock: true
      },
      {
        id: 5,
        name: 'Sony WH-1000XM5',
        description: 'Premium noise-canceling wireless headphones',
        price: 399,
        imageUrl: '/assets/images/sony-headphones.jpg',
        category: 'Electronics',
        inStock: true
      }
    ];
    
    return of(mockProducts);
  }

  // Xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}