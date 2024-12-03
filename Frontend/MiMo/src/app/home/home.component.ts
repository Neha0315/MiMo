import { Component } from '@angular/core';
// import { Posts } from '../posts';
import { PostsComponent } from '../posts/posts.component'; 
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostsComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
