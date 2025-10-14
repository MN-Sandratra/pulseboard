import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [RouterModule, RouterLink, MatIconModule, MatTooltipModule, MatListModule],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.scss',
})
export class NavItem {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() route!: string;
  @Input() tooltip?: string;
  @Input() collapsed = false;

  router = inject(Router);
}
