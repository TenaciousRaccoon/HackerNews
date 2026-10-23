import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item';

import type { Story } from '../../models/story.model';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  const defaultMockStory: Story = {
    id: 8863,
    by: 'dhouston',
    descendants: '71',
    score: 111,
    time: 1175714200,
    kids: [
      8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865,
      8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870,
      8980, 8934, 8876,
    ],
    title: 'My YC app: Dropbox - Throw away your USB drive',
    type: 'story',
    url: 'http://www.getdropbox.com/u/2/screencast.html',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('story', defaultMockStory);
    fixture.detectChanges();
  });

  it('should accurately display story details using test IDs', () => {
    const titleEl = fixture.nativeElement.querySelector('[data-testid="story-title"]');
    const authorEl = fixture.nativeElement.querySelector('[data-testid="story-author"]');
    const linkEl = fixture.nativeElement.querySelector('[data-testid="story-link"]');

    expect(titleEl.textContent.trim()).toBe(defaultMockStory.title);
    expect(authorEl.textContent.trim()).toBe(defaultMockStory.by);
    expect(linkEl.getAttribute('href')).toBe(defaultMockStory.url);
  });
});
