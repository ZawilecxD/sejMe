import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermRoutePageComponent } from './term-route-page.component';

describe('TermRoutePageComponent', () => {
  let component: TermRoutePageComponent;
  let fixture: ComponentFixture<TermRoutePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermRoutePageComponent]
    });
    fixture = TestBed.createComponent(TermRoutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
