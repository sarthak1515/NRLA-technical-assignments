import { Component } from '@angular/core';
import { ClockComponent } from '../shared/components/clock/clock.component';

@Component({
  selector: 'app-root',
  imports: [ClockComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
