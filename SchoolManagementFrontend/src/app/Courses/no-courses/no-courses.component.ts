import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-courses',
  imports: [],
  templateUrl: './no-courses.component.html',
  styleUrl: './no-courses.component.css'
})
export class NoCoursesComponent {
  constructor(private router: Router) {}

  exploreCourses() {
    this.router.navigate(['/courses-list']).then(r => console.log(r)); // Navigate to the courses list page
  }
}
