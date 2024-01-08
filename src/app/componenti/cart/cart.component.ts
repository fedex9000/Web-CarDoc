import {AfterViewInit, Component, OnInit} from "@angular/core";
import { Prodotto } from "../../Model/Prodotto";
import { ServiceService } from "../../Service/service";
import { ActivatedRoute } from "@angular/router";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SuccessdialogComponent} from "../successdialog/successdialog.component";
import {AcquistoComponent} from "../acquisto/acquisto.component";

@Component({
  selector: 'app-cart',
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css"
})

export class CartComponent implements OnInit {
  utente: any = localStorage.getItem("cf");
  cart: Prodotto[] = [];
  grandTotal: number = 0;

  constructor(private route: ActivatedRoute, private service: ServiceService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadCartData();
  }


  loadCartData() {
    this.service.getCartProduct(this.utente).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.calculateTotalAmount();
      },
    });
  }


  calculateTotalAmount() {
      this.cart.forEach((item: Prodotto) => {
        this.grandTotal += item.prezzo;
      });
  }



  emptyCart() {
  }

  completaAcquisto(){
    this.dialog.open(AcquistoComponent).afterClosed().subscribe(() => {
      if (localStorage.getItem("successPayment") === 'true'){
        console.log("rimozione carrello database");
        //rimuovi dal database il carrello
      }
    });
  }


  removeItem(id_prodotto: string) {
    this.service.removeItem(this.utente, id_prodotto).subscribe({
      next: () => window.location.reload()
    })
  }




}

