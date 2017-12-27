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
  
  constructor(private elementRef: ElementRef, public renderer: Renderer) { }

  len = this.words.length;

  //5초마다 떨어지는 단어 추가 
  addWordInint(){
    var i;
    this.timerForAdd = Observable.timer(0,5000);
    
    this.subForAdd = this.timerForAdd.subscribe(t=> { 
      i = Math.floor(Math.random() * 1000) % this.len; 
      
      this.fallWords.push(this.words[i]);
      console.log("add : " + this.words[i].name); 
      
      this.fallWords[this.fallWords.length-1].y = Math.floor(Math.random() * 80);
      this.fallWords[this.fallWords.length-1].x = Math.floor(Math.random() * 800 + 100);
       
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
            let selectedWord = this.elementRef.nativeElement.querySelector("." + fallingWord.name);          
            this.renderer.setElementStyle(selectedWord, 'visibility', 'hidden');
            
            //delete from fallWord Array
            //let tmp = new Word(fallingWord.name, fallingWord.x, fallingWord.y);
            let idx = this.fallWords.indexOf(fallingWord, 0);
            this.fallWords.splice(idx, 1);
            console.log(this.fallWords);
            // fallingWord.x = 0;
            // fallingWord.y = 0;
            // fallingWord.life = 0;
            // this.renderer.setElementStyle(selectedWord, 'top', fallingWord.y + "px");
            // this.renderer.setElementStyle(selectedWord, 'left', fallingWord.x + "px");

            this.score.success++;
            this.wordFromUser = "";
          }
        
          else {
            //drop
            let selectedWord = this.elementRef.nativeElement.querySelector("." + fallingWord.name);
            
            //drop the word
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
              
              //let tmp = new Word(fallingWord.name, fallingWord.x, fallingWord.y);
              let idx = this.fallWords.indexOf(fallingWord, 0);
              this.fallWords.splice(idx, 1);
              console.log(this.fallWords);

              this.score.fail++;
              // fallingWord.x = 0;
              // fallingWord.y = 0;
              //fallingWord.life = 0;
              //this.renderer.setElementStyle(selectedWord, 'top', fallingWord.y + "px");
              //this.renderer.setElementStyle(selectedWord, 'left', fallingWord.x + "px");

              //game over
              if(this.score.fail == 8){
                 return;
              }
              

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
