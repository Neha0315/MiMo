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
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostsComponent, ListingComponent, CommonModule, HttpClientModule, ButtonModule],
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

  navigateToLogin()
  {
    this.router.navigate(['/login']);
  }

  navigateToMessage()
  {
    this.router.navigate(['/message']);
  }

}

export class MainPageComponent 
{

}


