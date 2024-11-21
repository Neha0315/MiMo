import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit  {
  apartmentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

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
      if(form_data.shared == 'yes') {
        form_data.shared = 1;
      } else {
        form_data.shared = 0;
      }

      let send_me = 
      {
        "poster_id": 0,
        "title": form_data.title,
        "about": form_data.about,
        "bedroom": form_data.bedrooms,
        "bathroom": form_data.bathrooms,
        "shared": form_data.shared,
        "addr": form_data.address,
        "listed_price": form_data.price
      }

      console.log(send_me); // Here is the form data
      this.apiService.createPost(send_me).subscribe(
        (response: any) => {
          console.log(response);
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
    const file = event.target.files[0];
    if (file) {
      this.apartmentForm.patchValue({
        photos: file
      });
    }
  }
}