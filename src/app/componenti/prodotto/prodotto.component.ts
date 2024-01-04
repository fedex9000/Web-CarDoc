import {Component, OnInit} from '@angular/core';
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {ServiceService} from "../../Service/service";
import {Prodotto} from "../../Model/Prodotto";
import {Recensione} from "../../Model/Recensione";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.css'
})
export class ProdottoComponent implements OnInit{

  stringID: string = "";
  nome: string = "";
  descrizione: string = "";
  prezzo: number = 0;
  venditore: string = "";
  categoria: string = "";
  imagesSingleProduct: string = "";

  relatedProductimages: { [key: string]: string } = {};

  prodottiCorrelati: Prodotto[] = [];
  recensioni: Recensione[] = []




  menuOpen = false;
  faFacebook = faFacebook;
  faWhatsapp = faWhatsapp;
  faEnvelope = faEnvelope;


  constructor(private route: ActivatedRoute, private service: ServiceService, public auth: AuthService) {
  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      const downButton = document.querySelector('.down') as HTMLElement;
      const upButton = document.querySelector('.up') as HTMLElement;
      const inputField = document.querySelector('#quantityValue') as HTMLInputElement;

      // Aggiungi gestori di eventi per cliccare su "+" e "-"
      downButton.addEventListener('click', () => {
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
    this.getProductInfo();
  }


  getProductInfo(){
    this.stringID += this.route.snapshot.paramMap.get("id");
    this.service.getProduct(this.stringID).subscribe({
      next: (prodotto) =>{
        this.nome = prodotto.nome;
        this.descrizione = prodotto.descrizione;
        this.prezzo = prodotto.prezzo;
        this.venditore = prodotto.venditore;
        this.categoria = prodotto.categoria;
        this.getRelatedProducts();
        this.service.findImageByProductID(prodotto.id).subscribe({
          next: (img) => {
            if (img != null) {
              const base64String = img.img;
              this.imagesSingleProduct = base64String;
            }
          }
        });
      }
    });


  }

  getRelatedProducts(){
    this.service.getCategoryProduct(this.categoria).subscribe({
      next: (prodotti) =>{
        prodotti = prodotti.filter(prod => prod.id !== this.stringID)
        this.prodottiCorrelati = prodotti;
        this.prodottiCorrelati.forEach(prod =>{
          this.service.findImageByProductID(prod.id).subscribe({
            next: (img) => {
              if (img != null) {
                const base64String = img.img;
                this.relatedProductimages[prod.id] = base64String;
              }
            }
          });
        })
    }
    })
  }

  deleteRecensione(id: number){

  }

  checkIfSameReviewOwner(recensione: Recensione){

  }

}
