import { Component, Input, OnInit } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { ListingInfo } from '../main/listing-info';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit {
  @Input() listingInfo: any;
  isInWatchlist: boolean = false;

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {  // Make sure to include the return type
    console.log("new listing")
    this.isInWatchlist = this.watchlistService.isInWatchlist(this.listingInfo);
    console.log(this.listingInfo);
  }

  toggleWatchlist() {
    if (this.isInWatchlist) {
      this.watchlistService.removeFromWatchlist(this.listingInfo);
    } else {
      this.watchlistService.addToWatchlist(this.listingInfo);
    }
    this.isInWatchlist = !this.isInWatchlist;
  }
}