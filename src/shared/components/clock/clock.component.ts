import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData, WeatherService } from '../../../services/weather.service';
import { environment } from '../../../environments/environment';

type ClockSize = 'sm' | 'md';

@Component({
  selector: 'app-clock',
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent implements OnInit {
  @Input() size: ClockSize = 'md';
  @Input() className = '';

  weather$!: Observable<WeatherData | null>;
  dateText!: string;
  hourTicks = Array.from({ length: 12 }, (_, i) => i);
  minuteTicks = Array.from({ length: 60 }, (_, i) => i);

  hoursDeg = 0;
  minutesDeg = 0;
  secondsDeg = 0;
  defaultclockSize = 384;
  hourHandHeight = 80;
  minuteHandHeight = 100;
  secondHandHeight = 120;

  apiKey = environment.weatherApiKey;

  constructor(
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.setSizes();
    this.updateDate();
    this.fetchWeather();

    this.ngZone.runOutsideAngular(() => {
      const updateClockHands = () => {
        const now = new Date();
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;

        this.secondsDeg = seconds * 6;
        this.minutesDeg = minutes * 6;
        this.hoursDeg = hours * 30;

        this.cd.detectChanges();
        requestAnimationFrame(updateClockHands);
      };

      updateClockHands();
    });
  }

  private setSizes() {
    switch (this.size) {
      case 'sm':
        this.defaultclockSize = 256;
        this.hourHandHeight = 60;
        this.minuteHandHeight = 80;
        this.secondHandHeight = 100;
        break;
      case 'md':
        this.defaultclockSize = 384;
        this.hourHandHeight = 80;
        this.minuteHandHeight = 100;
        this.secondHandHeight = 120;
        break;
    }
  }

  fetchWeather() {
    if (!navigator.geolocation || !this.apiKey) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      this.weather$ = this.weatherService.getWeatherByCoords(
        latitude,
        longitude,
        this.apiKey
      );
    });
  }

  updateDate() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    this.dateText = now.toLocaleDateString('en-US', options).toUpperCase();
  }
}
