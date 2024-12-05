
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService implements OnInit 
{
  private watchlistItemsSubject = new BehaviorSubject<any[]>([]);
  watchlistItems$ = this.watchlistItemsSubject.asObservable();

  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchWatchlist();
  }

  get currentWatchlist(): string[] {
    return this.watchlistItemsSubject.value;
  }

  isInWatchlist(postId: string): boolean {
    return this.currentWatchlist.includes(postId);
  }

  fetchWatchlist(): void {
    // Retrieve username from localStorage, ensuring it's a string or null
    const username = localStorage.getItem('username');

    if (!username) {
      this.errorMessage = 'No username found. Please log in.';
      return;
    }

    this.apiService.getProfileByID(username).subscribe(
      (response) => {
        const accountId = response.account_id;

        if (!accountId) {
          this.errorMessage = 'Account ID not found.';
          return;
        }
    
        this.apiService.getWatchList(accountId).subscribe(
          (data: any[]) => {
            this.watchlistItemsSubject.next(data);
          },
          (error) => {
            this.errorMessage = 'Failed to fetch watchlist from the server.';
            console.error(error);
          }
        );
      },
      (error) => {
        this.errorMessage = 'Failed to retrieve profile information.';
        console.error(error);
      }
    );
  }

  removeItem(postId: string): void {
    const username = localStorage.getItem('username');
    
    if (!username) {
      this.errorMessage = 'No username found. Please log in.';
      return;
    }

    this.apiService.getProfileByID(username).subscribe(
      (response) => {
        const accountId = response.account_id;

        if (!accountId) {
          this.errorMessage = 'Account ID not found.';
          return;
        }

        this.apiService.removeWatchList(accountId, postId).subscribe(
          () => {
            // Refresh the watchlist after removing the item
            this.fetchWatchlist();
          },
          (error) => {
            this.errorMessage = 'Failed to remove item from watchlist.';
            console.error(error);
          }
        );
      },
      (error) => {
        this.errorMessage = 'Failed to retrieve profile information.';
        console.error(error);
      }
    );
  }

  addItem(postId: string): void {
    const username = localStorage.getItem('username');
  
    if (!username) {
      this.errorMessage = 'No username found. Please log in.';
      return;
    }
  
    this.apiService.getProfileByID(username).subscribe(
      (response) => {
        const accountId = response.account_id;
  
        if (!accountId) {
          this.errorMessage = 'Account ID not found.';
          return;
        }
  
        this.apiService.addWatchList(accountId, postId).subscribe(
          () => {
            // Refresh the watchlist after adding the item
            this.fetchWatchlist();
          },
          (error) => {
            this.errorMessage = 'Failed to add item to watchlist.';
            console.error(error);
          }
        );
      },
      (error) => {
        this.errorMessage = 'Failed to retrieve profile information.';
        console.error(error);
      }
    );
  }
  
}