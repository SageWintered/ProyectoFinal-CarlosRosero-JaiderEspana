import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    CommonModule, 
    RouterModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;

  origenes = [
    { label: 'Colombia', value: 'colombia' },
    { label: 'México', value: 'mexico' },
    { label: 'USA', value: 'usa' },
    { label: 'China', value: 'china' }
  ];

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      origen: ['', Validators.required],
      descripcion: [''],
      imagen: ['', Validators.required]   // ← NUEVO CAMPO
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const data = {
      producto: this.productForm.value.nombre,
      cantidad: this.productForm.value.cantidad,
      precio: this.productForm.value.precio,
      origen: this.productForm.value.origen,
      img: this.productForm.value.imagen
    };

    this.productService.createProduct(data).subscribe(
      resp => {
        alert("Producto registrado con éxito");
        this.productForm.reset();
      },
      err => {
        alert(err.error.message || "Error al registrar el producto");
      }
    );
  }
}
