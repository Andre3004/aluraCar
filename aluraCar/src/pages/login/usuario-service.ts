import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Usuario } from './usuario';

@Injectable()
export class UsuarioService {

    private _usuarioLogado: Usuario; // nova propriedade, que guarda o usuário logado.

    public email: string = 'joao@alura.com.br';

    public senha: string = 'alura123';
    

    constructor(private _http: Http) {}

    public efetuaLogin(email: string, senha: string) {
        let api = `https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`;

        return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(dado => {
                let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
                this._usuarioLogado = usuario;
                return usuario;
            });
    }
}