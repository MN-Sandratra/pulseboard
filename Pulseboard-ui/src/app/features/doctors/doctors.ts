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
import { Doctor } from '../../core/models/doctor.model';
import { Page } from '../../core/models/Page.model';
import { debounceTime } from 'rxjs';
import { DoctorService } from '../../core/services/doctor.service';
import { DoctorDialog } from './UI/doctor-dialog/doctor-dialog';
import { ConfirmDialog } from '../../shared/UI/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-doctors',
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
  templateUrl: './doctors.html',
  styleUrl: './doctors.scss',
})
export class Doctors {
  private svc = inject(DoctorService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  q = new FormControl<string>('');
  data: Doctor[] = [];
  cols = ['name', 'speciality', 'email', 'actions'];

  // pagination
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
      .subscribe((p: Page<Doctor>) => {
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
    const ref = this.dialog.open(DoctorDialog, { width: '520px', data: { mode: 'create' } });
    ref
      .afterClosed()
      .subscribe(
        (ok) => ok && (this.snack.open('Doctor created', 'OK', { duration: 1500 }), this.reload())
      );
  }

  openEdit(d: Doctor) {
    const ref = this.dialog.open(DoctorDialog, {
      width: '520px',
      data: { mode: 'edit', doctor: d },
    });
    ref
      .afterClosed()
      .subscribe(
        (ok) => ok && (this.snack.open('Doctor updated', 'OK', { duration: 1500 }), this.reload())
      );
  }

  confirmDelete(d: Doctor) {
    const ref = this.dialog.open(ConfirmDialog, {
      data: { title: 'Delete doctor', message: `Delete ${d.firstName} ${d.lastName} ?` },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok)
        this.svc.delete(d.id!).subscribe(() => {
          this.snack.open('Doctor deleted', 'OK', { duration: 1500 });
          this.reload();
        });
    });
  }
}
