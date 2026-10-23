import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render core structural landmarks and layout elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const navbarEl = compiled.querySelector('[data-testid="navbar"]');
    const mainContainerEl = compiled.querySelector('[data-testid="main-container"]');
    const headingEl = compiled.querySelector('[data-testid="heading"]');
    const paginationEl = compiled.querySelector('[data-testid="pagination"]');
    const emptyStateEl = compiled.querySelector('[data-testid="empty-stories-message"]');

    expect(navbarEl).toBeTruthy();
    expect(mainContainerEl).toBeTruthy();
    expect(headingEl?.textContent?.trim()).toBe('Hacker News');
    expect(paginationEl).toBeTruthy();

    expect(emptyStateEl?.textContent?.trim()).toBe('No items available.');
  });
});
