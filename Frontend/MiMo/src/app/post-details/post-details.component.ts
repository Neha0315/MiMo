import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingInfo } from '../main/listing-info'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-details',
  standalone: true, // Mark this component as standalone
  imports: [CommonModule], // Import CommonModule to use common Angular directives like ngIf, ngFor
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  listing: ListingInfo | undefined;

  // Simulate listings array (this can be fetched from a service or passed through state management)
  listings: ListingInfo[] = [
    { location: "Cleveland", photo: "assets/Apt1.png", title: "Apartment 1", price: 600 },
    { location: "Cleveland", photo: "assets/Apt2.png", title: "Apartment 2", price: 1000 },
    { location: "Cleveland", photo: "assets/Apt3.png", title: "Apartment 3", price: 800 },
    { location: "Cleveland", photo: "assets/Apt4.png", title: "Apartment 4", price: 1200 },
    { location: "Cleveland", photo: "assets/Apt5.png", title: "Apartment 5", price: 900 },
    { location: "Cleveland", photo: "assets/Apt6.jpg", title: "Apartment 6", price: 2500 },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    const listingId = +this.route.snapshot.paramMap.get('id')!;
    
    // Fetch the corresponding listing by ID
    this.listing = this.listings[listingId];
  }
}

