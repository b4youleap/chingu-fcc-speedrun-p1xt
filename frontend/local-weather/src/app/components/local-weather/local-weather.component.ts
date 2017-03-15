import { Component, OnInit } from '@angular/core';
import { GetWeatherService } from '../../services/get-weather.service'
import { GeolocationService } from '../../services/geolocation.service';
@Component({
  selector: 'app-local-weather',
  templateUrl: './local-weather.component.html',
  styleUrls: ['./local-weather.component.scss']
})
export class LocalWeatherComponent implements OnInit {
  city: '';
  temp_f; temp_c; temp; temp_text = 'F';
  description: '';
  wind_speed: '';
  icon = '01d';

  constructor(private getWeatherService: GetWeatherService,
              private geolocationService: GeolocationService) { }

  ngOnInit() {
    this.geolocationService.getLocation({})
      .subscribe(
        (p) => this.getWeatherService.getWeather(p.coords)
                   .subscribe((w) => this.getW(w))
        
        , (p) => console.log(p));
  }
  getW(w) {
    console.log(w);
    this.city = w.name;
    this.temp_f = +w.main.temp;
    this.temp = this.temp_f;
    this.temp_c = Math.round((this.temp_f-32) * (5/9));
    this.description = w.weather[0].description;
    this.wind_speed = w.wind.speed;
    this.icon = w.weather[0].icon;
  } 

  toggleTemp() {
    if(this.temp_text === 'F') {
      this.temp = this.temp_c;
      this.temp_text = 'C';
    } else {
      this.temp = this.temp_f;
      this.temp_text = 'F';
    }
  }
}
