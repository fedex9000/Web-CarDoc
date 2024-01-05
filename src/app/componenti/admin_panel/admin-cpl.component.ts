import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import {ServiceService} from "../../Service/service";
import {AuthService} from "../../auth/auth.service";
import {Utente} from "../../Model/Utente";
import {ErrordialogComponent} from "../errordialog/errordialog.component";
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-admin-cpl',
  templateUrl: './admin-cpl.component.html',
  styleUrls: ['./admin-cpl.component.css']
})
export class AdminCplComponent implements OnInit {
  public formAggiungiProdotto: FormGroup = new FormGroup({});

  selectedProduct: String = "";
  selectedCategory: String = "";
  image: string = "";

  myproductSelection: boolean = false;

  constructor(private service: ServiceService, private auth: AuthService, public dialog: MatDialog, private compressImage: NgxImageCompressService) {}

  ngOnInit(): void {

    this.formAggiungiProdotto = new FormGroup({
      id: new FormControl(),
      nome: new FormControl(),
      venditore: new FormControl(),
      descrizione: new FormControl(),
      prezzo: new FormControl(),
    });
  }


  onSubmit(){
    this.saveOrUpdateProduct();
  }


  onValueTypeSelected(event: any) {
    this.selectedCategory = event.target.value;

  }

  onFileChange(event: any) {
    this.image;
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = e.target.result;

          this.compressImage
            .compressFile(image, -1, 50, 50) // 50% ratio, 50% quality
            .then(compressedImage => {
              this.image = compressedImage;
            })
            .catch(error => {
              this.dialog.open(ErrordialogComponent);
            });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  productExist(): void{
    this.service.getProduct(this.formAggiungiProdotto.value.id).subscribe({
      next:() =>{
        this.myproductSelection = true;
        this.selectedProduct = this.formAggiungiProdotto.value.id;
      },
      error:() => {
        this.myproductSelection = false;
        this.selectedProduct = this.formAggiungiProdotto.value.id;
    }
    })
  }

  openNewProductPage() {
    window.open('http://localhost:4200/prodotto/'+this.selectedProduct, '_blank');
  }


  saveOrUpdateProduct(): void {

    this.service.saveOrUpdateProduct({
      id: this.selectedProduct,
      nome: this.formAggiungiProdotto.value.nome,
      venditore: this.formAggiungiProdotto.value.venditore,
      descrizione: this.formAggiungiProdotto.value.descrizione,
      categoria: this.selectedCategory,
      prezzo: this.formAggiungiProdotto.value.prezzo,
    }).subscribe();

  }

}
