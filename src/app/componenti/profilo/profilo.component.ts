import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {AuthService} from "../../auth/auth.service";
import {ErrordialogComponent} from "../errordialog/errordialog.component";
import {SuccessdialogComponent} from "../successdialog/successdialog.component";
import {ServiceService} from "../../Service/service";
import {Ordini} from "../../Model/Ordini";
import {DettagliOrdineComponent} from "../dettagli-ordine/dettagli-ordine.component";


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit{
  isEditing: boolean = false;
  showPassword: boolean = false;
  ordini: Ordini[] = [];
  utente: any = localStorage.getItem("cf");

  nomeValue: string = '';
  cognomeValue: string = '';
  telefonoValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';
  tipologiaValue: string = '';
  cfValue: string = '';
  numeroOrdine: number = 0;

  constructor(private service: ServiceService, public dialog: MatDialog, private auth: AuthService) {}

  ngOnInit(): void {
    if(!this.auth.isLoggedIn) window.open("http://localhost:4200/home", "_self")
    this.nomeValue = localStorage.getItem("nome") || "";
    this.cognomeValue = localStorage.getItem("cognome") || "";
    this.telefonoValue = localStorage.getItem("telefono") || "";
    this.emailValue = localStorage.getItem("email") || "";
    this.passwordValue = localStorage.getItem("password") || "";
    this.tipologiaValue = localStorage.getItem("tipologia") || "";
    this.cfValue = localStorage.getItem("cf") || "";
    this.loadOrdini();
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loadOrdini(){
    this.service.getOrderById(this.utente).subscribe({
      next: (ordini) => {
        this.ordini = ordini;
      }
    })

  }

  sendToServer(): void {
    let successMessage = "Dati aggiornati con successo";

    this.service.updateUtente(this.cfValue, {
      nome: this.nomeValue,
      cognome: this.cognomeValue,
      cf: this.cfValue,
      telefono: this.telefonoValue,
      email: this.emailValue,
      password: this.passwordValue,
      tipologia: this.tipologiaValue,
    }).subscribe({
      next: () => {
        localStorage.setItem("nome", this.nomeValue);
        localStorage.setItem("cognome", this.cognomeValue);
        localStorage.setItem("telefono", this.telefonoValue);
        localStorage.setItem("email", this.emailValue);
        localStorage.setItem("password", this.passwordValue);
        localStorage.setItem("tipologia", this.tipologiaValue);
      },
      error: () => this.dialog.open(ErrordialogComponent),
      complete: () => {
        this.dialog.open(SuccessdialogComponent, {
          data: { successMessage }
        });
        this.isEditing = !this.isEditing;
      }
    });
  }

  viewDetailOrder(numeroOrdine: number){
    this.numeroOrdine = numeroOrdine;
    localStorage.setItem("ordineSelezionato", String(this.numeroOrdine));
    this.dialog.open(DettagliOrdineComponent);

  }
}

