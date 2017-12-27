import { Component, OnInit,Input } from '@angular/core';
import { Score } from '../score';

@Component({
  selector: 'app-score-box',
  templateUrl: './score-box.component.html',
  styleUrls: ['./score-box.component.scss']
})

export class ScoreBoxComponent implements OnInit {
  @Input() score: Score;

  constructor() { }

  ngOnInit() {
  }

}
