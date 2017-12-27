import { Component, OnInit, Output,EventEmitter, Input, ElementRef,Renderer } from '@angular/core';
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
  
  words = WORDS;  //word List
  len = this.words.length;
  fallWords = FALLING_WORDS;  //Falling Word List

  subForAdd: Subscription;
  subForFall: Subscription;
  timerForAdd;
  timerForFall;
  
  //user Input word
  wordFromUser="";  
  getInput(event: String) {
    this.wordFromUser = event.toString();
    console.log(this.wordFromUser);
  }

  constructor(private elementRef: ElementRef, public renderer: Renderer) { }

  
  //5초마다 떨어지는 단어 추가 
  addWordInint(){
    var i;
    this.timerForAdd = Observable.timer(0,5000);
    this.subForAdd = this.timerForAdd.subscribe(t=> { 
      i = Math.floor(Math.random() * 1000) % this.len; 
      
      console.log("add : " + this.words[i].name); 
      
      let tmp  = this.words[i];
      tmp.y = Math.floor(Math.random() * 80);
      tmp.x = Math.floor(Math.random() * 800 + 100);
      this.fallWords.push(tmp);
         
      console.log(this.fallWords);
    });
  }

  //0.5초마다 밑으로 떨어지는 단어
  dropInit(){
    this.timerForFall = Observable.timer(0,300);
    this.subForFall = this.timerForFall.subscribe(t=> {

      this.fallWords.forEach(fallingWord => { 
        if(fallingWord.life == 1){
          //success
          if(fallingWord.name == this.wordFromUser){
            console.log("success : " + fallingWord.name);
            
            //delete from fallWord Array
            let idx = this.fallWords.indexOf(fallingWord, 0);
            this.fallWords.splice(idx, 1);
            console.log(this.fallWords);
            
            this.score.success++;
            this.wordFromUser = "";
          }
        
          else {
            //drop
            let selectedWord = this.elementRef.nativeElement.querySelector("." + fallingWord.name);
            fallingWord.y += 10;
            this.renderer.setElementStyle(selectedWord, 'top', fallingWord.y + "px");
            this.renderer.setElementStyle(selectedWord, 'left', fallingWord.x + "px");
    
            //alert
            if(fallingWord.y >= 400){
              this.renderer.setElementStyle(selectedWord, 'color', 'red');
              this.renderer.setElementStyle(selectedWord, 'background', 'lightgrey');
            }
            
            //fail
            if(fallingWord.y >= 610){
              console.log("fail : " + fallingWord.name);
              
              //delete from fallWord Array
              this.renderer.setElementStyle(selectedWord, 'visibility', 'hidden');
              let idx = this.fallWords.indexOf(fallingWord, 0);
              this.fallWords.splice(idx, 1);
              console.log(this.fallWords);

              this.score.fail++;
              //game over
              if(this.score.fail == 8){ return; }
            }
          }
        }

      });
 
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
