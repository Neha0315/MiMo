import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  postId: string = '';
  post: any = {};
  loading = true;
  error: string | null = null;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has('post_id')) {
        this.postId = params.get('post_id')!;
        console.log(this.postId);
      }

      this.loadPost(this.postId);


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







}