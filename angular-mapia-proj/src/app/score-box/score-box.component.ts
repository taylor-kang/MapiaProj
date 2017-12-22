import { Component, OnInit } from '@angular/core';
import { Score } from '../score';

@Component({
  selector: 'app-score-box',
  templateUrl: './score-box.component.html',
  styleUrls: ['./score-box.component.css']
})

export class ScoreBoxComponent implements OnInit {
  score: Score = {
    level: 0,
    success: 0,
    fail: 0
  };

  constructor() { }

  ngOnInit() {
  }

}
