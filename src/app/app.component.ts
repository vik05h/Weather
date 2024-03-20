import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';
import { WeatherService } from './services/weather.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Weather';
  myWeather: any;
  temp: number = 20;
  highTemp: number = 25;
  lowTemp: number = 18;
  city: string = '';
  windSpeed: string = "1.02";
  cityName: string = "";
  humidity: number = 30 ;

  showers: string = "0";
  cloudy: string = "0";
  sunny: string = "1";

  icon: string = '../assets/icon2/sunny.svg';
  checkIcon: string = 'Sunny';
  weatherService = inject(WeatherService);

  searchWeather() {
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
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Error Status-404');
      }
    });
  }

  ngOnInit(): void {
    this.weatherService.getWeatherData('New Delhi').subscribe(data => {
      this.myWeather=data;
      console.log(this.myWeather);

      this.temp=this.myWeather.main.temp;
      this.temp = Math.round((this.temp));

      this.highTemp=this.myWeather.main.temp_max;
      this.highTemp = Math.round((this.highTemp));

      this.lowTemp = this.myWeather.main.temp_min;
      this.lowTemp = Math.round((this.lowTemp));

      this.cityName = this.myWeather.name;
      this.checkIcon = this.myWeather.weather[0].main;
      console.log(this.checkIcon);

      if(this.checkIcon == 'Clouds'){
        this.icon = '../assets/icon2/cloudy.svg';
      }

      if(this.checkIcon == 'Haze'){
        this.icon = '../assets/icon2/cloudy.svg'
      }

      if(this.checkIcon == 'Rain'){
        this.icon = '../assets/icon/Showers.svg';
      }

      if(this.checkIcon == 'Thunder'){
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
      
    })
  }
}
