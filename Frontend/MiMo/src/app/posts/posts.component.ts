import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListingComponent } from '../listing/listing.component';
import { ListingInfo } from '../main/listing-info';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ListingComponent, CommonModule, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

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
        this.listingInfoList = data;
        console.log(data);
        console.log(data.length)
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






