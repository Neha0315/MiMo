import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ListingInfo } from '../main/listing-info';
import { ListingComponent } from '../listing/listing.component';
import { WatchlistService } from '../services/watchlist.service';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [ListingComponent],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit 
{
  @Input() listingInfo: any;
  
  postId: string = '';
  post: any = {};
  images: string[] = [];
  loading = true;
  error: string | null = null;
  isInWatchlist: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has('post_id')) {
        this.postId = params.get('post_id')!;
        console.log(this.postId);
      }

      this.loadPost(this.postId);
      this.loadPostImage(this.postId);

      this.isInWatchlist = this.watchlistService.isInWatchlist(this.post.id);

    });
  }

  currentIndex: number = 0;

  nextImage() {
    console.log(this.images);
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first image
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1; // Loop back to the last image
    }
  }

  private loadPostImage(postId: string): void
  {
    this.apiService.getPostImage(postId).subscribe({
      next: (data) => {
        if (data !== null) {
          this.images = data;
        }
        console.log(data);
      },
      error: (error) => {
        this.error = 'Error loading posts. Please try again later.';
        this.loading = false;
        console.error('Error fetching posts:', error);
      }
        
    });

  }

  private loadPost(postId: string): void 
  {
    this.apiService.getPost(postId).subscribe({
      next: (data) => {
        this.post = data;
        this.loading = false;
        console.log(data);
      },
      error: (error) => {
        this.error = 'Error loading posts. Please try again later.';
        this.loading = false;
        console.error('Error fetching posts:', error);
      }
        
    });

  }

  toggleWatchlist(event: MouseEvent): void 
  {
    event.stopPropagation(); // Prevent parent click handlers
  
    if (this.isInWatchlist) {
      this.watchlistService.removeItem(this.postId);
    } else {
      this.watchlistService.addItem(this.postId);
    }
  
    // Toggle the button's visual state
    this.isInWatchlist = !this.isInWatchlist;
  }







}