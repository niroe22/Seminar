import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuchergebnisComponent } from './suchergebnis.component';

describe('SuchergebnisComponent', () => {
  let component: SuchergebnisComponent;
  let fixture: ComponentFixture<SuchergebnisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuchergebnisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuchergebnisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
