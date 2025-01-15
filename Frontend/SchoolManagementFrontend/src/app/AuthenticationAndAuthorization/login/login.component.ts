import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const loginData = { email, password };

    this.http.post('http://localhost:3000/users/login', loginData).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);

          // Decode the token
          const decodedToken: any = jwtDecode(response.token);
          localStorage.setItem('userId', decodedToken.userId); // Store userId in localStorage

          // Navigate to the dashboard
          this.router.navigate(['Dashboard']).then(r => console.log(r));
        } else {
          alert('Invalid email or password.');
        }
      },
      (error) => {
        alert('Login failed. Please try again.');
        console.log(error);
      }
    );
  }
}
