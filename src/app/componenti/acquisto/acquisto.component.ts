import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-acquisto',
  templateUrl: './acquisto.component.html',
  styleUrl: './acquisto.component.css'
})
export class AcquistoComponent {
  duration: any =  1000;

  constructor(private _formBuilder: FormBuilder) {}
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

}
