import { Component } from '@angular/core';
import { CardProductComponent } from "../../shared/components/card-product/card-product.component";

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [CardProductComponent],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css'
})
export class TopSellingComponent {

}
