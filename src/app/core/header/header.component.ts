import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  heading: string;
  @Output()
  toggleSidebar = new EventEmitter<void>();
  @Output()
  openSearch = new EventEmitter<void>();
  @Output()
  toggleFullscreen = new EventEmitter<void>();

  constructor(private router: Router) {

  }

  signOut() {
    localStorage.removeItem('sha_token');
    this.router.navigate(['/authentication/signin']);
  }
}
