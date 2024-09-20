import { Component } from '@angular/core';
import { ListingComponent } from '../listing/listing.component';
import { ListingInfo } from '../listing-info';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ListingComponent],
  templateUrl: './posts.component.html',
  // template:
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  listingInfoList: ListingInfo[] = [
    {"location": "Cleveland"},
    {"location": "not Cleveland"}
  ];

}
