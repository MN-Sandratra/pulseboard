import { Routes } from '@angular/router';
import { Doctors } from './features/doctors/doctors';

export const routes: Routes = [
  { path: '', component: Doctors, title: 'Doctors' },
  { path: 'doctors', component: Doctors, title: 'Doctors' },
];
