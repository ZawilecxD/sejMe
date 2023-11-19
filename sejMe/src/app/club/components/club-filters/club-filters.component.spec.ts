import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFiltersComponent } from './club-filters.component';

describe('ClubFiltersComponent', () => {
  let component: ClubFiltersComponent;
  let fixture: ComponentFixture<ClubFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubFiltersComponent]
    });
    fixture = TestBed.createComponent(ClubFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
