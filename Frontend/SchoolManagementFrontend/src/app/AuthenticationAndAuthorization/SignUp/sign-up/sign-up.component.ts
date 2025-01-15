import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]], // Role is required
      dateOfBirth: ['', [Validators.required]], // Date of Birth is required
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Validate phone number (10 digits)
      address: ['', [Validators.required]], // Address is required
      profilePicture: ['', []], // Optional (you can add validation if needed)
    });
  }


  signup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value; // Get all form data

      // Convert dateOfBirth to a string format
      formData.dateOfBirth = new Date(formData.dateOfBirth).toISOString().split('T')[0];  // YYYY-MM-DD format

      console.log('Signup Data:', formData);

      // Send the data to the backend API to create the user
      this.http.post('http://localhost:3000/users/register', formData)
        .subscribe(
          (response: any)=>{
            if(response.status === 200){
              console.log("User Created Successfully");
              this.router.navigate(['/login']).then(r => console.log(r));
            }
            if(response.status===400){
              alert(response.message());
            }
            else{
              alert(response.message());
            }

          }
        )
    }
  }
}
