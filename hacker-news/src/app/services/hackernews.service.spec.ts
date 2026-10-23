import { TestBed } from '@angular/core/testing';
import { HackerNewsService } from './hackernews.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Story } from '../models/story.model';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'https://hacker-news.firebaseio.com/v0/';

  const createMockStory = (id: number): Story => ({
    id: 8863,
    by: `dhouston_${id}`,
    descendants: '71',
    score: 111 * id,
    time: 1175714200,
    kids: [
      8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865,
      8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870,
      8980, 8934, 8876,
    ],
    title: `My YC app: Dropbox - Throw away your USB drive ${id}`,
    type: 'story',
    url: 'http://www.getdropbox.com/u/2/screencast.html',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HackerNewsService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and have default pagination settings', () => {
    expect(service).toBeTruthy();
    expect(service.currentPage()).toBe(1);
    expect(service.pageSize()).toBe(20);
    expect(service.loading()).toBe(false);
  });

  it('should load story IDs and trigger fetching stories for the first page', () => {
    const mockStoryIds = [1, 2, 3];

    service.loadStoryIds('Top');
    expect(service.loading()).toBe(true);

    const idReq = httpMock.expectOne(`${mockApiUrl}/topstories.json`);
    expect(idReq.request.method).toBe('GET');
    idReq.flush(mockStoryIds);

    const req1 = httpMock.expectOne(`${mockApiUrl}item/1.json`);
    const req2 = httpMock.expectOne(`${mockApiUrl}item/2.json`);
    const req3 = httpMock.expectOne(`${mockApiUrl}item/3.json`);

    req1.flush(createMockStory(1));
    req2.flush(createMockStory(2));
    req3.flush(createMockStory(3));

    expect(service.allIds()).toEqual(mockStoryIds);
    expect(service.totalItems()).toBe(3);
    expect(service.loading()).toBe(false);
    expect(service.stories().length).toBe(3);
  });
});
