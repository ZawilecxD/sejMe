import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeListPageComponent } from './committee-list-page.component';

describe('CommitteeListPageComponent', () => {
  let component: CommitteeListPageComponent;
  let fixture: ComponentFixture<CommitteeListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommitteeListPageComponent]
    });
    fixture = TestBed.createComponent(CommitteeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
