import { Component, Input } from '@angular/core';
import { ListingInfo } from '../listing-info';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  @Input() listingInfo!:ListingInfo;
}
