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
export class AdminCplComponent implements OnInit{
  public RimuoviUserForm: FormGroup = new FormGroup({});
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;


  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.RimuoviUserForm = new FormGroup({
      cf: new FormControl()
    })
  }

  onRemoveUserFormSubmit(){
    let cf = this.RimuoviUserForm.value.cf;
    this.service.getUtente(cf).subscribe({
      next: (utente) => {
        if (utente != null){
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.service.removeUtente(cf).subscribe();
          this.RimuoviUserForm.reset();
        }
      },
      error:() =>{
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      }
    })

  }

}
