import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

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
    CommonModule
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      origen: ['', Validators.required],
      descripcion: ['']
    });
  }

  onSubmit() {
    console.log('Producto registrado:', this.productForm.value);
    alert('Producto registrado');
  }
}
