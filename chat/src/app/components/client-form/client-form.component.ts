import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatFormField} from '@angular/material';
import { WebSocketSubject } from 'rxjs/webSocket';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  /**
   * Instance of WebSocketSubject
   */
  private _socket: WebSocketSubject<any>;



  constructor() {
    console.log('Connection to client WebSocket');
    this._socket = new WebSocketSubject('ws://127.0.0.1:8999');
    // init of array of messages

    this._socket.subscribe((message) => {
      console.log('Server sent :' + message);
      },
      (err) => console.error(err),
      () => console.warn('Completed !')
    );
  }

  ngOnInit() {

  }

  public sendMessage(message: any): any {
    console.log(message);
    this._socket.next(message);
    var inputEmpty = document.getElementById('chatForm');
    inputEmpty.innerHTML = '';
  }

}
