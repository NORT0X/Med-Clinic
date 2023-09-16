import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorExtraComponent } from './doctor-extra.component';

describe('DoctorExtraComponent', () => {
  let component: DoctorExtraComponent;
  let fixture: ComponentFixture<DoctorExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorExtraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
