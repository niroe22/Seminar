import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucheTitelComponent } from './suche-titel.component';

describe('SucheTitelComponent', () => {
  let component: SucheTitelComponent;
  let fixture: ComponentFixture<SucheTitelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucheTitelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucheTitelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
