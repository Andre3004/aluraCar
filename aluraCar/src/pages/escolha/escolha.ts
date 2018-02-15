import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'escolha.html'
})
export class EscolhaPage 
{
    /**
     * 
     */
    public carro;

    /**
     * 
     * @param _navParams 
     */
    constructor( private _navParams : NavParams)
    {
        this.carro = this._navParams.get('carroSelecionado');
        console.log(this._navParams.get('carroSelecionado'))
    }

}