import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import Course from '../CourseInterface';



@Component({
  selector: 'app-Dashboard',
  imports: [
    NgForOf,
    //NgOptimizedImage,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  courses: Course[] = []; // All courses fetched from the backend
  userCourses: Course[] = []; // Filtered courses for the logged-in user
  userId: string | null = null; // Logged-in user's ID

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Retrieve userId from localStorage
    this.userId = localStorage.getItem('userId');

    // Fetch all courses
    this.fetchCourses();
  }

  fetchCourses() {
    this.http.get<Course[]>('http://localhost:3000/course').subscribe(
      (response: Course[]) => {
        this.courses = response;

        if(this.courses===null) {
          this.router.navigate(['no-courses']).then(r => console.log(r));
        }
        else{
          // Filter courses based on userId
          this.filterUserCourses();
        }

      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  filterUserCourses() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No user logged in. Cannot filter courses.');
      return;
    }

    this.http.get<{ courses: Course[] }>(`http://localhost:3000/users/getCourses?userId=${userId}`).subscribe(
      (response) => {
        this.userCourses = response.courses;
      },
      (error) => {
        console.error('Error fetching user courses:', error);
      }
    )
  }

  viewCourse(courseId: string) {
    this.router.navigate(['course-details', courseId]).then(r => console.log(r));
  }

  enrollInNewCourse() {
    this.router.navigate(['courses-list']).then(r => console.log(r));
  }
}
