import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HackerNewsService } from '../../services/hackernews.service';

import type { Story } from '../../models/story.model';

@Component({
  selector: 'hackernews-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.html',
})
export class DropdownComponent implements OnInit {
  exactMatch = { exact: true };
  searchQuery = '';

  isDropdownOpen = false;
  selectedFilter = 'Top';
  filterOptions = ['Top', 'New', 'Best'];

  topStoriesIds: Array<number> = [];
  topStories: Array<Story> = [];

  protected hackerNewsService = inject(HackerNewsService);

  ngOnInit(): void {
    this.hackerNewsService.loadStoryIds(this.selectedFilter);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectFilter(option: string) {
    this.selectedFilter = option;
    this.isDropdownOpen = false;
    this.hackerNewsService.loadStoryIds(option);
  }
}
