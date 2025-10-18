import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { PatientService } from '../../core/services/patient.service';
import { debounceTime } from 'rxjs';
import { Page } from '../../core/models/Page.model';
import { Patient } from '../../core/models/patient.model';
import { ConfirmDialog } from '../../shared/UI/confirm-dialog/confirm-dialog';
import { PatientDialog } from '../patients/UI/patient-dialog/patient-dialog';

@Component({
  selector: 'app-patient',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './patients.html',
  styleUrl: './patients.scss',
})
export class Patients {
  private svc = inject(PatientService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  q = new FormControl<string>('');
  data: Patient[] = [];
  cols = ['name', 'socialId', 'birthDate', 'phone', 'actions'];

  total = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit() {
    this.q.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.pageIndex = 0;
      this.reload();
    });
    this.reload();
  }

  reload() {
    this.svc
      .list({
        q: this.q.value ?? '',
        page: this.pageIndex,
        size: this.pageSize,
        sort: 'lastName,asc',
      })
      .subscribe((p: Page<Patient>) => {
        this.data = p.content;
        this.total = p.totalElements;
        this.pageSize = p.size;
        this.pageIndex = p.number;
      });
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.reload();
  }

  openCreate() {
    const ref = this.dialog.open(PatientDialog, { width: '520px', data: { mode: 'create' } });
    ref
      .afterClosed()
      .subscribe(
        (ok) => ok && (this.snack.open('Patient created', 'OK', { duration: 1500 }), this.reload())
      );
  }

  openEdit(d: Patient) {
    const ref = this.dialog.open(PatientDialog, {
      width: '520px',
      data: { mode: 'edit', patient: d },
    });
    ref
      .afterClosed()
      .subscribe(
        (ok) => ok && (this.snack.open('Patient updated', 'OK', { duration: 1500 }), this.reload())
      );
  }

  confirmDelete(d: Patient) {
    const ref = this.dialog.open(ConfirmDialog, {
      data: { title: 'Delete patient', message: `Delete ${d.firstName} ${d.lastName} ?` },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok)
        this.svc.delete(d.id!).subscribe(() => {
          this.snack.open('Patient deleted', 'OK', { duration: 1500 });
          this.reload();
        });
    });
  }
}
