import { findAllSubstringIndices } from '@angular/cdk/schematics';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  log:boolean=true;
  reg:boolean=false;
  usuario = new FormControl('', [
    Validators.required,
  ]);
  contrasena = new FormControl('', [
    Validators.required,
  ]);
  myForm: FormGroup;
  constructor(private fb: FormBuilder,@Inject(PLATFORM_ID) private platformId: Object){
    this.myForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }
  click(num:number){
    if(num==1){
      this.log=true
      this.reg=false
    }else{
      this.log=false
      this.reg=true
    }
  } 
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  login(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.myForm.invalid) {
        this.myForm.markAllAsTouched();
        return;
      }
      if(this.myForm.value.usuario=="admin" && this.myForm.value.contrasena==="admin"){
        console.log("Se ingrso")
      }else{
        console.log("No ingreso")
      }
    } else {

    }
  }
  get userNoValid() {
    return this.myForm.get('usuario')?.invalid && this.myForm.get('usuario')?.touched
  }
  get passNoValid() {
    return this.myForm.get('contrasena')?.invalid && this.myForm.get('contrasena')?.touched
  }
}
