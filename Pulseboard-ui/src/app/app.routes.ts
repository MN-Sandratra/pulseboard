import { Routes } from '@angular/router';
import { Doctors } from './features/doctors/doctors';
import { Patients } from './features/patients/patients';

export const routes: Routes = [
  { path: '', component: Doctors, title: 'Doctors' },
  { path: 'doctors', component: Doctors, title: 'Doctors' },
  { path: 'patients', component: Patients, title: 'Patients' },
];
