import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineEditComponent } from './online-edit.component';

describe('OnlineEditComponent', () => {
  let component: OnlineEditComponent;
  let fixture: ComponentFixture<OnlineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
