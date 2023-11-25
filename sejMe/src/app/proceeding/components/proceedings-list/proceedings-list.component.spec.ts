import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingsListComponent } from './proceedings-list.component';

describe('ProceedingsListComponent', () => {
  let component: ProceedingsListComponent;
  let fixture: ComponentFixture<ProceedingsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProceedingsListComponent]
    });
    fixture = TestBed.createComponent(ProceedingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
