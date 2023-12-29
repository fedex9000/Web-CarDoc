import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent implements AfterViewInit{
  constructor(
    private breakpointObserver: BreakpointObserver,
    //public auth: AuthService
  ){}

  ngAfterViewInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait]).subscribe(result => {

    });
  }
}
