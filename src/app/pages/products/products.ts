import { 
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  computed
 } from '@angular/core';

 import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

 import { RouterLink } from '@angular/router';

 import { ProductService } from '../../services/product.service';
 import { Product } from '../../models/Product';

@Component({
  imports: [RouterLink],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  products = signal<Product[]>([]);
  loading = signal(false);
  errorMessage = signal<string | null>(null)

  inventoryValue = computed(() => {
    this.products().reduce((total, product) => {
      return total + (product.price * product.stock);
    }, 0)
  })
  
  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void{
    this.loading.set(true);
    this.errorMessage.set(null);

    this.productService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.products.set(data);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Failed to load products: ', error);
          this.errorMessage.set('Unable to load products')
          this.loading.set(false)
        }
      })
  }


}
