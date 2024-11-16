import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiProductsService } from '../../services/products/apiProduct.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent implements OnInit,OnDestroy,OnChanges {
  @Input() id: number = 0;
  @Input() img: string | undefined;
  @Input() name: string | undefined;
  @Input() price: number | undefined;
  @Input() tickets: number = 1;
  @Input() color:string|undefined;
  @Input() talla:string|undefined;
  @Input() max:number=0

  po:any[]=[]

  productRemoved: boolean = true;
  totalPrice: number = 0;
  private productsUpdatedSubscription: Subscription = new Subscription();

  constructor(private apiProductsService: ApiProductsService, private cdr: ChangeDetectorRef,private toastr: ToastrService) { 

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  

  ngOnInit() {
    this.calculateTotalPrice();
    this.productsUpdatedSubscription = this.apiProductsService.getProductsUpdatedSubject().subscribe(() => {
      
      this.cdr.detectChanges();
      this.calculateTotalPrice();
    });
    
  }
  

  ngOnDestroy() {
    this.productsUpdatedSubscription.unsubscribe(); 
  }

  increase() {
    
    if (this.tickets < this.max && this.tickets <= 9) { 
      
      this.tickets++;
      console.log(this.tickets, "y", this.max)
      this.updateTickets(); 
    }else{
        this.toastr.info('limit reached', 'Alert');
    
    }
  }

  decrease() {
    if (this.tickets > 1) {
      this.tickets--;
      this.updateTickets();
    }
  }

  updateTickets() {
    this.apiProductsService.updateCantidad(this.id, this.tickets,this.color,this.talla);
  }

  removeProduct() {
    console.log(this.id)
    this.apiProductsService.removeProduct(this.id,this.color,this.talla);
    this.productRemoved = false;
  }
  calculateTotalPrice() {
    
    this.totalPrice = this.apiProductsService.calculateTotalPrice();

  }
}
