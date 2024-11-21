import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { ListingComponent } from '../listing/listing.component';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostsComponent, ListingComponent, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  title = 'MiMo';
  loading: boolean = false;  
  error: string | null = null;  
  posts: any[] = [];


  constructor(
    private router: Router,
    private apiService: ApiService  // Inject ApiService
  ) {}

  navigateToAddPost() {
    this.router.navigate(['/add-post']);
  }

  navigateToProfilePage() {
    this.router.navigate(['/profile-page']);
  }

  navigateToPosts() {
    this.router.navigate(['/posts']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  fetchData()
  {
    fetch("http://localhost:8000/data")
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: unknown) => {
        console.log(data);
      })
      .catch((error: Error) => {
        console.error('Error:', error.message);
      });

  }

  fetchData2(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getProfile('nxp330') // Use ApiService
      .subscribe({
        next: (data) => {
          console.log(data);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to fetch data: ' + error.message;
          this.loading = false;
          console.error('Error fetching data:', error);
        }
      });
  }

  fetchPosts() 
  {
    console.log("fetch button works");
    this.loading = true;
    this.error = null;
    
    this.apiService.getPosts(5).subscribe({
      next: (data) => {
        this.posts = data;
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

export class MainPageComponent 
{

}


