import { Component } from '@angular/core';
import { FilterComponent } from "../../shared/components/filter/filter.component";
import { CardProductComponent } from "../../shared/components/card-product/card-product.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FilterComponent, CardProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
