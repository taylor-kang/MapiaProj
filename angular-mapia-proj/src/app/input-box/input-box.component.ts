import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../word'
declare var $:any

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})

export class InputBoxComponent implements OnInit {
  	word="";
  	
    @Output() inputWord = new EventEmitter<string>();
  	
    onEnter(value: string) { 
      this.word = value;
      this.inputWord.emit(this.word);
    }
  
    constructor() { }

  	ngOnInit() { }
}
