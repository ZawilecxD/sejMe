import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpellationFiltersComponent } from './interpellation-filters.component';

describe('InterpellationFiltersComponent', () => {
  let component: InterpellationFiltersComponent;
  let fixture: ComponentFixture<InterpellationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterpellationFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterpellationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
