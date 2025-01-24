import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-course',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './add-course.component.html',
  standalone: true,
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form group
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Save the course details
  saveCourse() {
    if (this.courseForm.valid) {
      const { courseName, courseDescription } = this.courseForm.value;
      const courseData = {
        courseName: courseName,
        description: courseDescription,
        startDate: new Date('2024-02-01T00:00:00.000Z'), // Default start date
        endDate: new Date('2024-06-01T00:00:00.000Z'),   // Default end date
        teacher: '603d2d64fc13ae3b40a576a4',            // Replace with actual teacher ObjectId
        students: [
          '603d2d64fc13ae3b40a576a7', // Replace with actual student ObjectIds
          '603d2d64fc13ae3b40a576a8'
        ],
        assignments: [
          {
            title: 'Assignment 1: Basic HTML',
            description: 'Create a simple webpage using HTML with basic elements like headings, paragraphs, and links.',
            dueDate: new Date('2024-02-10T00:00:00.000Z'), // Default due date
            assignedTo: [
              '603d2d64fc13ae3b40a576a7', // Replace with actual student ObjectIds
              '603d2d64fc13ae3b40a576a8'
            ]
          }
        ],
        category: 'Web Development', // Default category
        status: 'active'             // Default status
      };
      this.http.post('http://localhost:3000/course', courseData).subscribe(
        (response: any) => {
          if (response.status === 200) {
            alert(`Course saved: ${courseName}`);
            this.router.navigate(['Dashboard']).then((r) => console.log(r));
          }
        }
      );
      this.router.navigate(['Dashboard']);
    } else {
      alert('Please fill in all fields.');
    }
  }

  // Cancel and navigate back to dashboard
  courseName: any;
  courseDescription: any;
  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
