import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucheSchlagwoerterComponent } from './suche-schlagwoerter.component';

describe('SucheSchlagwoerterComponent', () => {
  let component: SucheSchlagwoerterComponent;
  let fixture: ComponentFixture<SucheSchlagwoerterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucheSchlagwoerterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucheSchlagwoerterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
