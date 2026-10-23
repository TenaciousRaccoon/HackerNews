import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown';
import { HackerNewsService } from '../../services/hackernews.service';
import { By } from '@angular/platform-browser';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let hackerNewsServiceMock: { loadStoryIds: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    hackerNewsServiceMock = {
      loadStoryIds: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
      providers: [{ provide: HackerNewsService, useValue: hackerNewsServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create, render successfully, and call loadStoryIds on init', () => {
    expect(component).toBeTruthy();
    expect(component.selectedFilter).toBe('Top');
    expect(hackerNewsServiceMock.loadStoryIds).toHaveBeenCalledWith('Top');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should update selected filter, close dropdown, and load stories when an option is clicked', () => {
    const toggleButton = fixture.debugElement.query(By.css('button[type="button"]'));

    toggleButton.nativeElement.click();
    fixture.detectChanges();

    const optionButtons = fixture.debugElement.queryAll(By.css('.absolute button'));
    expect(optionButtons.length).toBe(3);

    optionButtons[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedFilter).toBe('New');
    expect(component.isDropdownOpen).toBeFalsy();
    expect(hackerNewsServiceMock.loadStoryIds).toHaveBeenCalledWith('New');
  });
});
