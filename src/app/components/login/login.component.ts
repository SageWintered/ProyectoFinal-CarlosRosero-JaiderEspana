import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;

  // 🔥 mensaje de error para el usuario
  loginError: string = "";

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.myForm.valid) return;

    const username = this.myForm.value.usuario;
    const password = this.myForm.value.password;

    this.loginService.login(username, password).subscribe(
      resp => {
        console.log("Login OK:", resp);

        this.loginError = "";

        if (resp.rol === 'admin') {
          this.router.navigate(['/adminCenter']);
        } else if (resp.rol === 'usuario') {
          localStorage.setItem('username', username);
          this.router.navigate(['/userHome']);
        }
      },
      err => {
        console.error("Login ERROR:", err);
        this.loginError = "Usuario o contraseña incorrectos.";
        this.myForm.reset();
      }
    );
  }
}
