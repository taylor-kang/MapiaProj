import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Word }  from '../word';
import { WORDS } from '../mock-words';
import { FALLING_WORDS } from '../falling-words';
import { Observable, Subscription } from 'rxjs/Rx';
import { Score } from '../score';

declare var $:any

@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.css'],
  template: `
    <div *ngFor="let word of fallWords" class="word {{word.name}}">
      <span>{{ word.name }} </span>
    </div>
    <app-input-box (inputWord)="getInput($event)"></app-input-box>
    <app-score-box [score] = "score"></app-score-box>
  `
})

export class GameBoxComponent implements OnInit {
  
  score = new Score();
  
  wordFromUser="";

  getInput(event: String) {
    this.wordFromUser = event.toString();
    console.log(this.wordFromUser);
  }

  words = WORDS;
  fallWords = FALLING_WORDS;

  subForAdd: Subscription;
  subForFall: Subscription;
  
  timerForAdd;
  timerForFall;

  constructor() { }


  len = this.words.length;

  addWordInint(){
    var i = 0;
    this.timerForAdd = Observable.timer(0,5000);
    this.subForAdd = this.timerForAdd.subscribe(t=> { 
      console.log("add");
      if(i < this.len){
        this.fallWords.push(this.words[i]);
        this.fallWords[i].y = Math.floor(Math.random() * 80);
        this.fallWords[i].x = Math.floor(Math.random() * 1000);
        i++;

      }
    });
  }

  dropInit(){

    this.timerForFall = Observable.timer(0,500);
    this.subForFall = this.timerForFall.subscribe(t=> {
     
      for(var i in this.fallWords){

        if(this.fallWords[i].name == this.wordFromUser){
          this.score.success++;
          $("." + this.fallWords[i].name).css("visibility", "hidden");
        }
        
        this.fallWords[i].y += 10;

        $("." + this.fallWords[i].name).css("top", this.fallWords[i].y + "px");
        $("." + this.fallWords[i].name).css("left", this.fallWords[i].x + "px");
        if(this.fallWords[i].y >= 400){
          $("." + this.fallWords[i].name).css("color", "red");
          $("." + this.fallWords[i].name).css("background", "lightgrey");
        }
        if(this.fallWords[i].y >= 610){
          if(this.fallWords[i].y >= 610 && this.fallWords[i].y <= 620){
            this.score.fail++;
          }
          $("." + this.fallWords[i].name).css("visibility", "hidden");

        }
      }
    });
  }

  ngOnInit() {
    this.addWordInint();
    this.dropInit();  
  }
  ngOnDestroy() {
    this.subForAdd.unsubscribe();
    this.subForFall.unsubscribe();
  }

  

}
