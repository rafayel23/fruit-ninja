import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-passed-bar',
  templateUrl: './passed-bar.component.html',
  styleUrls: ['./passed-bar.component.scss']
})
export class PassedBarComponent {

  @Input() passedCount: number;

}
