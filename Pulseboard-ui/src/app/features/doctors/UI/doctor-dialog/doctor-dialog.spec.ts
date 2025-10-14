import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDialog } from './doctor-dialog';

describe('DoctorDialog', () => {
  let component: DoctorDialog;
  let fixture: ComponentFixture<DoctorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
