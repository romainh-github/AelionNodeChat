import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ChatDisplayComponent } from './components/chat-display/chat-display.component';
import { MaterialModule } from './modules/material/material.module';
import { ChatLoginComponent } from './components/chat-login/chat-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientFormComponent,
    ChatDisplayComponent,
    ChatLoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
