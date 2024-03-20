import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  private apiKey = "30d66e8c5062b23751f3790cf3c4c8c6";
  // constructor(private http: HttpClient) { }

  // get() : Observable<any>{
  //   return this.httpClient.get<any>("https://api.openweathermap.org/data/2.5/weather?q=bokaro&appid=30d66e8c5062b23751f3790cf3c4c8c6");
  // }

  // getWeatherData(cityName:string) {
  //   const apiUrl=`${this.baseURL}${cityName}&appid=${this.apiKey}`;

  //   return this.http.get(apiUrl);
  //   }

  getWeatherData(cityName?: string) {
    return this.http.get(`${this.baseURL}${cityName}&appid=${this.apiKey}`);
  }
}