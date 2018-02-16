import { HomePage } from './../home/home';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import {Storage} from '@ionic/storage';


@Component({
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public nome;

  public email;

  public endereco;

  public carro;

  public precoTotal;  

  public data = new Date().toISOString();

  private _alerta: Alert;

  public confirmado = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public storage: Storage) 
  {
    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');

    this._alerta =  this.alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'OK',  handler: data => { this.navCtrl.setRoot(HomePage) } }]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Cadastro');
  }

  agenda()
  {
    if(!this.nome || !this.email || !this.endereco) {
      this.alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'OK'}]
      }).present();

      return ;
    }

    this.http
            .get(`https://aluracar.herokuapp.com/salvarpedido?carro=${this.carro.nome}&nome=${this.nome}&preco=${this.precoTotal}&endereco=${this.endereco}&email=${this.email}&dataAgendamento=${this.data}`)
            .toPromise()
            .then(() => {
              this._alerta.setSubTitle('Agendamento realizado com sucesso.');
              this._alerta.present();
              this.confirmado = true;
              this._alerta.present();
                let key = this.email + this.data.substr(0,10);
                return this.storage.set(key, {
                  nome: this.nome, 
                  email: this.email, 
                  endereco: this.endereco, 
                  carro : this.carro,
                  precoTotal: this.precoTotal,
                  data : this.data, 
                  agendado: true})

            }) 
            .catch(erro => {
              this._alerta.setSubTitle('Não foi possível realizar o agendamento!');
              this._alerta.present();
                let key = this.email + this.data.substr(0,10);
                return this.storage.set(key, {
                  nome: this.nome, 
                  email: this.email, 
                  endereco: this.endereco, 
                  carro : this.carro,
                  precoTotal: this.precoTotal,
                  data : this.data,
                  agendado: false })
            });
  }
}
