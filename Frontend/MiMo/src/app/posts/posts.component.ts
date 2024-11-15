import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListingComponent } from '../listing/listing.component';
import { ListingInfo } from '../main/listing-info';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ListingComponent, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

/*
//this is first data
export class PostsComponent 
{
  listingInfoList: ListingInfo[] = [
    {"location": "Cleveland", 
      "photo": "assets/Apt1.png",
      "title": "Apartment 1",
      "price": 600,
    },
    {"location": "Cleveland",
      "photo": "assets/Apt2.png",
      "title": "Apartment 2",
      "price": 1000,
    },
    {"location": "Cleveland",
      "photo": "assets/Apt3.png",
      "title": "Apartment 3",
      "price": 800,
    },
    {"location": "Cleveland",
      "photo": "assets/Apt4.png",
      "title": "Apartment 4",
      "price": 1200,
    },
    {"location": "Cleveland",
      "photo": "assets/Apt5.png",
      "title": "Apartment 5",
      "price": 900,
    },
    {"location": "Cleveland",
      "photo": "assets/Apt6.jpg",
      "title": "Apartment 6",
      "price": 2500,
    }, 
  ];
  
  isGoodPrice: boolean = true;
  isBadPrice: boolean = false;

  constructor(private router: Router) { }

  navigateToProfilePage() {
    this.router.navigate(['/profile-page']);
  }
}
*/

//need to replace the first post component with this one
//this is from database posts
export class PostsComponent implements OnInit 
{
  posts: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void 
  {
    this.loadPosts();
  }

  private loadPosts(): void 
  {
    this.apiService.getPosts(10).subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading posts. Please try again later.';
        this.loading = false;
        console.error('Error fetching posts:', error);
      }
        
    });

  }

  listingInfoList = this.posts;
  
}






