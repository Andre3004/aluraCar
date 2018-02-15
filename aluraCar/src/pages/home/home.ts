import { EscolhaPage } from './../escolha/escolha';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit
{

  url: string = 'http://aluracar.herokuapp.com/';

  carros: any[] = []

  constructor(public navCtrl: NavController, private _http: Http, private _loading: LoadingController, private _alert: AlertController) { }

  ngOnInit(): void
  {
    let loader = this._loading.create({
      content: 'Buscando novos carros. Aguarde...'
    })


    loader.present();
    this._http.get(this.url).map(res => res.json()).toPromise().then(carros =>
    {
      this.carros = carros
      loader.dismiss();
    }).catch(error =>
    {
      loader.dismiss();
      this._alert.create({
        title: 'Falha na conexão',
        buttons: [{ text: 'Estou ciente!' }],
        subTitle: 'Não foi possível obter a informação do servidor. Tente novamente!'
      }).present();
    });
  }

  public seleciona(carro)
  {
    this.navCtrl.push(EscolhaPage, {carroSelecionado: carro});
  }

}
