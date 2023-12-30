import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ServiceService} from "../../Service/service";
import {BreakpointObserver, BreakpointState, MediaMatcher} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {Prodotti} from "../../Model/Prodotti";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  prodotti: Prodotti[] = [];
  images: string[] = [];
  smallDevice: boolean = false;

  ngOnInit(): void {

    this.service.getProdotti().subscribe({
      next: (prodotti) => {
        this.prodotti = prodotti;
      },
    });

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










}
