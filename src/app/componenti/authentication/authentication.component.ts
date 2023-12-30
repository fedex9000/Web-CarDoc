import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ServiceService} from "../../Service/service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent implements OnInit{

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService
  ){}

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }
}
