import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit  {
  apartmentForm: FormGroup = new FormGroup({});
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, private http: HttpClient) {}

  ngOnInit() {
    // Initialize the form
    this.apartmentForm = this.fb.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      bedrooms: [1, [Validators.required, Validators.min(1)]],
      bathrooms: [1, [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      shared: ['no', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      photos: [null] // Can handle file input separately
    });
  }

  onSubmit() {
    if (this.apartmentForm.valid) {
      let form_data = this.apartmentForm.value;
      form_data.shared = form_data.shared === 'yes' ? 1 : 0;

      let send_me = {
        "poster_id": 0,
        "title": form_data.title,
        "about": form_data.about,
        "bedroom": form_data.bedrooms,
        "bathroom": form_data.bathrooms,
        "shared": form_data.shared,
        "addr": form_data.address,
        "listed_price": form_data.price
      };

      console.log(send_me); // Here is the form data
      this.apiService.createPost(send_me).subscribe(
        (response: any) => {
          console.log(response);
          let id = response.success;
          if (this.selectedFiles.length > 0) {
            const formData = new FormData();
            this.selectedFiles.forEach(file => {
              formData.append('files', file);
            });
            this.http.post(`http://localhost:8000/upload-images/${id}`, formData).subscribe(response => {
              console.log('Upload response:', response);
            });
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.apartmentForm.patchValue({
      photos: this.selectedFiles
    });
  }
}