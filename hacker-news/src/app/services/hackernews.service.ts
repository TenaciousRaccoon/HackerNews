import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Story } from '../models/story.model';

@Injectable({ providedIn: 'root' })
export class HackerNewsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://hacker-news.firebaseio.com/v0/';

  readonly allIds = signal<number[]>([]);
  readonly stories = signal<Story[]>([]);
  readonly loading = signal<boolean>(false);

  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(20);

  readonly totalItems = computed(() => this.allIds().length);
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    return total > 0 ? Math.ceil(total / size) : 1;
  });

  loadStoryIds(filter: string) {
    const endpointMap: Record<string, string> = {
      Top: 'topstories.json',
      New: 'newstories.json',
      Best: 'beststories.json',
    };
    const endpoint = endpointMap[filter] || 'topstories.json';

    this.loading.set(true);
    this.http.get<number[]>(`${this.apiUrl}/${endpoint}`).subscribe({
      next: ids => {
        this.allIds.set(ids);
        this.currentPage.set(1);
        this.loadCurrentPageStories();
      },
      error: err => {
        console.error(`Failed to fetch ${filter} story IDs`, err);
        this.loading.set(false);
      },
    });
  }

  loadCurrentPageStories() {
    const ids = this.allIds();
    const page = this.currentPage();
    const size = this.pageSize();

    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const pageIds = ids.slice(startIndex, endIndex);

    if (pageIds.length === 0) {
      this.stories.set([]);
      return;
    }

    this.loading.set(true);
    this.stories.set([]);

    const requests = pageIds.map(id => this.getStoryById(id).pipe(catchError(() => of(null))));

    forkJoin(requests).subscribe({
      next: fetchedStories => {
        const validStories = fetchedStories.filter((s): s is Story => s !== null);
        this.stories.set(validStories);
        this.loading.set(false);
      },
      error: err => {
        console.error('Failed to load page stories', err);
        this.loading.set(false);
      },
    });
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadCurrentPageStories();
    }
  }

  setPageSize(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadCurrentPageStories();
  }

  private getStoryById(id: number): Observable<Story> {
    return (
      this?.http.get<Story>(`${this.apiUrl}item/${id}.json`) ||
      this.http.get<Story>(`${this.apiUrl}item/${id}.json`)
    );
  }
}
