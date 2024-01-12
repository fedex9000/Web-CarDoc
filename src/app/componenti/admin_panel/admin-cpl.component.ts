import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ServiceService} from "../../Service/service";
import {ErrordialogComponent} from "../errordialog/errordialog.component";
import { NgxImageCompressService } from 'ngx-image-compress';
import {SuccessdialogComponent} from "../successdialog/successdialog.component";
@Component({
  selector: 'app-admin-cpl',
  templateUrl: './admin-cpl.component.html',
  styleUrls: ['./admin-cpl.component.css']
})
export class AdminCplComponent implements OnInit {
  public formAggiungiProdotto: FormGroup = new FormGroup({});

  selectedProduct: string = "";
  selectedCategory: string = "";
  image: string = "";

  myproductSelection: boolean = false;

  constructor(private service: ServiceService, public dialog: MatDialog, private compressImage: NgxImageCompressService) {}

  ngOnInit(): void {

    this.formAggiungiProdotto = new FormGroup({
      id: new FormControl(),
      nome: new FormControl(),
      venditore: new FormControl(),
      descrizione: new FormControl(),
      prezzo: new FormControl(),
      foto: new FormControl(),
    });
  }


  onSubmit() {
    this.saveOrUpdateProduct();
  }


  onValueTypeSelected(event: any) {
    this.selectedCategory = event.target.value;

  }

  onFileChange(event: any) {
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
    if (this.checkValidity("saveOrUpdate")){
      this.service.saveOrUpdateProduct({
        id: this.selectedProduct,
        nome: this.formAggiungiProdotto.value.nome,
        venditore: this.formAggiungiProdotto.value.venditore,
        descrizione: this.formAggiungiProdotto.value.descrizione,
        categoria: this.selectedCategory,
        prezzo: this.formAggiungiProdotto.value.prezzo,
      }).subscribe({
        next: () => {
          const dialog = this.dialog.open(SuccessdialogComponent);

          dialog.afterClosed().subscribe(() => {
            window.location.reload();
            this.createImage();
          });
        }
      });
    }else{
      this.dialog.open(ErrordialogComponent);
    }

  }

  removeProduct(): void {
    if (this.checkValidity("delete")){
      this.service.removeProduct(this.selectedProduct).subscribe({
        next: () => {
          const dialog = this.dialog.open(SuccessdialogComponent);

          dialog.afterClosed().subscribe(() => {
            window.location.reload();
          });
        }
      });
    }else{
      this.dialog.open(ErrordialogComponent);
    }

  }

  checkValidity(type: string): boolean{
    if (type === "saveOrUpdate"){
        if (this.selectedProduct == null ||
          (this.formAggiungiProdotto.value.nome == null || this.formAggiungiProdotto.value.nome == '') ||
          (this.formAggiungiProdotto.value.venditore == null || this.formAggiungiProdotto.value.venditore == '')||
          (this.formAggiungiProdotto.value.descrizione == null || this.formAggiungiProdotto.value.descrizione == '') ||
          this.selectedCategory == '' ||
          (this.formAggiungiProdotto.value.prezzo == null || this.formAggiungiProdotto.value.prezzo == '') ||
          this.image == '' ){
          return false;
        }else{
          return true;
        }
    }else if (type === "delete"){
      if (this.selectedProduct != null &&
        (this.formAggiungiProdotto.value.nome == null || this.formAggiungiProdotto.value.nome == '') &&
        (this.formAggiungiProdotto.value.venditore == null || this.formAggiungiProdotto.value.venditore == '') &&
        (this.formAggiungiProdotto.value.descrizione == null || this.formAggiungiProdotto.value.descrizione == '') &&
        this.selectedCategory == '' &&
        (this.formAggiungiProdotto.value.prezzo == null || this.formAggiungiProdotto.value.prezzo == '')){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }

  createImage(){
    this.service.createImage({
      id: null,
      img: this.image,
      id_prodotto: this.selectedProduct,
    }).subscribe({
      error: () => this.dialog.open(ErrordialogComponent),
    });
  }

}
