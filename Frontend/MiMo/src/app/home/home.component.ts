import { Component } from '@angular/core';
// import { Posts } from '../posts';
import { PostsComponent } from '../posts/posts.component'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
