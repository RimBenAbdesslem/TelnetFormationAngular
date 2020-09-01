import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixActiviteComponent } from './choix-activite.component';

describe('ChoixActiviteComponent', () => {
  let component: ChoixActiviteComponent;
  let fixture: ComponentFixture<ChoixActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
