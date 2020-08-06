import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingRegistrationBoxedComponent } from './waiting-registration-boxed.component';

describe('WaitingRegistrationBoxedComponent', () => {
  let component: WaitingRegistrationBoxedComponent;
  let fixture: ComponentFixture<WaitingRegistrationBoxedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingRegistrationBoxedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingRegistrationBoxedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
