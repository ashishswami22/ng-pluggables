import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPluggablesComponent } from './ng-pluggables.component';

describe('NgPluggablesComponent', () => {
  let component: NgPluggablesComponent;
  let fixture: ComponentFixture<NgPluggablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPluggablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPluggablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
