import { Component, Input } from '@angular/core';
import { GameStatistics } from '../../../interfaces';

@Component({
  selector: 'app-point-bar',
  templateUrl: './point-bar.component.html',
  styleUrls: ['./point-bar.component.scss']
})

export class PointBarComponent {

  @Input() stats: GameStatistics
}
