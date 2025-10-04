import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';
import { WeatherService } from './services/weather.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('500ms 200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('pulse', [
      transition('* => *', [
        animate('1000ms', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.05)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit{
  title = 'Weather';
  myWeather: any;
  temp: number = 0;
  highTemp: number = 0;
  lowTemp: number = 0;
  city: string = '';
  windSpeed: string = "0";
  cityName: string = "";
  humidity: number = 0;
  isLoading: boolean = false;
  hasData: boolean = false;

  showers: string = "0";
  cloudy: string = "0";
  sunny: string = "1";

  icon: string = '../assets/icon2/sunny.svg';
  checkIcon: string = 'Sunny';
  weatherService = inject(WeatherService);

  searchWeather() {
    if (!this.city.trim()) {
      return;
    }
    
    this.isLoading = true;
    this.weatherService.getWeatherData(this.city).subscribe({
      next: (data) => {
        this.myWeather = data;
        console.log(this.myWeather);
  
        this.temp = this.myWeather.main.temp;
        this.temp = Math.round((this.temp));
  
        this.highTemp = this.myWeather.main.temp_max;
        this.highTemp = Math.round((this.highTemp));
  
        this.lowTemp = this.myWeather.main.temp_min;
        this.lowTemp = Math.round((this.lowTemp));
  
        this.cityName = this.myWeather.name;
        this.checkIcon = this.myWeather.weather[0].main;
        console.log(this.checkIcon);
  
        if (this.checkIcon == 'Clouds') {
          this.icon = '../assets/icon2/cloudy.svg';
        }
  
        if (this.checkIcon == 'Haze') {
          this.icon = '../assets/icon2/cloudy.svg'
        }
  
        if (this.checkIcon == 'Rain') {
          this.icon = '../assets/icon/Showers.svg';
        }
  
        if (this.checkIcon == 'Thunder') {
          this.icon = '../assets/icon2/thunder.svg';
        }

        if(this.checkIcon == 'Snow'){
          this.icon = '../assets/icon2/snow.svg';
        }
  
        if(this.checkIcon == 'Clear'){
          this.icon = '../assets/icon2/sunny.svg';
        }
        
        this.windSpeed = this.myWeather.wind.speed;
        this.humidity = this.myWeather.main.humidity;
        this.isLoading = false;
        this.hasData = true;
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please check the city name and try again.');
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    // No initial data load
  }
}
