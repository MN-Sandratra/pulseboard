import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavItem } from '../nav-item/nav-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    NavItem,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  @ViewChild('snav') snav!: MatSidenav;

  navItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/' },
    { icon: 'medical_services', label: 'Doctors', route: '/doctors' },
    { icon: 'group', label: 'Patients', route: '/patients' },
    { icon: 'calendar_today', label: 'Calendar', route: '/calendar' },
    { icon: 'pie_chart', label: 'Reports', route: '/reports' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];

  private bp = inject(BreakpointObserver);
  isMobile = signal(false);
  collapsed = signal(false);

  constructor() {
    this.bp.observe([Breakpoints.Handset, Breakpoints.Small]).subscribe((res) => {
      const matches = Object.values(res.breakpoints).some(Boolean);
      this.isMobile.set(matches);
      if (!matches && this.snav) this.snav.open();
    });
  }

  toggleCollapse() {
    this.collapsed.update((v) => !v);
  }
}
