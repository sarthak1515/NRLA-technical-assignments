import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

interface OpenWeatherResponse {
  main: {
    temp: number;
  };
  weather: { icon: string }[];
}

export interface WeatherResult {
  data: {
    temp: number;
    icon: string;
  } | null;
  error: boolean;
}

@Injectable({ providedIn: 'root' })
export class OpenWeatherService {
  private weather$!: Observable<WeatherResult>;

  constructor(private http: HttpClient) {}

  /**
   * Fetch weather for given coordinates with optional polling interval.
   * @param lat Latitude
   * @param lon Longitude
   * @param apiKey OpenWeather API key
   * @param pollingIntervalMs Polling interval in milliseconds (default 10 minutes)
   */
  getWeatherByCoords(
    lat: number,
    lon: number,
    apiKey: string,
    pollingIntervalMs: number = 10 * 60 * 1000
  ): Observable<WeatherResult> {
    if (!this.weather$) {
      this.weather$ = timer(0, pollingIntervalMs).pipe(
        switchMap(() =>
          this.http
            .get<OpenWeatherResponse>(
              `https://api.openweathermap.org/data/2.5/weather`,
              {
                params: {
                  lat: lat.toString(),
                  lon: lon.toString(),
                  units: 'metric',
                  appid: apiKey,
                },
              }
            )
            .pipe(
              map((data) => ({
                data: {
                  temp: Math.round(data.main.temp),
                  icon: data.weather?.[0]?.icon ?? '',
                },
                error: false,
              })),
              catchError((err) => {
                console.error('[WeatherService]', err);
                return of({ data: null, error: true });
              })
            )
        ),
        shareReplay(1)
      );
    }
    return this.weather$;
  }
}
