import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string = 'http://aluracar.herokuapp.com/';


  public carros;

  constructor(public navCtrl: NavController, private _http: Http) 
  {
    this._http
      .get('https://aluracar.herokuapp.com')
      .map(res => res.json())
      .toPromise()
      .then(carros => { this.carros = carros 
        console.log(this.carros)});

  }

}
