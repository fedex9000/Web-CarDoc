import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {ErrordialogComponent} from "../errordialog/errordialog.component";
import {SuccessdialogComponent} from "../successdialog/successdialog.component";


@Component({
  selector: 'app-acquisto',
  templateUrl: './acquisto.component.html',
  styleUrl: './acquisto.component.css'
})
export class AcquistoComponent {
  duration: any =  1000;
  success: boolean = false;

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}
  nameFormGroup: FormGroup = this._formBuilder.group({name: ['']});
  surnameFormGroup: FormGroup = this._formBuilder.group({surname: ['']});
  countryFormGroup: FormGroup = this._formBuilder.group({country: ['']});
  provinceFormGroup: FormGroup = this._formBuilder.group({province: ['']});
  capFormGroup: FormGroup = this._formBuilder.group({cap: ['']});
  addressFormGroup: FormGroup = this._formBuilder.group({address: ['']});
  paymentFormGroup: FormGroup = this._formBuilder.group({
    cardNumber: [''],
    expiryDate: [''],
    cvc: ['']
  });


  isFormValid() {
    console.log('nameFormGroup:', this.isStepValid(this.nameFormGroup, 'name'));
    console.log('surnameFormGroup:', this.isStepValid(this.surnameFormGroup, 'surname'));
    console.log('countryFormGroup:', this.isStepValid(this.countryFormGroup, 'country'));
    console.log('provinceFormGroup:', this.isStepValid(this.provinceFormGroup, 'province'));
    console.log('capFormGroup:', this.isStepValid(this.capFormGroup, 'cap'));
    console.log('addressFormGroup:', this.isStepValid(this.addressFormGroup, 'address'));
    console.log('cardNumberValidation:', this.isStepValid(this.paymentFormGroup, 'cardNumber'));
    console.log('expiryDateValidation:', this.isStepValid(this.paymentFormGroup, 'expiryDate'));
    console.log('cvcValidation:', this.isStepValid(this.paymentFormGroup, 'cvc'));

    if(
      this.isStepValid(this.nameFormGroup, 'name') &&
      this.isStepValid(this.surnameFormGroup, 'surname') &&
      this.isStepValid(this.countryFormGroup, 'country') &&
      this.isStepValid(this.provinceFormGroup, 'province') &&
      this.isStepValid(this.capFormGroup, 'cap') &&
      this.isStepValid(this.addressFormGroup, 'address') &&
      this.isStepValid(this.paymentFormGroup, 'cardNumber') &&
      this.isStepValid(this.paymentFormGroup, 'expiryDate') &&
      this.isStepValid(this.paymentFormGroup, 'cvc')
    ){
      this.dialog.open(SuccessdialogComponent).afterClosed().subscribe(() => {
        localStorage.setItem("successPayment", "true");
        window.location.reload();
      });
    }else{
      this.dialog.open(ErrordialogComponent);
    }
  }

  isStepValid(step: FormGroup, controlName: string): boolean {
    return true;
    /*
    let control = step.get(controlName);
    if (control && control.value){
      return this.validateField(controlName, control.value);
    }
    return false;

     */
  }

  validateField(fieldName: string, value: any): boolean {
    switch (fieldName) {
      case 'name' || 'surname' || 'address' || 'country' || 'province':
        return /[a-zA-Z]/.test(value);
      case 'cap':
        return /^\d{5}$/.test(value);
      case 'cardNumber':
        value = value.replace(/\s/g, '');
        return /^\d{16}$/.test(value);
      case 'expiryDate':
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const monthYear = value.split('/');
        const month = Number(monthYear[0]);
        const year = Number(monthYear[1]);

        return month >= 1 && month <= 12 && year >= currentYear;
      case 'cvc':
        return /^\d{3}$/.test(value);
      default:
        return true;
    }
  }

  annulla(){
    window.location.reload();
  }

}
