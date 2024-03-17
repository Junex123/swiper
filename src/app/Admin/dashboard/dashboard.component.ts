import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedTab: string = 'tab1'; // Initialize active tab

  constructor() {}

  // Method to switch tabs
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
