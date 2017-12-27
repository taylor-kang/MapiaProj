import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Word }  from '../word';
import { WORDS } from '../mock-words';
import { FALLING_WORDS } from '../falling-words';
import { Observable, Subscription } from 'rxjs/Rx';
import { Score } from '../score';

declare var $:any

@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.scss'],
})

export class GameBoxComponent implements OnInit {
  
  score = new Score();  //user Score
  wordFromUser="";  //user Input word

  getInput(event: String) {
    this.wordFromUser = event.toString();
    console.log(this.wordFromUser);
  }

  words = WORDS;  //word List
  fallWords = FALLING_WORDS;  //Falling Word List

  subForAdd: Subscription;
  subForFall: Subscription;
  timerForAdd;
  timerForFall;

  constructor() { }

  len = this.words.length;
  
  //5초마다 떨어지는 단어 추가 
  addWordInint(){
    var i;
    this.timerForAdd = Observable.timer(0,5000);
    
    this.subForAdd = this.timerForAdd.subscribe(t=> { 
      console.log("add");  
      
      i = Math.floor(Math.random() * 1000) % this.len; 
      this.fallWords.push(this.words[i]);
      this.fallWords[this.fallWords.length -1].y = Math.floor(Math.random() * 80);
      this.fallWords[this.fallWords.length -1].x = Math.floor(Math.random() * 800 + 100);
    });
  }

  //0.5초마다 밑으로 떨어지는 단어
  dropInit(){

    this.timerForFall = Observable.timer(0,300);
    this.subForFall = this.timerForFall.subscribe(t=> {
     
      for(var i in this.fallWords){

        //success
        if(this.fallWords[i].name == this.wordFromUser
          && $("." + this.fallWords[i].name).css("visibility") != "hidden"){
          this.score.success++;
          this.fallWords[i].x = 0;
          this.fallWords[i].y = 0;
          this.wordFromUser = "";
          $("." + this.fallWords[i].name).css("visibility", "hidden");
        }

        
        if($("." + this.fallWords[i].name).css("visibility") != "hidden"){
          //drop the word
          this.fallWords[i].y += 10;
          $("." + this.fallWords[i].name).css("top", this.fallWords[i].y + "px");
          $("." + this.fallWords[i].name).css("left", this.fallWords[i].x + "px");
         
          //alert
          if(this.fallWords[i].y >= 400){
            $("." + this.fallWords[i].name).css("color", "red");
            $("." + this.fallWords[i].name).css("background", "lightgrey");
          }
        }
        //fail
        if(this.fallWords[i].y >= 610){
          if(this.fallWords[i].y >= 610 
            && this.fallWords[i].y <= 620
            && $("." + this.fallWords[i].name).css("visibility") != "hidden"){
            this.score.fail++;
            this.fallWords[i].x = 0;
            this.fallWords[i].y = 0;
            //game over
            if(this.score.fail == 8){
               return;
            }

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
