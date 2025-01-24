import { Component, OnInit } from '@angular/core';
import Course from '../../CourseInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  imports: [HttpClientModule, FormsModule], // Ensure HttpClientModule is imported in your module
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'], // Ensure you use the correct file name here
  standalone: true
})
export class EditCourseComponent implements OnInit {
  course: { _id: string; courseName: string; description: string } = {
    _id: '',
    courseName: '',
    description: ''
  };

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

  updateCourse(): void {
    this.http.patch(`http://localhost:3000/course/${this.course._id}`, this.course).subscribe(
      () => {
        this.router.navigate(['courses-list']).then(r => console.log(r)); // Redirect to the courses list after updating the course
      },
      (error) => {
        console.error('Error updating course:', error); // Handle errors
      }
    );
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

  cancelEdit(): void {
    this.router.navigate(['courses-list']).then(() => {
      console.log('Edit canceled. Redirected to courses list.');
    });
  }
}
