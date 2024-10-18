import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListingComponent } from '../listing/listing.component';
import { ListingInfo } from '../main/listing-info';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ListingComponent, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  listingInfoList: ListingInfo[] = [
    {"location": "Cleveland", 
      "photo": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {"location": "not Cleveland",
      "photo": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  constructor(private router: Router) { }

  navigateToProfilePage() {
    this.router.navigate(['/profile-page']);
  }
}



