import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Utente} from "../Model/Utente";
import {Observable} from "rxjs";
import {Prodotto} from "../Model/Prodotto";
import {Image} from "../Model/Image";


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  getUserDetails(sessionId: string | null | undefined) {
    return this.http.get<Utente>(`http://localhost:8080/api/utenti/user-details?sessionId=` + sessionId);
  }

  updateUtente(cf: string, body: {}): Observable<Utente> {
    return this.http.put<Utente>('http://localhost:8080/api/utenti/' + cf, body);
  }

  getUtente(cf: string): Observable <Utente>{
    return this.http.get<Utente>('http://localhost:8080/api/utenti/' + cf );
  }

  getProdotti(): Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>('http://localhost:8080/api/prodotti/findAll');
  }

  findImageByProductID(id: string): Observable<Image> {
    return this.http.get<Image>('http://localhost:8080/api/images/findByProductID/' + id);
  }

  getCategoryProduct(category: string): Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>('http://localhost:8080/api/prodotti/findCategoryProduct/' + category);
  }

  getSearchedProduct(searchedWord: string): Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>('http://localhost:8080/api/prodotti/findSearchedProduct/' + searchedWord);

  }

  getProduct(id: string): Observable<Prodotto>{
    return this.http.get<Prodotto>('http://localhost:8080/api/prodotti/getProduct/' + id);

  }

}
