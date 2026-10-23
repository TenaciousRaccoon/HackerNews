import { Component, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { ListItemComponent } from './components/list-item/list-item';
import { HackerNewsService } from './services/hackernews.service';
import { PaginationComponent } from './components/pagination/pagination';

@Component({
  imports: [NavbarComponent, ListItemComponent, PaginationComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected hackerNewsService = inject(HackerNewsService);
}
