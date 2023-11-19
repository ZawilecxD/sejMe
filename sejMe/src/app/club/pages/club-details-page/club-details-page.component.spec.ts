import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailsPageComponent } from './club-details-page.component';

describe('ClubDetailsPageComponent', () => {
  let component: ClubDetailsPageComponent;
  let fixture: ComponentFixture<ClubDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailsPageComponent]
    });
    fixture = TestBed.createComponent(ClubDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
