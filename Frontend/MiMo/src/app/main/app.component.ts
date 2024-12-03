import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { ListingComponent } from '../listing/listing.component';
<<<<<<< Updated upstream
import { CommonModule } from '@angular/common'; // Import CommonModule
=======
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Button, ButtonModule } from 'primeng/button';
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterOutlet, PostsComponent, ListingComponent, CommonModule],
=======
  imports: [RouterOutlet, PostsComponent, ListingComponent, CommonModule, HttpClientModule, ButtonModule],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  title = 'MiMo';

  constructor(private router: Router) { 
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

  navigateToMessages() {
    this.router.navigate(['/messages']);
  }

}

export class MainPageComponent {

}
