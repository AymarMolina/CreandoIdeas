import { Component } from '@angular/core';
import { NewProductsComponent } from "../new-products/new-products.component";
import { TopSellingComponent } from "../top-selling/top-selling.component";
import { HappyOpinionsComponent } from "../happy-opinions/happy-opinions.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewProductsComponent, TopSellingComponent, HappyOpinionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
