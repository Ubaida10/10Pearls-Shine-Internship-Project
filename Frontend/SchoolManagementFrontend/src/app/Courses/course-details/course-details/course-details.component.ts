import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Course from '../../../CourseInterface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  imports: [CommonModule, RouterModule, HttpClientModule],
  standalone: true,
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const courseId = params.get('id');
      if (courseId) {
        this.findCourseById(courseId);
      } else {
        console.error('Course ID is missing in the route!');
      }
    });
  }

  findCourseById(courseId: String): void {
    this.http.get<Course>(`http://localhost:3000/course/${courseId}`).subscribe(
      (response: Course) => {
        this.course = response; // Update the course property with the fetched data
      },
      (error) => {
        console.error('Error fetching course:', error); // Handle errors
      }
    );
  }

  enrollInCourse(): void {
    if (!this.course?._id) {
      console.error('Invalid courseId. Cannot enroll.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in. Cannot enroll.');
      return;
    }

    const enrollData = { courseId: this.course._id, userId };
    this.http.post('http://localhost:3000/users/enroll', enrollData).subscribe(
      (response) => {
        console.log('Enrollment successful:', response);
        this.router.navigate(['Dashboard']).then((r) => console.log(r));
      },
      (error) => {
        console.error('Error enrolling in course:', error);
      }
    );
  }
}
