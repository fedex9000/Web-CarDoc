import {Component, OnInit} from '@angular/core';
import {DettagliOrdine} from "../../Model/DettagliOrdine";
import {ServiceService} from "../../Service/service";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-dettagli-ordine',
  templateUrl: './dettagli-ordine.component.html',
  styleUrl: './dettagli-ordine.component.css'
})
export class DettagliOrdineComponent implements OnInit{
  dettagliOrdine: DettagliOrdine[] = [];
  utente: any = localStorage.getItem("cf");
  odineSelezionato: any = localStorage.getItem("ordineSelezionato");
  images: { [key: string]: string } = {};




  constructor(private service: ServiceService, public dialog: MatDialog, private auth: AuthService) {}


  ngOnInit(): void {
    console.log('OnInit executed');

    document.addEventListener('DOMContentLoaded', function () {
      console.log('DOMContentLoaded executed');

      const downButton = document.querySelector('.down') as HTMLElement;
      const upButton = document.querySelector('.up') as HTMLElement;
      const inputField = document.querySelector('#quantityValue') as HTMLInputElement;

      console.log(downButton, upButton, inputField); // Verifica se gli elementi sono selezionati correttamente

      downButton.addEventListener('click', () => {
        console.log('Down button clicked');
        const value = parseInt(inputField.value);
        if (value > 1) {
          inputField.value = (value - 1).toString();
        }
      });

      upButton.addEventListener('click', () => {
        console.log('Up button clicked');
        const value = parseInt(inputField.value);
        inputField.value = (value + 1).toString();
      });
    });
    this.loadDetailOrder()
  }

  loadDetailOrder(){
    this.service.getDetailOrderByNumber({
      cf: localStorage.getItem("cf"),
      numeroOrdine: localStorage.getItem("ordineSelezionato"),
    }).subscribe({
      next: (dettagliOrdine) => {
        this.dettagliOrdine = dettagliOrdine;
        dettagliOrdine.forEach(dettagli => {
          this.service.findImageByProductID(dettagli.idProdotto).subscribe({
            next: (img) => {
              if (img != null) {
                const base64String = img.img;
                this.images[dettagli.idProdotto] = base64String;
              }
            }
          });
        });
      }
    })

  }


}
