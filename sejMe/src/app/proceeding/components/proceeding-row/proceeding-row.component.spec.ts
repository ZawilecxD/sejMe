import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingRowComponent } from './proceeding-row.component';

describe('ProceedingRowComponent', () => {
  let component: ProceedingRowComponent;
  let fixture: ComponentFixture<ProceedingRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProceedingRowComponent]
    });
    fixture = TestBed.createComponent(ProceedingRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
