import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import { initFlowbite } from 'flowbite';
//import assets from 'assets'

@Component({
  selector: 'app-LandingPage',
  imports: [
    NgOptimizedImage
  ], //
  templateUrl: './landing-page.component.html',
  standalone: true,
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private router: Router) {
    this.initFAQ();  // Ensure this is called when the page loads
    initFlowbite();
  }
  goToSignUp() {
    this.router.navigate(['signup']).then(r => console.log(r));
  }

  protected initFAQ() {
    // Select all the FAQ headers that will toggle the content visibility.
    const faqButtons = document.querySelectorAll('.faq-header');

    faqButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleFAQ(button as HTMLElement);
      });
    });
  }

  protected toggleFAQ(element: HTMLElement) {
    const content = element.nextElementSibling; // This finds the next sibling, which is the content div
    const icon = element.querySelector('svg'); // The arrow icon

    if (content && icon) {
      content.classList.toggle('hidden'); // Toggle the visibility of the content
      icon.classList.toggle('rotate-180'); // Rotate the arrow when content is shown
    }
  }



  submitNewsletter(email: string) {
    // Implement newsletter subscription logic
    console.log('Newsletter subscription for:', email);
  }
}
