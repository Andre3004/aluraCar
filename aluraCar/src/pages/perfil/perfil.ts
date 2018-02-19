import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../login/usuario-service';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage 
{

  public usuario: any;

  constructor(public storage : Storage, public navCtrl: NavController, public navParams: NavParams, public usuarioService : UsuarioService) 
  {
    this.storage.get("usuarioLogado").then( (usuario) => { this.usuario = usuario })
  }

}
