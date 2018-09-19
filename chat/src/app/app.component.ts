import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Websocket chat';

  /**
   * Instance of WebSocketSubject
   */
  private _socket: WebSocketSubject<any>;

  /**
   * @var :store messages
   */
  public serverMessages: String[];

  constructor () {
    console.log('Connection to client WebSocket');
    this._socket = new WebSocketSubject('ws://127.0.0.1:8999');
    // test connection to outside
    this._send();
    // subscribe to server events
    this._socket.subscribe((message) => {
      console.log('Server sent :' + message);
      this.serverMessages.push(message);
      },
      (err) => console.error(err),
      () => console.warn('Completed !')
    );
  }

  private _send(): void {
    console.log('Send new message to server');
    this._socket.next('New client connected');
  }
}
