import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registroForm: FormGroup;
  registerError: string = "";

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private loginService: LoginService
  ) {
    this.registroForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatch
    });
  }

  passwordsMatch(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (!this.registroForm.valid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const { usuario, email, password } = this.registroForm.value;

    this.loginService.register(usuario, password, email, "usuario").subscribe(
      resp => {
        console.log("Registrado:", resp);
        this.registerError = "";

        // 🔥 Redirigir al login
        alert("Registro exitoso. Por favor, inicia sesión.");
        this.router.navigate(['/login']);
      },
      err => {
        if (err.error?.message === "El nombre de usuario ya está registrado") {
          this.registerError = "Ese nombre de usuario ya existe.";
        } else {
          this.registerError = "Error al registrar usuario.";
        }
        console.error(err);
      }
    );
  }
}
