import { Component } from '@angular/core';
import { ProductCartComponent } from "../../shared/components/product-cart/product-cart.component";

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [ProductCartComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {

}
