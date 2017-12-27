export class Word {
    name: string;
    x: number;
    y: number;
    life: number;
    constructor(name, x, y){
    	this.name= name;
    	this.x = x;
    	this.y= y;
    	this.life = 1; //catch or fail => 0
    }
}
