import { Component, OnInit } from '@angular/core';
import { ApiProductDataService } from '../shared/services/products/apiProducts.service';
import { BuysComponent } from "../shared/components/buys/buys.component";
import { ComprasComponent } from '../shared/components/compras/compras.component';
import { CommonModule } from '@angular/common';
import { Parameter } from '../shared/services/common/parameter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-id',
  standalone: true,
  imports:[BuysComponent,ComprasComponent,CommonModule],
  templateUrl: './product-id.component.html',
  styleUrl: './product-id.component.css'
})
export class ProductIdComponent implements OnInit{
  item:any={}
  constructor(private route: ActivatedRoute,private apiProductDataService:ApiProductDataService){
    
  }
  products:any=[]
  Product:any=[]
  ngOnInit(): void {
    this.cargar()
    console.log(this.products)
  }
  pru(){
    console.log(this.products)
  }
  cargar() {
    this.route.params.subscribe(params => {
      const id = params['id'];
  
      let parametro: Parameter = new Parameter();
      parametro.method = 'GET';
      parametro.url = `products/${id}`;
      this.apiProductDataService.productoporId(parametro).subscribe((response: any) => {
        console.log('Respuesta de la API:', response);
        this.Product = response;
        console.log(this.Product.variantes)  
      }, error => {
        console.error('Error al cargar el producto:', error);
      });
    });
  }
}
