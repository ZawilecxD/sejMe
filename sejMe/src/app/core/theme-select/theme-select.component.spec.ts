import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSelectComponent } from './theme-select.component';

describe('ThemePickerComponent', () => {
  let component: ThemeSelectComponent;
  let fixture: ComponentFixture<ThemeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeSelectComponent],
    });
    fixture = TestBed.createComponent(ThemeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
