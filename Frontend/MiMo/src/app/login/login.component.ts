import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent 
{
  username: string = ''; 
  password: string = ''; 

  constructor(private router: Router) {} 

  login(): void 
  {
    if (this.username && this.password) 
      {
      localStorage.setItem('username', this.username);
  
      // Instead of navigating directly to profile, you can pass data or force a reload
      this.router.navigate(['/profile-page']).then(() => {
        window.location.reload();  // Forces the page to reload, ensuring fresh profile data
      });
    } else {
      alert('Please enter both username and password');
    }
  }
  
  navigateToRegister()
  {
    this.router.navigate(['/register']);
  }

  navigateToProfile()
  {
    this.router.navigate(['/profile-page']);
  }

}