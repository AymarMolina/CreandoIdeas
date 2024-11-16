import { Component, Input } from '@angular/core';
import { ApiProductsService } from '../../services/products/apiProduct.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
  @Input() ap:any[]=[]
  @Input() id: number = 0;
  @Input() dia:string|undefined;
  @Input() time:string|undefined;
  @Input() location:string|undefined;
  @Input() nombreEvento:string|undefined;
  @Input() price:number|undefined;
  @Input() max:number=0
  @Input() color:any[]=[]

  cant:number=1;
  cont:number=1
  
  constructor(private apiProductsService: ApiProductsService) { }
  ngOnInit(): void {

  }
  add(){
    this.addCart(this.ap[0])
    this.cont++
  }
  addCart(carta:any){
    const numericPrice = parseFloat(carta.price);

    if (!isNaN(numericPrice)) {

      this.apiProductsService.addProduct(carta.id, carta.name,carta.url, numericPrice,this.cant,carta.remaining);
      this.cant=1
    } 

  }
  
  increase() {
    if (this.cant < this.max && this.cant <= 9) { 
      this.cant++;
    }
  }

  decrease() {
    if (this.cant > 1) {
      this.cant--;
    }
  }
}
