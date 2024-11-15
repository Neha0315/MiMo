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
  watchlistItems: any[] = [];

  profile: any[] = [];
  title = 'Profile';
  loading: boolean = false;  
  error: string | null = null;

  constructor(
    private watchlistService: WatchlistService, 
    private apiService: ApiService) {}

  ngOnInit(): void 
  {  // Make sure to include the return type
    this.watchlistService.watchlistItems$.subscribe(items => {
      this.watchlistItems = items;
    });
  }

  fetchPosts() 
  {
    console.log("fetch button works");
    this.loading = true;
    this.error = null;
    
    this.apiService.getPosts(5).subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
        console.log(data);
      },
      error: (error) => {
        this.error = 'Failed to fetch posts: ' + error.message;
        this.loading = false;
        console.error('Error fetching posts:', error);
      }
    });
  }



}

