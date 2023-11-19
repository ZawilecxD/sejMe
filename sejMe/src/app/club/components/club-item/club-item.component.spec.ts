import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubItemComponent } from './club-item.component';

describe('ClubItemComponent', () => {
  let component: ClubItemComponent;
  let fixture: ComponentFixture<ClubItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubItemComponent]
    });
    fixture = TestBed.createComponent(ClubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
