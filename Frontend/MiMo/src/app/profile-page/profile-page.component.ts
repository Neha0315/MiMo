import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../services/watchlist.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ListingService } from '../services/listing.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})

export class ProfilePageComponent implements OnInit 
{
  username: string | null = ''; 
  profile: any = {}; // Profile data
  loading: boolean = false;
  error: string | null = null;
  watchlistItems: any[] = [];
  listings: any[] = [];

  title = 'Profile';

  constructor(
    private watchlistService: WatchlistService, 
    private apiService: ApiService, 
    private listingService: ListingService) 
    {
      this.username = localStorage.getItem('username');
    }

    ngOnInit(): void 
    {
      this.username = localStorage.getItem('username');
      if (this.username) 
      {
        this.loadUserProfile();
        this.loadWatchlist();
      } 
      else {
        this.error = 'Username not available';
      }

      this.listingService.listings$.subscribe((listings) => {
        this.listings = listings;
      });
    }
    
    loadUserProfile(): void 
    {
      this.loading = true;
      this.error = null;

      console.log(this.username);
      if (this.username) 
        {
          this.apiService.getProfile(this.username).subscribe({
          next: (data) => {
            if (data.error) 
              {
              this.error = data.error;
            } 
            else 
            {
              console.log('Profile data:', data);
              this.profile = data;
            }
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Failed to load profile. Please try again.';
            this.loading = false;
            console.error('Error loading profile:', error);
          }
        });
      } else {
        this.error = 'Username is not available.';
        this.loading = false;
      }
    }

    loadWatchlist(): void 
    {
      this.watchlistService.watchlistItems$.subscribe({
        next: (items) => {
          console.log('Watchlist items:', items);
          this.watchlistItems = items;
        },
        error: (error) => {
          console.error('Failed to load watchlist:', error);
          this.error = 'Failed to load watchlist.';
        }
      });
    }

    addListingToProfile(newListing: any) {
      this.profile.listings.push(newListing);
    }
   
}



