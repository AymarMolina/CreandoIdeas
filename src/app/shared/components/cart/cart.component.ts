import { Component, ViewChild } from '@angular/core';
import { ApiProductsService } from '../../services/products/apiProduct.service';
import { CommonModule } from '@angular/common';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,CartSidebarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @ViewChild('offcanvas') offcanvas: any;

  openOffcanvas() {
    const offcanvasElement = this.offcanvas.nativeElement as HTMLElement;
    offcanvasElement.classList.add('show');
    document.body.classList.add('offcanvas-open'); 
  }

  closeOffcanvas() {
    const offcanvasElement = this.offcanvas.nativeElement as HTMLElement;
    offcanvasElement.classList.remove('show');
    document.body.classList.remove('offcanvas-open'); 
  }
  
  apiDataCard:any[]=[];
  po:any[]=[];
  totalPrice: number = 0;
  constructor(private apiProductsService:ApiProductsService){

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
}
