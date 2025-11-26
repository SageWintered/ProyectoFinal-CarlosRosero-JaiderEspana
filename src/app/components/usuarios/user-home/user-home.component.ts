import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  username: string = '';
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Usuario';
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error al obtener productos:', err)
    });
  }
}
