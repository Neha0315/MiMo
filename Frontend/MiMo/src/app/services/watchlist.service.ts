
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'  // This makes it available throughout the app without app.module.ts
})
export class WatchlistService {
  // Initialize with empty array
  private watchlistItems = new BehaviorSubject<any[]>([]);
  
  // Observable that components can subscribe to
  public watchlistItems$ = this.watchlistItems.asObservable();

  constructor() {
    // Load any saved items when service starts
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      this.watchlistItems.next(JSON.parse(saved));
    }
  }

  addToWatchlist(item: any) {
    const currentItems = this.watchlistItems.getValue();
    if (!this.isInWatchlist(item)) 
    {
      const updatedItems = [...currentItems, item];
      this.watchlistItems.next(updatedItems);
      localStorage.setItem('watchlist', JSON.stringify(updatedItems));
    }
  }

  removeFromWatchlist(item: any) {
    const currentItems = this.watchlistItems.getValue();
    const updatedItems = currentItems.filter(i => i.title !== item.title);
    this.watchlistItems.next(updatedItems);
    localStorage.setItem('watchlist', JSON.stringify(updatedItems));
  }

  isInWatchlist(item: any): boolean {
    const currentItems = this.watchlistItems.getValue();
    return currentItems.some(i => i.title === item.title);
  }
}