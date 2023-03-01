import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user : any = {};
  resposta : any = ''
  
  constructor(private http: HttpClient, private router: Router) {}

  login(){
    let usuario = this.user.usuario
    let senha = this.user.senha
    let usuarios = {
      'usuario': usuario,
      'senha': senha,
    }
    this.http.post('http://192.168.11.125:5000/usuario', usuarios)
      .subscribe(data =>{
        if (data === '404'){
          this.resposta='Usuário e/ou senha inválidos'
        } else {
          this.router.navigate(['/agendas']);
        }
      })
  }
}
