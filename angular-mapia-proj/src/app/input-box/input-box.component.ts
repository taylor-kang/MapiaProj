import { Component, OnInit, Input } from '@angular/core';
import { Word } from '../word'
declare var $:any

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})

export class InputBoxComponent implements OnInit {
  	word="";
  	
  	logText(value: string): void {
  		this.word = "";
    	this.word += `${value}`;
    	console.log(this.word);
  	}
  	constructor() { }

  	ngOnInit() { }
}
