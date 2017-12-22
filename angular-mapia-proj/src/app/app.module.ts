import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameBoxComponent } from './game-box/game-box.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { ScoreBoxComponent } from './score-box/score-box.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    GameBoxComponent,
    InputBoxComponent,
    ScoreBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
