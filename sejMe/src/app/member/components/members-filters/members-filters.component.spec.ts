import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersFiltersComponent } from './members-filters.component';

describe('MembersFiltersComponent', () => {
  let component: MembersFiltersComponent;
  let fixture: ComponentFixture<MembersFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersFiltersComponent]
    });
    fixture = TestBed.createComponent(MembersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
