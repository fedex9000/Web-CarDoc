import {Component, Inject} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent{


  constructor(public auth: AuthService) {
  }


  resetLocalStorage(){
    localStorage.removeItem("categoria");
  }
}
