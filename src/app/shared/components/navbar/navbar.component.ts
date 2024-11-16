import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { ApiProductsService } from '../../services/products/apiProduct.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,CommonModule,CartComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isBannerVisible: boolean = true; 
    isMenuVisible: boolean = false; 
    apiDataCard:any[]=[];
    totalPrice: number = 0;
    cont:number=0
    constructor(private apiProductsService:ApiProductsService){

    }
    closeBanner() {
        if(this.cont==0){
          this.isBannerVisible = false;
          this.cont=1
        }
        
    }
    ngOnInit(): void {
      this.apiDataCard=this.apiProductsService.getApiProduct();
      this.calculateTotalPrice()
      this.apiProductsService.getProductsUpdatedSubject().subscribe(() => {
        this.apiDataCard = this.apiProductsService.getApiProduct();
        this.calculateTotalPrice()
      });
    }
    
    
    calculateTotalPrice() {
      
      this.totalPrice = this.apiProductsService.calculateTotalPrice();
  
    }

    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
    }
}
