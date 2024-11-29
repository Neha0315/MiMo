import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { ListingComponent } from '../listing/listing.component';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostsComponent, ListingComponent, CommonModule],
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
