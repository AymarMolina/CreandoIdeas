import { Injectable } from "@angular/core";
import { Parameter } from "../common/parameter";
import { HttpRequestService } from "../common/http-request.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiProductDataService {
    constructor(private _request: HttpRequestService) { }
    listproductos(parametro: Parameter): Observable<any> {
        return this._request.http(parametro)
    }
    deleteproducto(parametro: Parameter): Observable<any> {
        return this._request.http(parametro)
    }
    actualizarproducto(parametro: Parameter): Observable<any> {
        return this._request.http(parametro)
    }
    crearproducto(parametro: Parameter): Observable<any> {
        return this._request.http(parametro)
    }
    productoporId(parametro: Parameter): Observable<any> {
        return this._request.http(parametro)
    }
}