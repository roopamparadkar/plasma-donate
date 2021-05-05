import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-request-plasma-component',
  templateUrl: './request-plasma-component.component.html',
  styleUrls: ['./request-plasma-component.component.css']
})
export class RequestPlasmaComponentComponent implements OnInit {
  
  city:string
  plasmaToShow = [];
  noResult = false;
  isloading = false;
  constructor(private sharedDataService:SharedDataService, private http: HttpClient) { }
  
  ngOnInit(): void {
    this.sharedDataService.sharedMessage.subscribe(message => this.city = message)
    this.findPlasma();
  }
  
  findPlasma(){
  this.isloading =true;
   let cityName = this.city.toLowerCase();
    this.http.get(`https://plasmadonate-95f6c-default-rtdb.firebaseio.com/plasma.json?orderBy="city"&equalTo="${cityName}"`)
    .subscribe(result => {
      this.plasmaToShow = [];
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
            this.plasmaToShow.push(result[key])
        }
    }
    this.plasmaToShow.map(plasma => {
      plasma.createdOn = moment(new Date(plasma.createdOn)).fromNow();
      if(!plasma.revealPhone){
        plasma.phone = '0913xxxxxx'
      }
    })
    this.isloading = false;
    if(this.plasmaToShow.length == 0)
    {
      this.noResult = true;
    }
    })
    
  }

  getAllPlasma(){
    this.http.get(`https://plasmadonate-95f6c-default-rtdb.firebaseio.com/plasma.json?`)
    .subscribe(result => {
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
            this.plasmaToShow.push(result[key])
        }
    }
    })
  }
}
