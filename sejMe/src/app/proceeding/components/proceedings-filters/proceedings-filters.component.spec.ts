import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingsFiltersComponent } from './proceedings-filters.component';

describe('ProceedingsFiltersComponent', () => {
  let component: ProceedingsFiltersComponent;
  let fixture: ComponentFixture<ProceedingsFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProceedingsFiltersComponent]
    });
    fixture = TestBed.createComponent(ProceedingsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
