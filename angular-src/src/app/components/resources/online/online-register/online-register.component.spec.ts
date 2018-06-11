import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRegisterComponent } from './online-register.component';

describe('OnlineRegisterComponent', () => {
  let component: OnlineRegisterComponent;
  let fixture: ComponentFixture<OnlineRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
