import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./componenti/authentication/authentication.component";
import {HomeComponent} from "./componenti/home/home.component";
import {ProfiloComponent} from "./componenti/profilo/profilo.component";
import {AdminCplComponent} from "./componenti/admin_panel/admin-cpl.component";
import {ProdottoComponent} from "./componenti/prodotto/prodotto.component";
import {AcquistoComponent} from "./componenti/acquisto/acquisto.component";
import {CartComponent} from "./componenti/cart/cart.component";
import {PasswordRecoveryComponent} from "./componenti/password-recovery/password-recovery.component";

const routes: Routes = [
  {path: '', component: AuthenticationComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component:  HomeComponent},
      {path: 'profilo', component:  ProfiloComponent},
      {path: 'admin-panel', component:  AdminCplComponent},
      {path: 'prodotto/:id', component:  ProdottoComponent},
      {path: 'carrello', component:  CartComponent},
      {path: 'acquisto', component:  AcquistoComponent},
      { path: 'password-recovery', component: PasswordRecoveryComponent},

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
