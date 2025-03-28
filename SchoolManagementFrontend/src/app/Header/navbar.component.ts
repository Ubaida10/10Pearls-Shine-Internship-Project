import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true, // If not standalone, remove this and declare in AppModule
  imports: [FormsModule, CommonModule] // Add FormsModule for ngModel
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('menuToggle') menuToggleButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef<HTMLDivElement>;

  isSearchBarVisible = false; // Controls search bar visibility
  searchQuery = ''; // Stores the search input

  constructor() {}

  ngAfterViewInit(): void {
    this.menuToggleButton.nativeElement.addEventListener('click', () => {
      this.toggleMenu();
    });
  }

  toggleMenu(): void {
    this.mobileMenu.nativeElement.classList.toggle('hidden');
  }

  toggleSearchBar(): void {
    this.isSearchBarVisible = !this.isSearchBarVisible;
    // Optionally, hide the mobile menu when showing the search bar on mobile
    if (this.isSearchBarVisible && !this.mobileMenu.nativeElement.classList.contains('hidden')) {
      this.toggleMenu();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Add your search logic here (e.g., navigate to a search results page, call an API, etc.)
      // Example: this.router.navigate(['/search-results'], { queryParams: { q: this.searchQuery } });
    }
    // Optionally, clear the search bar and hide it after submission
    this.searchQuery = '';
    this.isSearchBarVisible = false;
  }
}