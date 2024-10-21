import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../services/watchlist.service';


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})

export class ProfilePageComponent implements OnInit {
  watchlistItems: any[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {  // Make sure to include the return type
    this.watchlistService.watchlistItems$.subscribe(items => {
      this.watchlistItems = items;
    });
  }
}
