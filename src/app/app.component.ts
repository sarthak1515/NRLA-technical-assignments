import { Component, OnInit } from '@angular/core';
import { ClockComponent } from '../shared/components/clock/clock.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClockComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isDarkModeEnabled = false;

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkModeEnabled = true;
      document.documentElement.classList.add('dark');
    }
  }
  toggleDarkMode(isDark: boolean) {
    this.isDarkModeEnabled = isDark;
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}
