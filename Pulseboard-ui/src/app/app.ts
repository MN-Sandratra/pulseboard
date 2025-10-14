import { Component, signal } from '@angular/core';
import { Shell } from './layouts/shell/shell';

@Component({
  selector: 'app-root',
  imports: [Shell],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('patient-manager-ui');
}
