import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GefundeneBuecherComponent } from './gefundene-buecher.component';

describe('GefundeneBuecherComponent', () => {
  let component: GefundeneBuecherComponent;
  let fixture: ComponentFixture<GefundeneBuecherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GefundeneBuecherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GefundeneBuecherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
