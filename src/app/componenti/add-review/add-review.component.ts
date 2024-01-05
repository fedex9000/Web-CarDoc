import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ServiceService} from "../../Service/service";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent implements AfterViewInit{
  @ViewChild('descriptionInput') descriptionInput?: ElementRef;
  @ViewChild('myCheckbox') checkbox?: ElementRef;
  selectedStars: any;
  isChecked: boolean = false;

  constructor(
    private auth: AuthService,
    private service: ServiceService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    // Attach change event listener to radio buttons
    radioButtons.forEach((radioButton) => {
      this.renderer.listen(radioButton, 'change', (event) => {
        this.selectedStars = (event.target as HTMLInputElement).value;
      });
    });
  }

  addReview(): void {
    // Get the value of the textarea
    const descriptionValue = this.descriptionInput?.nativeElement.value;

    // Get the value of the selected stars
    const starsNumber = parseInt(this.selectedStars, 10);

    this.service.setRecensione({
      id: 0,
      prodotto: this.auth.selectedProduct,
      contenuto: descriptionValue,
      rating: starsNumber,
      utente: localStorage.getItem('cf'),
    }).subscribe();
  }
}
