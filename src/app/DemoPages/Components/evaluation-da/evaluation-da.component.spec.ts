import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDAComponent } from './evaluation-da.component';

describe('EvaluationDAComponent', () => {
  let component: EvaluationDAComponent;
  let fixture: ComponentFixture<EvaluationDAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationDAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationDAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
