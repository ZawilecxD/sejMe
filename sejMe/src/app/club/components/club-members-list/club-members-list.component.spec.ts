import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubMembersListComponent } from './club-members-list.component';

describe('ClubMembersListComponent', () => {
  let component: ClubMembersListComponent;
  let fixture: ComponentFixture<ClubMembersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubMembersListComponent]
    });
    fixture = TestBed.createComponent(ClubMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
