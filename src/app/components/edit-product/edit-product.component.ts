import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    RouterModule
  ]
})
export class EditProductComponent implements OnInit {

  editForm!: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get("id"));

    this.editForm = this.fb.group({
      producto: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      origen: ['', Validators.required],
      img: ['', Validators.required]
    });

    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.editForm.patchValue(product);
      },
      error: (err) => console.log(err)
    });
  }

  onSubmit() {
  if (this.editForm.valid) {
    this.productService.updateProduct(this.productId, this.editForm.value)
      .subscribe({
        next: () => {
          alert("Producto actualizado exitosamente");
          this.router.navigate(['/bodega']);
        },
        error: (err) => {
          console.error(err);
          alert("Error: No se pudo actualizar el producto");
          this.router.navigate(['/bodega']);
        }
      });
  }
}

}
