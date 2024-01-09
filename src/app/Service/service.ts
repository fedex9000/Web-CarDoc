import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Utente} from "../Model/Utente";
import {Observable} from "rxjs";
import {Prodotto} from "../Model/Prodotto";
import {Image} from "../Model/Image";
import {Recensione} from "../Model/Recensione";
import {DettagliOrdine} from "../Model/DettagliOrdine";
import {Ordini} from "../Model/Ordini";


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

  getRecensioniByProdottoID(id: string): Observable<Recensione[]>{
    return this.http.get<Recensione[]>('http://localhost:8080/api/recensioni/findByProduct/' + id);
  }

  deleteRecensione(id: Number) {
    return this.http.delete('http://localhost:8080/api/recensioni/' + id);
  }

  setRecensione(body: {}){
    return this.http.post('http://localhost:8080/api/recensioni', body);
  }


  saveOrUpdateProduct(body: {}) {
    return this.http.post<Prodotto>('http://localhost:8080/api/prodotti', body);
  }

  removeProduct(id: string){
    return this.http.delete('http://localhost:8080/api/prodotti/' + id);
  }

  createImage(body: {}) {
    return this.http.post('http://localhost:8080/api/images', body)
  }

  addToCart(body: {}){
    return this.http.post('http://localhost:8080/api/prodotti/addToCart', body);
  }


  getCartProduct(cf: string): Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>('http://localhost:8080/api/cart/findByCf/' + cf);
  }


  removeItem(cf: string, id_prodotto: string){
    return this.http.delete('http://localhost:8080/api/cart/' + cf + '/' + id_prodotto);
  }

  removeAll(cf: string){
    return this.http.delete('http://localhost:8080/api/cart/' + cf);
  }

  getOrderById(cf: string): Observable<Ordini[]>{
    return this.http.get<Ordini[]>('http://localhost:8080/api/ordini/getOrderById/' + cf);
  }

  getDetailOrderByNumber(body: {}):Observable<DettagliOrdine[]>{
    return this.http.post<DettagliOrdine[]>('http://localhost:8080/api/ordini/getDetailOrderByNumber', body);
  }

  getProductQuantity(cf: string, id_prodotto: string){
    return this.http.get<number>('http://localhost:8080/api/cart/getQuantity/' + cf + '/' + id_prodotto);
  }

  findLastNumberOrder(cf: string){
    return this.http.get<number>('http://localhost:8080/api/ordini/findLastNumberOrder/' + cf);
  }

  insertOrderDetail(body: {}){
    console.log("insertOrderDetails");
    return this.http.post('http://localhost:8080/api/ordini/insertOrderDetail', body);
  }

  insertOrder(body: {}){
    console.log("insertOrder");
    return this.http.post('http://localhost:8080/api/ordini/insertOrder', body);
  }

}