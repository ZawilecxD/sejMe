import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeRowComponent } from './committee-row.component';

describe('CommitteeRowComponent', () => {
  let component: CommitteeRowComponent;
  let fixture: ComponentFixture<CommitteeRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommitteeRowComponent]
    });
    fixture = TestBed.createComponent(CommitteeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
