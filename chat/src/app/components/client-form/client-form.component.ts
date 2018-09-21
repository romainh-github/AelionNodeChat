import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatFormField} from '@angular/material';
import { WebSocketSubject } from 'rxjs/webSocket';
import {ChatService} from './../../shared/services/chat.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';


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

  /**
   * Subscribing to a user id coming from chat Service
   */
  private clientId: Subscription;

  private envelop: any;
  public _id: any;

  public inputChat: string;



  constructor(private chatService: ChatService) {
    console.log('Connection to client WebSocket');
    this._socket = new WebSocketSubject('ws://127.0.0.1:8999');
    this.envelop = {};
    this.inputChat = '';
    this. _id = '';
    // init of array of messages

    this._socket.subscribe((message) => {
      console.log('Server sent :' + message);
      },
      (err) => console.error(err),
      () => console.warn('Completed !')
    );

    this.clientId = this.chatService.getId().subscribe((id) => {
      console.log('user chosen id is : ' + id);
      this._id = id;
    });
  }

  ngOnInit() {

  }

  public sendMessage(message: any): any {
    console.log('test getting hour : ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
    this.envelop.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.envelop.id = this._id;
    this.envelop.message = message;
    console.log('Pass enveloppe ? ' + JSON.stringify(this.envelop));
    console.log('Pass enveloppe sans stringify ? ' + this.envelop);
    // this._socket.next(JSON.stringify(this.envelop));
    this._socket.next(this.envelop);
    this.inputChat = '';
  }

}
