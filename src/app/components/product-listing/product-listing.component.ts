import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  
  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.loadProducts();
  }

  // Tải danh sách sản phẩm
  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.';
        this.isLoading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  // Tìm kiếm sản phẩm
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = this.products;
      return;
    }

    this.isLoading = true;
    this.productService.searchProducts(this.searchTerm).subscribe({
      next: (products) => {
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Lỗi khi tìm kiếm sản phẩm.';
        this.isLoading = false;
        console.error('Error searching products:', error);
      }
    });
  }

  // Lọc theo danh mục
  filterByCategory(category: string): void {
    if (!category) {
      this.filteredProducts = this.products;
      return;
    }

    this.isLoading = true;
    this.productService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Lỗi khi lọc sản phẩm theo danh mục.';
        this.isLoading = false;
        console.error('Error filtering products:', error);
      }
    });
  }

  // Xóa bộ lọc
  clearFilters(): void {
    this.searchTerm = '';
    this.filteredProducts = this.products;
  }

  // Định dạng giá tiền
  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  // Kiểm tra có sản phẩm hay không
  get hasProducts(): boolean {
    return this.filteredProducts.length > 0;
  }

  // Lấy danh sách danh mục duy nhất
  get categories(): string[] {
    const allCategories = this.products.map(product => product.category);
    return [...new Set(allCategories)];
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: Product): void {
    if (!product.inStock) {
      return;
    }
    
    // TODO: Implement add to cart logic
    console.log('Đã thêm vào giỏ hàng:', product);
    
    // Hiển thị thông báo thành công (tạm thời dùng alert)
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  }

  // Xử lý lỗi hình ảnh
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
}