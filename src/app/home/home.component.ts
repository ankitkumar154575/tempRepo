// home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  openSearchWindow() {
    // Open a new window with the URL for the search page
    window.open('/search', '_blank', 'width=600,height=700');
  }
}
