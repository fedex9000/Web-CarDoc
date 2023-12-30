import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Utente} from "../Model/Utente";
import {Observable} from "rxjs";
import {Prodotti} from "../Model/Prodotti";
import {Image} from "../Model/immagini";


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

  getProdotti(): Observable<Prodotti[]>{
    return this.http.get<Prodotti[]>('http://localhost:8080/api/prodotti/findAll');
  }

  findImageByProductID(id: string): Observable<Image> {
    return this.http.get<Image>('http://localhost:8080/api/images/findByProdotto/' + id);
  }


}
