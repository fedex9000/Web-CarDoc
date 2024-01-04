import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../Service/service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  formRicerca: FormGroup = new FormGroup({});
  constructor(private service: ServiceService) {

  }

  ngOnInit(): void {
    this.formRicerca = new FormGroup({
      searchWord: new FormControl()
    });
  }

  selectedCategoryChange(category: string){
    localStorage.setItem("categoria", category);
  }

  onSearch(){
    localStorage.setItem("searchedWord", this.formRicerca.value.searchWord);
  }
}
