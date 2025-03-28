import {Component, OnInit} from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DatePipe, NgClass, NgForOf, TitleCasePipe} from '@angular/common';
import Course from '../../CourseInterface';

@Component({
  selector: 'app-courses-list',
  imports: [CommonModule, RouterModule, HttpClientModule, NgClass, TitleCasePipe, DatePipe, NgForOf],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  userRole: string | null = null; // Logged-in user's role
  constructor(private router: Router, private http:HttpClient){}

  ngOnInit(){
    this.userRole = localStorage.getItem('role');
    this.http.get<Course[]>('http://localhost:3000/course').subscribe((response: any) => {
      this.courses = response;
    });
  }

  showDetails(id: String) {
    // Update the id property with the selected course's ID before navigating to the course details page.'
    // Note: Replace '_id' with the actual course ID property in your Course interface.
    // Example: this._id = response._id;
    //this._id = id;
    this.router.navigate([`course-details/${id}`]).then(r => console.log(r));
  }

  editCourse(id: String){
    this.router.navigate([`edit-course/${id}`]).then(r => console.log(r));
  }
}
