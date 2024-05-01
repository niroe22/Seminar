import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucheRatingComponent } from './suche-rating.component';

describe('SucheRatingComponent', () => {
  let component: SucheRatingComponent;
  let fixture: ComponentFixture<SucheRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucheRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucheRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
