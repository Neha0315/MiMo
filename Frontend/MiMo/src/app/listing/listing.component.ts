import { Component, Input, OnInit } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
// import { ListingInfo } from '../main/listing-info';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-listing',
//   standalone: true,
//   imports: [],
//   templateUrl: './listing.component.html',
//   styleUrl: './listing.component.css'
// })

// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
// import { ListingComponent } from '../listing/listing.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppComponent } from '../main/app.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [RouterOutlet, PostsComponent, ListingComponent, CommonModule],
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
  @Input() listingInfo: any;
  isInWatchlist: boolean = false;

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {  // Make sure to include the return type
    this.isInWatchlist = this.watchlistService.isInWatchlist(this.listingInfo);
  }

  toggleWatchlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.isInWatchlist) {
      this.watchlistService.removeFromWatchlist(this.listingInfo);
    } else {
      this.watchlistService.addToWatchlist(this.listingInfo);
    }
    this.isInWatchlist = !this.isInWatchlist;
  }


  // navigateToMessagePage() {
  //   this.router.navigate(['/profile-page']);
  // }

}