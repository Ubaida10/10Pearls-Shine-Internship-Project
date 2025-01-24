import { Routes } from '@angular/router';
import {LoginComponent} from './AuthenticationAndAuthorization/login/login.component';
import {DashboardComponent} from './Dashboard/dashboard.component';
import {ProfileComponent} from './Profile_/profile/profile.component';
import {AddCourseComponent} from './Courses/add-course/add-course.component';
import {CourseDetailsComponent} from './Courses/course-details/course-details/course-details.component';
import {LandingPageComponent} from './LandingPage/landing-page.component';
import {SignUpComponent} from './AuthenticationAndAuthorization/SignUp/sign-up/sign-up.component';
import {CoursesListComponent} from './Courses/courses-list/courses-list.component';
import {NoCoursesComponent} from './Courses/no-courses/no-courses.component';
import {EditCourseComponent} from './Courses/edit-course/edit-course.component';

const routeConfig: Routes = [
  {path: '', component: LandingPageComponent, title: 'Home'},
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'signup', component: SignUpComponent, title: 'Sign Up'},
  {path:'Dashboard', component: DashboardComponent, title: 'Dashboard'},
  {path:'profile', component: ProfileComponent, title: 'Profile'},
  {path:'add-course', component: AddCourseComponent, title: 'Add Course'},
  {path: 'course-details/:id', component: CourseDetailsComponent, title: 'Course Details'},
  {path: 'courses-list', component: CoursesListComponent, title: 'Courses List'},
  {path: 'no-courses', component: NoCoursesComponent, title: 'No Courses Found'},
  {path: 'edit-course/:id', component: EditCourseComponent, title: 'Edit'}
  // {path: '**', component: NotFoundComponent}
];


export default routeConfig;
