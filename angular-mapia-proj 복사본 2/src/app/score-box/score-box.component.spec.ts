import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoxComponent } from './score-box.component';

describe('ScoreBoxComponent', () => {
  let component: ScoreBoxComponent;
  let fixture: ComponentFixture<ScoreBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
