import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatFormField} from '@angular/material';
import {ChatService} from './../../shared/services/chat.service';

@Component({
  selector: 'app-chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.scss']
})
export class ChatLoginComponent implements OnInit {

  public id: string;
  public logged: boolean;

  constructor(private chatService: ChatService) {
    this.id = '';
    this.logged = false;
    this.chatService.sendId(this.id);
  }

  ngOnInit() {
  }

  public login(id: string): any {
    this.id = id;
    console.log(id);
    this.chatService.sendId(id);
  }

}
