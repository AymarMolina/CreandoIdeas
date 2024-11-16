import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Parameter } from '../../services/common/parameter';
import { ApiProductDataService } from '../../services/products/apiProducts.service';
import { ApiProductsService } from '../../services/products/apiProduct.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent implements OnInit{
  apiDataCard:any[]=[]
  constructor(private apiProductDataService:ApiProductDataService,private apiProductsService:ApiProductsService,private router: Router){

  }
  ngOnInit(): void {
    this.listProduct()
  }
  listProduct() {
    let parametro: Parameter = new Parameter()
    parametro.method = 'GET'
    parametro.url = 'products'
    this.apiProductDataService.listproductos(parametro).subscribe(
      (response: any) => {
        console.log('Respuesta completa:', response);  
        if (response && response) {
          this.apiDataCard = response;
          console.log('Productos:', this.apiDataCard);
        } else {
          console.error('No se encontraron productos en la respuesta');
        }
      },
      (error) => {
        console.error('Error al obtener productos', error);  
      }
    );
    
  }
  descripEvent(id:number){
    this.router.navigate(['inicio/producto', id]);
    console.log("ola")
    
  }

}
