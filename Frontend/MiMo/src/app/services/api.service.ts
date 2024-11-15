import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService 
{
  
  //this is the url for the backend main.py(must add the ip address if hosted on a different device) 
  private apiUrl = 'http://127.0.0.1:8000';  

  constructor(private http: HttpClient) { }

  //run the test api connection
  runTest() : Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.apiUrl}/test`);
  }

  // Posts
  getPosts(numberOfPosts: number): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.apiUrl}/posts/${numberOfPosts}`);
  }

  getPost(postId: string): Observable<any> 
  {
    return this.http.get<any>(`${this.apiUrl}/post/${postId}`);
  }

  createPost(postData: any): Observable<any> 
  {
    return this.http.post<any>(`${this.apiUrl}/post`, postData);
  }

  modifyPost(postData: any): Observable<any> 
  {
    return this.http.post<any>(`${this.apiUrl}/post/modify`, postData);
  }

  // Profiles
  getProfile(userId: string): Observable<any> 
  {
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
  }

  createProfile(profileData: any): Observable<any> 
  {
    return this.http.post<any>(`${this.apiUrl}/profile`, profileData);
  }

  // Messages
  getMessages(userId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.apiUrl}/messages/${userId}`);
  }

  getMessagesBetweenUsers(receiverId: string, senderId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.apiUrl}/messages/${receiverId}/${senderId}`);
  }

  sendMessage(messageData: any): Observable<any> 
  {
    return this.http.post<any>(`${this.apiUrl}/messages`, messageData);
  }
}