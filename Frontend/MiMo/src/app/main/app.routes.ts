import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../main/app.component';
import { PostsComponent } from '../posts/posts.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'posts', component: PostsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }
  