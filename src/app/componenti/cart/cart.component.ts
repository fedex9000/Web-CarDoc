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
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  utente: any = localStorage.getItem("cf");
  cart: Prodotto[] = [];
  grandTotal: number = 0;
  images: { [key: string]: string } = {};
  quantita: { [key: string]: number } = {};



  constructor(private route: ActivatedRoute, private service: ServiceService, public dialog: MatDialog) {}

  ngOnInit() {
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
          this.service.getProductQuantity(this.utente, prod.id).subscribe({
            next: (quantity) =>{
              this.quantita[prod.id] = quantity;
            }
          })
        });
        this.calculateTotalAmount();
      },
    });
  }

  calculateTotalAmount() {
    this.grandTotal = 0;

    this.cart.forEach((item: Prodotto) => {
      this.service.getProductQuantity(this.utente, item.id).subscribe({
        next: (quantity) =>{
          this.quantita[item.id] = quantity;
          this.grandTotal += item.prezzo * quantity;
        }
      })
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
    this.service.removeItemForCart(this.utente, id_prodotto).subscribe({
      next: () => window.location.reload()
    })
  }


  removeAll(cf: string){
    this.service.removeAllForCart(cf).subscribe({
      next: () => window.location.reload()
    })
  }


  protected readonly length = length;
}
