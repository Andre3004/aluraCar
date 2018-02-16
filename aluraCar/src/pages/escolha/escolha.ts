import { CadastroPage } from './../cadastro/cadastro';
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

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
     */
    public acessorios

    /**
     * 
     */
    public precoTotal: number = 0;

    /**
     * 
     * @param _navParams 
     */
    constructor( private _navParams : NavParams, public navCtrl: NavController)
    {
        this.carro = this._navParams.get('carroSelecionado');
        this.precoTotal = this.carro.preco
        console.log(this._navParams.get('carroSelecionado'))
        this.acessorios = [
            { nome: 'Freio ABS', preco: 800 },
            { nome: 'Ar-condicionado', preco: 1000 },
            { nome: 'MP3 Player', preco: 500 }
        ];
    }

    somaPreco(ligado, preco)
    {
        this.precoTotal = ligado ? this.precoTotal + preco : this.precoTotal - preco;
    }

    public proximo()
    {
        this.navCtrl.push(CadastroPage, {carro: this.carro, precoTotal: this.precoTotal});
    }
}