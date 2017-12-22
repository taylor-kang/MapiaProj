import { Component, OnInit } from '@angular/core';
import { Word }  from '../word';
import { WORDS } from '../mock-words';
import { FALLING_WORDS } from '../falling-words';
import { Observable, Subscription } from 'rxjs/Rx'
declare var $:any

@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.css']
})

export class GameBoxComponent implements OnInit {
  
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

    this.timerForFall = Observable.timer(0,1000);

    
    this.subForFall = this.timerForFall.subscribe(t=> {
     

      for(var i in this.fallWords){
        this.fallWords[i].y += 10;
        $("." + this.fallWords[i].name).css("top", this.fallWords[i].y + "px");
        $("." + this.fallWords[i].name).css("left", this.fallWords[i].x + "px");
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
