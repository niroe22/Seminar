import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucheArtComponent } from './suche-art.component';

describe('SucheArtComponent', () => {
  let component: SucheArtComponent;
  let fixture: ComponentFixture<SucheArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucheArtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucheArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
