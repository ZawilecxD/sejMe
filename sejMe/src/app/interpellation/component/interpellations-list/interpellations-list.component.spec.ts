import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpellationsListComponent } from './interpellations-list.component';

describe('InterpellationsListComponent', () => {
  let component: InterpellationsListComponent;
  let fixture: ComponentFixture<InterpellationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterpellationsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterpellationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
