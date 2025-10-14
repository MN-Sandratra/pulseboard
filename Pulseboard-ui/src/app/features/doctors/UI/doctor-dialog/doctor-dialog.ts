import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Doctor } from '../../../../core/models/doctor.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../../../../core/services/doctor.service';

type Data = { mode: 'create' | 'edit'; doctor?: Doctor };

@Component({
  selector: 'app-doctor-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './doctor-dialog.html',
  styleUrl: './doctor-dialog.scss',
})
export class DoctorDialog implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(DoctorService);

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    speciality: [''],
    email: [''],
    phone: [''],
  });

  constructor(public ref: MatDialogRef<DoctorDialog>, @Inject(MAT_DIALOG_DATA) public data: Data) {}

  ngOnInit() {
    if (this.data?.doctor) {
      this.form.patchValue(this.data.doctor);
    }
  }

  submit() {
    const value = this.form.getRawValue() as Doctor;
    if (this.data.mode === 'create') {
      this.svc.create(value).subscribe(() => this.ref.close(true));
    } else {
      this.svc
        .update(this.data.doctor!.id!, { ...this.data.doctor, ...value })
        .subscribe(() => this.ref.close(true));
    }
  }
  close() {
    this.ref.close(false);
  }
}
