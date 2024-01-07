import { Component, OnInit } from "@angular/core";
import { Prodotto } from "../../Model/Prodotto";
import { ServiceService } from "../../Service/service";
import { ActivatedRoute } from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css"
})

export class CartComponent implements OnInit {
  utente: any = localStorage.getItem("cf");
  cart: Prodotto[] = [];
  public grandTotal: number = 0;

  constructor(private route: ActivatedRoute, private service: ServiceService) {}

  ngOnInit() {
    this.loadCartData();
  }

  loadCartData() {
    this.service.getCartProduct(this.utente).subscribe({
      next: (cart) => {
        this.cart = cart;
      },
    });
  }



  calculateGrandTotal() {
    //this.grandTotal = this.service.getTotalPrice();
  }

  removeItem(item: Prodotto) {
    //this.service.removeCartItem(item);
    //this.calculateGrandTotal();
  }

  emptyCart() {
    //this.service.removeAllCart();
    //this.calculateGrandTotal();
  }




}

