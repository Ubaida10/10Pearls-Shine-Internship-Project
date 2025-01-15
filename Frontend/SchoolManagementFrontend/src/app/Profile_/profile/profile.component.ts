import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IUser } from '../../UserInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ProfileComponent implements OnInit {
  user: IUser | null = null; // Default to null until user data is fetched

  profileForm!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch the user ID from localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in localStorage');
      this.logout(); // Redirect to auth page if userId is missing
      return;
    }

    // Fetch user data from the backend
    this.http
      .get<IUser>(`http://localhost:3000/users/getUser`, {
        params: { userId: userId },
      })
      .subscribe(
        (response: IUser) => {
          this.user = response;
          this.initializeForms(); // Initialize forms with fetched user data
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.logout(); // Redirect to auth page if fetching user fails
        }
      );
  }

  // Initialize forms with user data
  private initializeForms(): void {
    if (!this.user) return;

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [{ value: this.user.role, disabled: true }, Validators.required], // Role is typically not editable
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Update profile information
  updateProfile(): void {
    if (this.profileForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const updatedData = { ...this.profileForm.getRawValue() }; // Get form values, including disabled fields

    // Simulate a backend update call
    this.http
      .put(`http://localhost:3000/users/updateProfile`, updatedData)
      .subscribe(
        () => {
          alert('Profile updated successfully!');
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile.');
        }
      );
  }

  // Change password
  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      alert('Please fill out the password fields correctly.');
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Simulate a backend password change call
    this.http
      .post(`http://localhost:3000/users/changePassword`, {
        currentPassword,
        newPassword,
      })
      .subscribe(
        () => {
          alert('Password changed successfully!');
          this.changePasswordForm.reset();
        },
        (error) => {
          console.error('Error changing password:', error);
          alert('Failed to change password.');
        }
      );
  }

  // Logout the user and redirect to the login page
  logout(): void {
    localStorage.removeItem('userId');
    alert('Logged out successfully!');
    this.router.navigate(['/auth']);
  }

  // Navigate to the edit profile page
  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }
}
