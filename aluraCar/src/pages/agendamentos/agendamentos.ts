import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';



@Component({
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage
{

  public agendamentos = [];

  constructor(public storage: Storage) 
  {
    
    this.storage.forEach(dado =>
      {
        let agendamento: any = new Object( { carro: { nome: null, preco: null} });
  
        agendamento.carro.nome = dado.carro.nome
        agendamento.carro.preco = dado.carro.preco
        agendamento.email = dado.email
        agendamento.endereco = dado.endereco
        agendamento.carro = dado.carro
        agendamento.precoTotal = dado.precoTotal
        agendamento.data = dado.data
        agendamento.agendado = dado.agendado
        
        console.log(agendamento)
        this.agendamentos.push(agendamento);
      });
  }

}