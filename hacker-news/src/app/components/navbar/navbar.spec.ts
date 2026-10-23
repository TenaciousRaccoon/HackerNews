import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render navbar core items correctly using test IDs', () => {
    const logoEl = fixture.nativeElement.querySelector('[data-testid="navbar-logo"]');
    const titleEl = fixture.nativeElement.querySelector('[data-testid="navbar-title"]');
    const dropdownEl = fixture.nativeElement.querySelector('[data-testid="navbar-dropdown"]');

    expect(logoEl).toBeTruthy();
    expect(logoEl.textContent.trim()).toBe('HN');

    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent.trim()).toBe('Hacker News');

    expect(dropdownEl).toBeTruthy();
  });
});
