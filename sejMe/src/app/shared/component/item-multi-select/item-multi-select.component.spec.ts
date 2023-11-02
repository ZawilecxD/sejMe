import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMultiSelectComponent } from './item-multi-select.component';

describe('ItemMultiSelectComponent', () => {
  let component: ItemMultiSelectComponent;
  let fixture: ComponentFixture<ItemMultiSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemMultiSelectComponent]
    });
    fixture = TestBed.createComponent(ItemMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
