import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  imports: [],
  templateUrl: './add-course.component.html',
  standalone: true,
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  courseName = '';
  courseDescription = '';

  constructor(private router: Router) {}

  saveCourse() {
    if (this.courseName && this.courseDescription) {
      alert(`Course saved: ${this.courseName}`);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please fill in all fields.');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']).then(r => console.log(r));
  }
}
