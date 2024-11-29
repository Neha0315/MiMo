// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// // import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   // providers: [provideRouter(routes)]
// };

// import { RouterModule } from '@angular/router';

// @NgModule({
//   declarations: [
//     ListingComponent,
//     MessagesComponent,
//   ],
//   imports: [
//     RouterModule.forRoot(routes),
//     // other imports
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}

// import { NgModule } from '@angular/core';


// import { RouterModule } from '@angular/router';
// import { routes } from './app.routes';

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes)
//     // other imports
//   ],
//   exports: [RouterModule]
// })
// export class AppConfig {}


import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent, // Add your components here
    // e.g., MessagesComponent`````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent, // Add your components here
    // e.g., MessagesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Include RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppConfig {} // Name of the module class

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Include RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppConfig {} // Name of the module class
