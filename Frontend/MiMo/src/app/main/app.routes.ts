import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from '../main/app.component';
import { PostsComponent } from '../posts/posts.component';
import {ProfilePageComponent} from '../profile-page/profile-page.component';

export const routes: Routes = [  
    { path: '', redirectTo: '/posts', pathMatch: 'full' },  // Default route to Posts page
    { path: 'posts', component: PostsComponent },  // Route for Posts page
    { path: 'profile-page', component: ProfilePageComponent },  // Route for Profile page
    { path: '**', redirectTo: '/posts' }  // Wildcard to handle invalid routes
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }



