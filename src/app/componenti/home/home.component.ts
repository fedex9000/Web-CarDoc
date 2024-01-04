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
  images: string[] = [];
  smallDevice: boolean = false;
  selectedCategory: any = "";
  searchedWord: any = "";

  ngOnInit(): void {
    this.setCategoryProduct();
    this.getSearchedWord();

    if (this.selectedCategory != null) {
      this.service.getCategoryProduct(this.selectedCategory).subscribe({
        next: (prodotti) => {
          console.log("categoria selezionata");
          this.prodotti = prodotti;
        },
      });
    } else if (this.searchedWord != null) {
      this.service.getSearchedProduct(this.searchedWord).subscribe({
        next: (prodotti) => {
          console.log("parola cercata");
          this.prodotti = prodotti;
          if (this.prodotti.length == 0){
            console.log("Nessun prodotto trovato");
          }
        },
      });
    } else {
      this.service.getProdotti().subscribe({
        next: (prodotti) => {
          console.log("prodotti normali");
          this.prodotti = prodotti;
        },
      });
    }
    localStorage.removeItem("categoria");
    localStorage.removeItem("searchedWord");
  }

  private mobileQuery: MediaQueryList;

  constructor(private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher, private router: Router, private service: ServiceService) {
    // detect screen size changes
    this.breakpointObserver.observe(["(max-width: 1450px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.smallDevice = true;
      } else {
        this.smallDevice = false;
      }
    });
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
  }

  Mobile(): boolean {
    return this.mobileQuery.matches;
  }

  setCategoryProduct(){
    this.selectedCategory = localStorage.getItem("categoria");
  }

  getSearchedWord(){
    this.searchedWord = localStorage.getItem("searchedWord");
  }

}
