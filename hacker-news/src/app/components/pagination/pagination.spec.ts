import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalItems', 100);
    fixture.detectChanges();
  });

  it('should create and render successfully', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should disable the "Prev" button on the first page', () => {
    const prevButton = fixture.nativeElement.querySelector(
      '[data-testid="prev-button"]'
    ) as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it('should render correct page buttons based on total items and page size', () => {
    const pageButton = fixture.nativeElement.querySelector('[data-testid="page-button-3"]');
    expect(pageButton).toBeTruthy();
    expect(pageButton.textContent.trim()).toBe('3');
  });

  it('should emit pageChange with incremented value when "Next" is clicked', () => {
    let emittedPage: number | undefined;
    component.pageChange.subscribe(page => {
      emittedPage = page;
    });

    const nextButton = fixture.nativeElement.querySelector(
      '[data-testid="next-button"]'
    ) as HTMLButtonElement;
    nextButton.click();

    expect(emittedPage).toBe(2);
  });
});
