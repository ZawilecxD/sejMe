import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermSelectPageComponent } from './term-select-page.component';

describe('TermSelectPageComponent', () => {
  let component: TermSelectPageComponent;
  let fixture: ComponentFixture<TermSelectPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermSelectPageComponent]
    });
    fixture = TestBed.createComponent(TermSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
