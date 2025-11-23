import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, ButtonModule],
  templateUrl: './adm-center.component.html',
  styleUrl: './adm-center.component.css'
})
export class AdmCenterComponent {}
