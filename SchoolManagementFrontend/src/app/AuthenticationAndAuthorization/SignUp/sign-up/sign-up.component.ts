import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    HttpClientModule
  ]
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', [Validators.required]]
      },
    );
  }

  // Custom validator to check if passwords match

  // Form submission logic
  signup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;


      console.log('Signup Data:', formData);

      // Send data to the backend
      this.http.post('http://localhost:3000/users/register', formData).subscribe(
        (response: any) => {
          if (response.status === 200) {
            alert('User created successfully!');
            this.router.navigate(['login']).then(r => console.log(r));
          } else {
            alert(response.message);
          }
        },
      );
    } else {
      alert('Please correct the errors in the form before submitting.');
    }
  }
}
