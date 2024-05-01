import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuchformularComponent } from './suchformular.component';

describe('SuchformularComponent', () => {
  let component: SuchformularComponent;
  let fixture: ComponentFixture<SuchformularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuchformularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuchformularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
