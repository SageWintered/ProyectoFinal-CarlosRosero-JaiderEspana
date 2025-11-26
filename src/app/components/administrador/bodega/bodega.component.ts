import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css'],
  imports: [CommonModule, ButtonModule, RouterModule],
  standalone: true
})
export class BodegaComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log("Productos cargados:", data);
        this.products = data;
      },
      error: (err) => {
        console.error("Error cargando productos", err);
      }
    });
  }
  deleteProduct(id: number) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        alert("Producto eliminado");
      },
      error: err => console.error("Error eliminando producto:", err)
    });
  }
}

}
