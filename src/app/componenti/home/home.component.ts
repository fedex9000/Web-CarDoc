import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ServiceService} from "../../Service/service";
import {BreakpointObserver, BreakpointState, MediaMatcher} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {Prodotto} from "../../Model/Prodotto";
import {CategoryComponent} from "../category/category.component";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  prodotti: Prodotto[] = [];
  images: { [key: string]: string } = {};
  smallDevice: boolean = false;
  selectedCategory: any = "";
  searchedWord: any = "";
  noProductFound: boolean = false;

  ngOnInit(): void {
    this.setCategoryProduct();
    this.getSearchedWord();
    this.getAllImage();

    if (this.selectedCategory != null) {
      this.service.getCategoryProduct(this.selectedCategory).subscribe({
        next: (prodotti) => {
          this.prodotti = prodotti;
        },
      });
    } else if (this.searchedWord != null) {
      this.service.getSearchedProduct(this.searchedWord).subscribe({
        next: (prodotti) => {
          this.prodotti = prodotti;
          if (this.prodotti.length == 0){
            this.noProductFound = true;
          }
        },
      });
    } else {
      this.service.getProdotti().subscribe({
        next: (prodotti) => {
          this.prodotti = prodotti;
        },
      });
    }
    localStorage.removeItem("categoria");
    localStorage.removeItem("searchedWord");
  }


  constructor(private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher, private router: Router, private service: ServiceService) {
    // detect screen size changes
    this.breakpointObserver.observe(["(max-width: 600px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.smallDevice = true;
      } else {
        this.smallDevice = false;
      }
    });
  }



  setCategoryProduct(){
    this.selectedCategory = localStorage.getItem("categoria");
  }

  getSearchedWord(){
    this.searchedWord = localStorage.getItem("searchedWord");
  }

  getAllImage() {
    if (Object.keys(this.images).length != 0) {
      return;
    }
    this.service.getProdotti().subscribe({
      next: (prodotti) => {
        prodotti.forEach(prod => {
          this.service.findImageByProductID(prod.id).subscribe({
            next: (img) => {
              if (img != null) {
                const base64String = img.img;
                this.images[prod.id] = base64String;
              }
            }
          });
        });
      }
    });
  }

}
