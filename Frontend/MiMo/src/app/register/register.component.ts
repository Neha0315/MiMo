import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent 
{
  profile = {
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    pw: '',
  };

  constructor(private apiService: ApiService) {}

  submitProfile() {
    // Send the profile data to the API
    this.apiService.createProfile(this.profile).subscribe(
      (response) => {
        alert('Profile created successfully!');
        console.log(response);
      },
      (error) => {
        alert('Failed to create profile. Please try again.');
        console.error(error);
      }
    );
  }

}
