import { Component, OnInit } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Course from '../CourseInterface';

@Component({
  selector: 'app-Dashboard',
  imports: [
    NgForOf,
    HttpClientModule,
    NgClass,
    TitleCasePipe,
    DatePipe,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  courses: Course[] = []; // All courses fetched from the backend
  userCourses: Course[] = []; // Filtered courses for the logged-in user
  userId: string | null = null; // Logged-in user's ID
  userRole: string | null = null; // Logged-in user's role

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Retrieve user details from localStorage
    this.userId = localStorage.getItem('userId');
    this.userRole = localStorage.getItem('role'); // User Role (e.g., 'admin' or 'user')

    // Fetch all courses from the backend
    this.fetchCourses();
  }

  /**
   * Fetches all courses from the backend and filters them based on the user's enrollment.
   */
  fetchCourses() {
    this.http.get<Course[]>('http://localhost:3000/course').subscribe(
      (response: Course[]) => {
        this.courses = response;

        if (this.courses === null) {
          // Navigate to a "no courses" page if no courses are found
          this.router.navigate(['no-courses']).then(r => console.log(r));
        } else {
          // Filter courses for the logged-in user
          this.filterUserCourses();
        }
      },
      (error) => {
        console.error('Error fetching courses:', error); // Log errors if the request fails
      }
    );
  }

  /**
   * Filters the courses to include only those that the logged-in user is enrolled in.
   */
  filterUserCourses() {
    if (!this.userId) {
      console.error('No user logged in. Cannot filter courses.'); // Log error if userId is missing
      return;
    }

    // Fetch the courses specific to the logged-in user
    this.http.get<{ courses: Course[] }>(`http://localhost:3000/users/getCourses?userId=${this.userId}`).subscribe(
      (response) => {
        this.userCourses = response.courses; // Assign the filtered courses to `userCourses`
      },
      (error) => {
        console.error('Error fetching user courses:', error); // Log errors if the request fails
      }
    );
  }

  /**
   * Navigates to the course details page for the selected course.
   * @param courseId - The ID of the course to view.
   */
  viewCourse(courseId: string) {
    this.router.navigate(['course-details', courseId]).then(r => console.log(r)); // Navigate to course details
  }

  /**
   * Navigates to the course listing page where the user can enroll in new courses.
   */
  enrollInNewCourse() {
    this.router.navigate(['courses-list']).then(r => console.log(r)); // Navigate to courses list
  }

  /**
   * Navigates to the course creation page (Admin only).
   */
  createCourse() {
    this.router.navigate(['add-course']).then(r => console.log(r)); // Navigate to create course
  }

  /**
   * Navigates to the user creation page (Admin only).
   */
  createUser() {
    this.router.navigate(['create-user']).then(r => console.log(r)); // Navigate to create user
  }

  listCourses(){
    this.router.navigate(['courses-list']).then(r => console.log(r)); // Navigate to courses list
  }
}
