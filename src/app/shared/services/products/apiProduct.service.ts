import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiProductsService {
    private products: { 
        id: number, 
        name: string, 
        img: string, 
        price: number, 
        cantidad: number, 
        disponible: number,
        color?: string,  
        talla?: string    
    }[] = [];

    private totalPrice: number = 0;
    private productsUpdatedSubject: Subject<void> = new Subject<void>();

    getApiProduct() {
        return this.products;
    }

    getProductsUpdatedSubject() {
        return this.productsUpdatedSubject.asObservable();
    }

    getPrice(id: number) {
        const prodFind = this.products.find(product => product.id === id);
        return prodFind ? prodFind.price * prodFind.cantidad : 0;
    }

    addProduct(id: number, name: string, img: string, price: number, cantidad: number, disponible: number, color?: string, talla?: string) {
       
        const existingProduct = this.products.find(product => 
            product.id === id && product.color === color && product.talla === talla
        );

        if (existingProduct && existingProduct.cantidad < existingProduct.disponible) {
            const nuevaCantidad = existingProduct.cantidad + cantidad;
            if (nuevaCantidad <= existingProduct.disponible) {
                existingProduct.cantidad = nuevaCantidad;
                existingProduct.price = price * existingProduct.cantidad;
            }
        } else if (!existingProduct) {
            const product = { id, name, img, price: price * cantidad, cantidad, disponible, color, talla };
            this.products.push(product);
            console.log(this.products)
        }

        this.calculateTotalPrice();
        this.productsUpdatedSubject.next();
        return this.products;
    }

    updateCantidad(id: number, cantidad: number, color?: string, talla?: string) {
        const productIndex = this.products.findIndex(product => 
            product.id === id && product.color === color && product.talla === talla
        );

        if (productIndex !== -1) {
            const product = this.products[productIndex];
            if (cantidad <= product.disponible) {
                const pricePerUnit = product.price / product.cantidad;
                product.cantidad = cantidad;
                product.price = pricePerUnit * cantidad;
            }
        }
        
        this.roundPrices();
        this.calculateTotalPrice();
        this.productsUpdatedSubject.next();
    }

    removeProduct(id: number, color?: string, talla?: string) {
        this.products = this.products.filter(product => !(product.id === id && product.color === color && product.talla === talla));
        this.calculateTotalPrice();
        this.productsUpdatedSubject.next();
    }

    calculateTotalPrice() {
        this.totalPrice = this.products.reduce((total, product) => total + product.price, 0);
        this.totalPrice = Math.round(this.totalPrice * 100) / 100;
        return this.totalPrice;
    }

    getTotalPrice() {
        return this.totalPrice;
    }
    roundPrices() {
        this.products.forEach(product => {
            product.price = Math.round(product.price * 100) / 100;
        });
    }

    clearCart(): void {
        this.products = [];
        this.totalPrice = 0;
        this.productsUpdatedSubject.next();
    }
    

}