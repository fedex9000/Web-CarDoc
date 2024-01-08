import {AfterViewInit, Component, OnInit} from "@angular/core";
import { Prodotto } from "../../Model/Prodotto";
import { ServiceService } from "../../Service/service";
import { ActivatedRoute } from "@angular/router";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SuccessdialogComponent} from "../successdialog/successdialog.component";
import {AcquistoComponent} from "../acquisto/acquisto.component";
import {Image} from "../../Model/Image";

@Component({
  selector: 'app-cart',
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css"
})

export class CartComponent implements OnInit {
  utente: any = localStorage.getItem("cf");
  cart: Prodotto[] = [];
  grandTotal: number = 0;
  images: { [key: string]: string } = {};


  constructor(private route: ActivatedRoute, private service: ServiceService, public dialog: MatDialog) {}

  ngOnInit() {

    document.addEventListener('DOMContentLoaded', function () {
      const downButton = document.querySelector('.down') as HTMLElement;
      const upButton = document.querySelector('.up') as HTMLElement;
      const inputField = document.querySelector('#quantityValue') as HTMLInputElement;

      // Aggiungi gestori di eventi per cliccare su "+" e "-"
      downButton.addEventListener('click', () => {
        console.log("xazzo");
        const value = parseInt(inputField.value);
        if (value > 1) {
          inputField.value = (value - 1).toString();
        }
      });

      upButton.addEventListener('click', () => {
        const value = parseInt(inputField.value);
        inputField.value = (value + 1).toString();
      });
    });

    this.loadCartData();
    this.verifyPayment();
  }


  loadCartData() {
    this.service.getCartProduct(this.utente).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.cart.forEach((prod: Prodotto) => {
          this.service.findImageByProductID(prod.id).subscribe({
            next: (img) => {
              if (img != null) {
                const base64String = img.img;
                this.images[prod.id] = base64String;
              }
            }
          })
        });
        this.calculateTotalAmount();
      },
    });
  }


  calculateTotalAmount() {
      this.cart.forEach((item: Prodotto) => {
        this.grandTotal += item.prezzo;
      });
  }



  completaAcquisto(){
    this.dialog.open(AcquistoComponent);
  }

  verifyPayment(){
    if (localStorage.getItem("successPayment") === "true"){
      this.removeAll(this.utente);
    }
    localStorage.removeItem("successPayment");
  }


  removeItem(id_prodotto: string) {
    this.service.removeItem(this.utente, id_prodotto).subscribe({
      next: () => window.location.reload()
    })
  }


  removeAll(cf: string){
    this.service.removeAll(cf).subscribe({
      next: () => window.location.reload()
    })
  }




}

