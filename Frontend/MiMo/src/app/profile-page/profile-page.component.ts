import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../services/watchlist.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
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

  title = 'Profile';

  constructor(
    private watchlistService: WatchlistService, 
    private apiService: ApiService) 
    {
      this.username = localStorage.getItem('username');
    }

    ngOnInit(): void 
    {
      // Ensure the profile is loaded on init with the updated username
      this.username = localStorage.getItem('username');
      if (this.username) 
      {
        this.loadUserProfile();  // Load the profile data for the updated username
      } 
      else 
      {
        this.error = 'Username not available';
      }
    
      // Subscribe to watchlist items
      this.watchlistService.watchlistItems$.subscribe(items => {
        this.watchlistItems = items;
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
    
}



