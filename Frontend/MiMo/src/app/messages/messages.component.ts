import { Component } from '@angular/core';
<<<<<<< Updated upstream
=======
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
>>>>>>> Stashed changes

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
<<<<<<< Updated upstream
  styleUrl: './messages.component.css'
=======
  imports: [FormsModule, CommonModule, ButtonModule],
  styleUrls: ['./messages.component.css']
>>>>>>> Stashed changes
})
export class MessagesComponent {

}
