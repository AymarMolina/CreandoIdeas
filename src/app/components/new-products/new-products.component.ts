import { Component } from '@angular/core';
import { CardProductComponent } from "../../shared/components/card-product/card-product.component";

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [CardProductComponent],
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css'
})
export class NewProductsComponent {

}
