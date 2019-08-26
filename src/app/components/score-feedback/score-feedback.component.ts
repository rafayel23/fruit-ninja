import { Component, HostBinding } from '@angular/core';
import { Feedback } from '../../animations';

@Component({
  selector: 'app-score-feedback',
  templateUrl: './score-feedback.component.html',
  styleUrls: ['./score-feedback.component.scss'],
  animations: [Feedback],
})
export class ScoreFeedbackComponent {
  
  name: string;
  point: number;
  coords: {x: number, y: number};

  @HostBinding('style.left.px') get x(){
    return this.coords.x;
  }

  @HostBinding('style.top.px') get y(){
    return this.coords.y;
  }

  @HostBinding('@feedback')true

}
