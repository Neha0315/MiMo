import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private listingsSubject = new BehaviorSubject<any[]>([]);
  listings$ = this.listingsSubject.asObservable();

  addListing(newListing: any): void {
    const currentListings = this.listingsSubject.value;
    this.listingsSubject.next([...currentListings, newListing]);
  }
}

