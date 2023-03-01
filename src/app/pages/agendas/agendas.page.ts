import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.page.html',
  styleUrls: ['./agendas.page.scss'],
})
export class AgendasPage implements OnInit {

  constructor(private http : HttpClient) { }

  lista_agenda: any = [];

  atualizar_lista(){
    this.http.get('http://192.168.11.125:5000/agenda_motorista')
      .subscribe(data =>{
        console.log(data)
        this.lista_agenda=data
      })
  }
    
  ngOnInit() {
    this.http.get('http://192.168.11.125:5000/agenda_motorista')
      .subscribe(data =>{
        console.log(data)
        this.lista_agenda=data
      })
  }

}
