import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeFiltersComponent } from './committee-filters.component';

describe('CommitteeFiltersComponent', () => {
  let component: CommitteeFiltersComponent;
  let fixture: ComponentFixture<CommitteeFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommitteeFiltersComponent]
    });
    fixture = TestBed.createComponent(CommitteeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
