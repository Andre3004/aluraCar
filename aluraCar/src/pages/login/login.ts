import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Usuario } from './usuario';
import {Storage} from '@ionic/storage';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage
{

	public email: string = 'joao@alura.com.br';

	public senha: string = 'alura123';



	constructor(public storage : Storage, public navCtrl: NavController, public navParams: NavParams, private _http: Http, private _alertCtrl: AlertController) 
	{
	}

	efetuaLogin()
	{

		let api = `https://aluracar.herokuapp.com/login?email=${this.email}&senha=${this.senha}`;

		return this._http
			.get(api)
			.map(res => res.json().usuario)
			.toPromise()
			.then(dado =>
			{
				let usuario: Usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
				this.storage.set('usuarioLogado', usuario)
				this.navCtrl.setRoot(HomePage);
				return usuario;
			}).catch(err =>{
				this._alertCtrl.create({
					title: 'Problema no login',
					subTitle: 'Email ou senha inválidos. Verifique',
					buttons: [{ text: 'Ok'}]
				 }).present();
			});
	}
}
