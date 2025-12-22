import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

export interface WeatherData {
  temp: number;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
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
  ): Observable<WeatherData | null> {
    return timer(0, pollingIntervalMs).pipe(
      switchMap(() =>
        this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: lat.toString(),
            lon: lon.toString(),
            units: 'metric',
            appid: apiKey,
          },
        })
      ),
      map((data) => ({
        temp: Math.round(data.main.temp),
        icon: data.weather?.[0]?.icon ?? '',
      })),
      catchError((err) => {
        console.error('[WeatherService]', err);
        return of(null);
      }),
      shareReplay(1)
    );
  }
}
