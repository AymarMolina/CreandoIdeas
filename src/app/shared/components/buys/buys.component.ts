import { CommonModule } from '@angular/common';
import { Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiProductsService } from '../../services/products/apiProduct.service';

@Component({
  selector: 'app-buys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buys.component.html',
  styleUrl: './buys.component.css'
})
export class BuysComponent implements OnChanges {
  @Input() variantes: any[] = [];  
  @Input() nom:string='';
  @Input() descripcion:string='';
  @Input() precio:any=0;
  @Input() categoria:any=''
  @Input() prId:number=0
  max:number=0;
  @Input() selectedColor: string = '';

  venta:any=[]

  mainImage: string = ''; 
  filteredVariantes: any[] = []; 
  selectedTalla:string=''
  col:any=[]
  id:number=0

  cant:number=1;
  cont:number=1
  constructor(private apiProductsService: ApiProductsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variantes'] && this.variantes.length > 0) {
      this.filterVariantesByColor(this.selectedColor);
      this.selectedColor=this.variantes[0].color
      console.log(this.getColorDetails(this.variantes))
      this.col=this.getColorDetails(this.variantes)

      this.setMainImage();
    }
  }
  getColorDetails(variantes: any[]): any[] {
    // Creamos un arreglo vacío para almacenar los detalles por color
    const colorDetails: any[] = [];
  
    // Recorremos todas las variantes
    variantes.forEach(varianta => {
      // Si aún no hemos agregado este color, lo agregamos al array
      const colorFound = colorDetails.find(item => item.color === varianta.color);
      
      // Solo si no encontramos el color, lo agregamos
      if (!colorFound) {
        // Agregamos el color con su primer URL, talla y stock disponible
        if (varianta.imagenes.length > 0) {
          colorDetails.push({
            color: varianta.color,
            imagenUrl: varianta.imagenes[0].url,
            tallas: [varianta.talla],  // Asignamos la talla como un array
            stockDisponible: varianta.stock_disponible
          });
        } else {
          // Si no tiene imágenes, pero aún queremos mostrar el color
          colorDetails.push({
            color: varianta.color,
            imagenUrl: '',  // No hay imagen para este color
            tallas: [varianta.talla],
            stockDisponible: varianta.stock_disponible
          });
        }
      } else {
        // Si el color ya existe, agregamos la talla a ese color
        colorFound.tallas.push(varianta.talla);
        colorFound.stockDisponible += varianta.stock_disponible;
      }
    });
  
    return colorDetails;
  }
  

  filterVariantesByColor(color: string): void {
    this.selectedColor = color;  
    
    this.filteredVariantes = this.variantes.filter(varianta => varianta.color === color);
    this.pru()
    this.setMainImage(); 
  }


  setMainImage(): void {
   
    if (this.filteredVariantes.length > 0 && this.filteredVariantes[0].imagenes.length > 0) {
      this.mainImage = this.filteredVariantes[0].imagenes[0].url; 
    }
  }

  changeMainImage(imageUrl: string) {
    this.mainImage = imageUrl;
  }
  pru(){
    this.max=this.obtenerTicketsRestantes(this.selectedColor,this.selectedTalla)
    this.id=this.obtenerId(this.selectedColor,this.selectedTalla)
    this.cant=1

    console.log(this.prId,"bro ",this.max, "sdasd", this.id)
  }
  talla23(talla:string){
    this.selectedTalla=talla
    this.cant=1
    this.pru()
    console.log(this.max,"el id es: ",this.id)
  }
  obtenerTicketsRestantes(color: string, talla: string): number | 1 {
    const variante = this.variantes.find(v => v.color === color && v.talla === talla);
    return variante ? variante.tickets_restantes : 1;  
  }
  obtenerId(color: string, talla: string): number | 1 {
    const variante = this.variantes.find(v => v.color === color && v.talla === talla);
    return variante ? variante.id : 1;  
  }
  add(){
    this.addCart()
    this.cont++
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
  addCart(){
    this.apiProductsService.addProduct(this.prId,this.nom,this.mainImage,this.precio,this.cant,this.max,this.selectedColor,this.selectedTalla)
    this.cant=1
  }
}