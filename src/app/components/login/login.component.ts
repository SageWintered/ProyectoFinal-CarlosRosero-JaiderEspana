
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, ReactiveFormsModule, ButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit { 
  myForm: FormGroup = null!;

  constructor(private fb: FormBuilder){



  } 

  ngOnInit()  { 
    this.myForm = this.fb.group({
      usuario: [''],
      password: ['']


    });
  
  }
  onSubmit() {
    console.log(this.myForm.value);
  }
}

 


