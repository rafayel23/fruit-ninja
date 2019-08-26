import { Component, HostBinding } from '@angular/core';
import { Levelup } from '../../animations';

@Component({
  selector: 'app-levelup',
  templateUrl: './levelup.component.html',
  styleUrls: ['./levelup.component.scss'],
  animations: [Levelup],
})
export class LevelupComponent {
  level: number;
  @HostBinding('@levelup')true;
}
