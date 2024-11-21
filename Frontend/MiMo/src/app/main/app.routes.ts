import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from '../main/app.component';
import { PostsComponent } from '../posts/posts.component';
import {ProfilePageComponent} from '../profile-page/profile-page.component';
import {HomeComponent} from '../home/home.component';
import { PostPageComponent } from '../post-page/post-page.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [  
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route to Home page
    { path: 'posts', component: PostsComponent },  // Route for Posts page
    { path: 'profile-page', component: ProfilePageComponent },  // Route for Profile page
    { path: 'home', component: HomeComponent },  // Route for Profile page
    { path: 'post/:post_id', component: PostPageComponent },  // Route for Post Details page
    { path: 'add-post', component: CreatePostComponent },  // Route for Add Post page
    // { path: '**', redirectTo: '/posts' }  // Wildcard to handle invalid routes
  ];
  
  @NgModule({

    imports: [RouterModule.forRoot(routes), FormsModule],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }



