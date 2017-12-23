import { Component } from '@angular/core';

@Component ({
	selector: 'word',
	template: `
		<div *ngIf="isShow">
			<span>{{ word.name }} </span>
		</div>
	`,
	styles: [`
		div {
			color: blue;
		}
	`]
})

export class Word {
    name: string;
    x: number;
    y: number;
    isShow: boolean;

    constructor(name, x, y, isShow){
    	this.name= name;
    	this.x = x;
    	this.y= y;
    	this.isShow = isShow;
    }
}
