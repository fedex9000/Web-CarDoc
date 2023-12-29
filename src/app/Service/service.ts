import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Utente} from "../Model/Utente";


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  getUserDetails(sessionId: string | null | undefined) {
    return this.http.get<Utente>(`http://localhost:8080/api/utenti/user-details?sessionId=` + sessionId);
  }
}
