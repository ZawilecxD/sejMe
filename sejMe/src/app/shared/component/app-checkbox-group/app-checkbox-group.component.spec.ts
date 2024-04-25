import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCheckboxGroupComponent } from './app-checkbox-group.component';

describe('AppCheckboxGroupComponent', () => {
  let component: AppCheckboxGroupComponent;
  let fixture: ComponentFixture<AppCheckboxGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCheckboxGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
