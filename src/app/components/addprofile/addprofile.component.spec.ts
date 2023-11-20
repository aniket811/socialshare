import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprofileComponent } from './addprofile.component';

describe('AddprofileComponent', () => {
  let component: AddprofileComponent;
  let fixture: ComponentFixture<AddprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddprofileComponent]
    });
    fixture = TestBed.createComponent(AddprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
