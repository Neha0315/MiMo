import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from './app.component';
import { PostsComponent } from '../posts/posts.component';
import {ProfilePageComponent} from '../profile-page/profile-page.component';
import {HomeComponent} from '../home/home.component';
import { MessagesComponent } from '../messages/messages.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [  
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route to Home page
    { path: 'posts', component: PostsComponent },  // Route for Posts page
    { path: 'profile-page', component: ProfilePageComponent },  // Route for Profile page
    { path: 'home', component: HomeComponent },  // Route for Profile page
    { path: 'messages', component: MessagesComponent },  // Route for Profile page

    // { path: '**', redirectTo: '/posts' }  // Wildcard to handle invalid routes
  ];
  
  @NgModule({
<<<<<<< Updated upstream
    imports: [RouterModule.forRoot(routes)],
=======

    imports: [
      RouterModule.forRoot(routes), 
      FormsModule,
      ButtonModule,
      BrowserAnimationsModule
    ],
>>>>>>> Stashed changes
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }



