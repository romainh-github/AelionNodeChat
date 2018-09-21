import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import {ChatService} from './../../shared/services/chat.service';
import { Subscription } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import * as moment from 'moment';
import {MatIconModule} from '@angular/material';




@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.scss']
})
export class ChatDisplayComponent implements OnInit {

 /**
   * Instance of WebSocketSubject
   */
  private _socket: WebSocketSubject<any>;

  /**
   * @var :store messages
   */
  public serverMessages: any[];
  // variables used for sorting display
  public sortedMessages: any[];
  public order: String = 'date';
  public reverse: Boolean = true;
  // subscribe to user id
  private clientId: Subscription;
  public _id: any;


  constructor (private orderPipe: OrderPipe, private chatService: ChatService) {
    console.log('Connection to client WebSocket');
    this._socket = new WebSocketSubject('ws://127.0.0.1:8999');
    // init of array of messages
    this.serverMessages = [];
    this._id = '';
    // this.sortedMessages = orderPipe.transform(this.serverMessages, 'message.message');
    // this.serverMessages.reverse();
    // test connection to outside
     this._send();
    // subscribe to server events
    this._socket.subscribe((message) => {
      this.serverMessages.push(message);
      // reverse array display to get latest message on top
      this.sortedMessages = orderPipe.transform(this.serverMessages, 'date');
      },
      (err) => console.error(err),
      () => console.warn('Completed !')
    );

    // subscribe id
    this.clientId = this.chatService.getId().subscribe((id) => {
      console.log('user chosen id is : ' + id);
      this._id = id;
    });
  }

  private _send(): void {
    console.log('Send new message to server');
    const envelop: any = {};
    envelop.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    envelop.id = 'Bot';
    envelop.message = 'User connected';
    this.serverMessages.push(envelop);
    // this.serverMessages.reverse();
    this._socket.next(envelop);
  }

  ngOnInit() {
  }


}
