import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import {ChatService} from './../../shared/services/chat.service';
import { Subscription } from 'rxjs';
import sortBy from 'array-sort-by';
import { OrderPipe } from 'ngx-order-pipe';

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


  constructor (private orderPipe: OrderPipe) {
    console.log('Connection to client WebSocket');
    this._socket = new WebSocketSubject('ws://127.0.0.1:8999');
    // init of array of messages
    this.serverMessages = [];
    // this.sortedMessages = orderPipe.transform(this.serverMessages, 'message.message');
    // this.serverMessages.reverse();
    // test connection to outside
    // this._send();
    // subscribe to server events
    this._socket.subscribe((message) => {
      this.serverMessages.push(message);
      // reverse array display to get latest message on top
      this.sortedMessages = orderPipe.transform(this.serverMessages, 'date');
      },
      (err) => console.error(err),
      () => console.warn('Completed !')
    );
  }

  private _send(): void {
    console.log('Send new message to server');
    const envelop: any = {};
    envelop.id = 'Bot';
    envelop.message = 'Blabla connected';
    this.serverMessages.push(envelop);
    // this.serverMessages.reverse();
    this._socket.next(envelop);
  }

  ngOnInit() {
  }


}
