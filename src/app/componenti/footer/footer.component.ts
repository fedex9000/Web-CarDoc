import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
  originalAddress: String = "";
  addressComponents: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    const [street, city, county, postalcode] = this.originalAddress.split(';').map(component => component.trim());
    this.addressComponents = {
      street: 'V.le delle Scienze',
      city: 'Quattromiglia',
      county: 'CS',
      postalcode: 87036
    };
    this.addressComponents.street = this.addressComponents.street.split(" ").join("+");
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('./leaflet-map').then((module) => {
        module.initMap(this.addressComponents);
      });
    }
  }
}
