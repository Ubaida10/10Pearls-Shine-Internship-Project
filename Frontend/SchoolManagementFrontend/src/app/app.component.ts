import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './Footer/footer.component';
import {NavbarComponent} from './Header/navbar.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
  ]
})
export class AppComponent {
  title = 'SchoolManagementFrontend';
  appName: string = 'Marketplace';
  appEnv: string = 'production';
  appVersion: string = '17d9c64fe32f2ef2ec80afa8f0ea66c46c74a3fa';
  pageType: string = 'item';
  pageLocation: string = window.location.href;
  pageTitle: string = document.title;
  pageReferrer: string = document.referrer;
  gaParam: string = '';
  eventAttributes: any = null;
  userAttributes: { userId: string; marketUserId: string } = {
    userId: '',
    marketUserId: '',
  };

  // Static method to normalize attribute values
  static normalizeAttributeValue(value: any): string | undefined {
    if (value === undefined || value === null) return undefined;

    if (Array.isArray(value)) {
      return value
        .map(AppComponent.normalizeAttributeValue) // Corrected reference
        .filter(Boolean)
        .join(', ');
    }

    const normalizedValue = value
      .toString()
      .toLowerCase()
      .trim()
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ');

    return normalizedValue === '' ? undefined : normalizedValue;
  }

  // Static method to push data to the dataLayer
  static pushToDataLayer(): void {
    const dataLayer: any[] = (window as any).dataLayer || [];
    const appComponent = new AppComponent(); // Instantiate AppComponent to access non-static properties

    dataLayer.push({
      appName: AppComponent.normalizeAttributeValue(appComponent.appName),
      appEnv: AppComponent.normalizeAttributeValue(appComponent.appEnv),
      appVersion: AppComponent.normalizeAttributeValue(appComponent.appVersion),
      pageType: AppComponent.normalizeAttributeValue(appComponent.pageType),
      gaParam: AppComponent.normalizeAttributeValue(appComponent.gaParam),
    });

    dataLayer.push({
      event: 'analytics_ready',
      eventAttributes: {
        eventType: 'user',
        customTimestamp: Date.now(),
      },
    });
  }
}

// Ensure the method is executed when the document loads
document.addEventListener('DOMContentLoaded', () => {
  AppComponent.pushToDataLayer();
});
