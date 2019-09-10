import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab3ActionComponent } from './tab3-action.component';

describe('Tab3ActionComponent', () => {
  let component: Tab3ActionComponent;
  let fixture: ComponentFixture<Tab3ActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab3ActionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab3ActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
