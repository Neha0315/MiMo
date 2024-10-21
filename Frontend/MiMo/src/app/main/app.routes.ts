import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from '../main/app.component';
import { PostsComponent } from '../posts/posts.component';
import {ProfilePageComponent} from '../profile-page/profile-page.component';
import {HomeComponent} from '../home/home.component';

export const routes: Routes = [  
<<<<<<< Updated upstream
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route to Home page
=======
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route to Posts page
>>>>>>> Stashed changes
    { path: 'posts', component: PostsComponent },  // Route for Posts page
    { path: 'profile-page', component: ProfilePageComponent },  // Route for Profile page
    { path: 'home', component: HomeComponent },  // Route for Profile page

    // { path: '**', redirectTo: '/posts' }  // Wildcard to handle invalid routes
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }



