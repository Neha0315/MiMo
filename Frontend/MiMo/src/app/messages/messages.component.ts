import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { FormsModule } from '@angular/forms'; 

@Component({
  standalone: true,
  selector: 'app-message',
  templateUrl: './messages.component.html',
  imports: [FormsModule],
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  // Form fields
  senderUsername: string | null = ''; // Replace with actual logged-in username
  receiverUsername: string = '';
  messageText: string = '';

  constructor(private apiService: ApiService) {}

  // Send message function
  sendMessage() {
    // Get sender username from local storage
    this.senderUsername = localStorage.getItem('username');

    if (!this.senderUsername) {
      alert('Sender username not found. Please log in.');
      return;
    }

    if (!this.messageText) {
      alert('Message cannot be empty!');
      return;
    }

    if (!this.receiverUsername) {
      alert('Receiver username cannot be empty!');
      return;
    }

    // Step 1: Get sender account ID
    this.apiService.getProfileByID(this.senderUsername).subscribe(
      (senderResponse) => {
        const senderId = senderResponse.account_id;

        // Step 2: Get receiver account ID
        this.apiService.getProfileByID(this.receiverUsername).subscribe(
          (receiverResponse) => {
            const receiverId = receiverResponse.account_id;

            // Step 3: Prepare message data
            const messageData = {
              sender_id: senderId, // Sender account ID
              reciver_id: receiverId, // Receiver account ID
              message: this.messageText
            };

            // Step 4: Send the message
            this.apiService.sendMessage(messageData).subscribe(
              (response) => {
                alert('Message sent successfully!');
                this.messageText = ''; // Clear the message field
              },
              (error) => {
                console.error('Error sending message:', error);
                alert('Failed to send the message.');
              }
            );
          },
          (error) => {
            console.error('Error fetching receiver profile:', error);
            alert('Failed to resolve receiver profile. Please check the username.');
          }
        );
      },
      (error) => {
        console.error('Error fetching sender profile:', error);
        alert('Failed to resolve sender profile. Please try again.');
      }
    );
  }
}
