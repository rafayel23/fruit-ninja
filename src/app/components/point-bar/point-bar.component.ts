import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-point-bar',
  templateUrl: './point-bar.component.html',
  styleUrls: ['./point-bar.component.scss']
})
export class PointBarComponent {

  @Input() points: number;
  @Input() shootCount: number;
  @Input() level: number;

}
