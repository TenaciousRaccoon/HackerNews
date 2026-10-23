import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown';

@Component({
  selector: 'hacker-news-navbar',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  appName = 'HackerNews';
}
