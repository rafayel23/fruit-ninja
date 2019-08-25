import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FruitOptions } from '../../interfaces';
import { interval } from 'rxjs';

@Component({
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.scss']
})
export class FruitComponent implements OnInit {

  @Input() options: FruitOptions;
  @Input() level: number;
  @Output() passed = new EventEmitter<void>();
  @Output() shoot = new EventEmitter<FruitOptions>();

  mapOptionStyles: Object;

  constructor(){}

  ngOnInit() {


    interval(300 / this.options.weight).subscribe(_ => {
      const currentTop = this.mapOptionStyles['top.px'] += this.level;
      if(currentTop > window.innerHeight){
        this.passed.emit();
      }
    })

    this.mapOptionStyles = {
      'position': 'fixed',
      'height': 'auto',
      'width.px': this.options.size,
      'left.px': this.options.indent,
      'top.px': -this.options.size,
    }
  }

}
