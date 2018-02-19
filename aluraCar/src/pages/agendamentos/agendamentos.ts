import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'

})
export class AgendamentosPage
{

  public agendamentos = [];

  constructor(public storage: Storage, public http: Http, public alertCtrl : AlertController) 
  {

    this.storage.forEach(dado =>
    {
      let agendamento: any = new Object({ carro: { nome: null, preco: null } });

      agendamento.carro.nome = dado.carro.nome
      agendamento.carro.preco = dado.carro.preco
      agendamento.email = dado.email
      agendamento.endereco = dado.endereco
      agendamento.carro = dado.carro
      agendamento.precoTotal = dado.precoTotal
      agendamento.data = dado.data
      agendamento.agendado = dado.agendado

      this.agendamentos.push(agendamento);

      console.log(this.agendamentos);
    });
  }

  public reenvia(agendamento: any)
  {
    let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
    return this.http
      .get(api)
      .toPromise()
      .then(() =>
      {

        let key = agendamento.email + agendamento.data.substr(0, 10);
        this.storage.set(key, {
          nome: agendamento.nome,
          email: agendamento.email,
          endereco: agendamento.endereco,
          carro: agendamento.carro,
          precoTotal: agendamento.precoTotal,
          data: agendamento.data,
          agendado: true
        })

        this.alertCtrl.create({
          title: 'Envio',
          subTitle: 'Agendamento reenviado com sucesso',
          buttons: [{ text: 'Ok' }]
        }).present()


      }).catch(() =>
      {

        let key = agendamento.email + agendamento.data.substr(0, 10);
        this.storage.set(key, {
          nome: agendamento.nome,
          email: agendamento.email,
          endereco: agendamento.endereco,
          carro: agendamento.carro,
          precoTotal: agendamento.precoTotal,
          data: agendamento.data,
          agendado: false
        })
        
        this.alertCtrl.create({
          title: 'Envio',
          subTitle: 'Não foi possível reenviar o agendamento. Tente outra vez',
          buttons: [{ text: 'Ok'}]
        }).present();

      })
  }

}

