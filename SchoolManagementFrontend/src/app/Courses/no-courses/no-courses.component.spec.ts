import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCoursesComponent } from './no-courses.component';

describe('NoCoursesComponent', () => {
  let component: NoCoursesComponent;
  let fixture: ComponentFixture<NoCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
