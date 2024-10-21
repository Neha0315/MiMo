import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/main/app.config';
import { AppComponent } from './app/main/app.component';
import { provideRouter } from '@angular/router';
import { AppRoutingModule, routes } from './app/main/app.routes';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
  // imports: [AppRoutingModule]
})
  