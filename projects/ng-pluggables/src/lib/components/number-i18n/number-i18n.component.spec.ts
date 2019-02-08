import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberI18nComponent } from './number-i18n.component';

describe('NumberI18nComponent', () => {
  let component: NumberI18nComponent;
  let fixture: ComponentFixture<NumberI18nComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberI18nComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberI18nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
