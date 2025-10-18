import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../../../core/services/patient.service';
import { Patient } from '../../../../core/models/patient.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

type Data = { mode: 'create' | 'edit'; patient?: Patient };

@Component({
  selector: 'app-patient-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './patient-dialog.html',
  styleUrl: './patient-dialog.scss',
})
export class PatientDialog implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(PatientService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    socialId: [''],
    email: ['', [Validators.email]],
    phone: [''],
    birthDate: [''],
    address: [''],
  });

  constructor(
    public ref: MatDialogRef<PatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  ngOnInit() {
    if (this.data?.patient) {
      this.form.patchValue(this.data.patient);

      if (this.data.patient.birthDate) {
        this.form.get('birthDate')?.setValue(this.data.patient.birthDate.substring(0, 10));
      }
    }
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const value = this.form.getRawValue() as Patient;

    if (this.data.mode === 'create') {
      this.svc.create(value).subscribe(() => this.ref.close(true));
    } else {
      this.svc
        .update(this.data.patient!.id!, { ...this.data.patient, ...value })
        .subscribe(() => this.ref.close(true));
    }
  }

  close() {
    this.ref.close(false);
  }
}
