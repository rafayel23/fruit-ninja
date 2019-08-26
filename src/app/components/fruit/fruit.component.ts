import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Fruit, DestroyReport } from '../../interfaces';
import { Capture } from '../../animations';

@Component({
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.scss'],
  animations: Capture,
})

export class FruitComponent implements OnInit, OnDestroy {
  
  fruit: Fruit;
  fruitStyles: Object;

  level: number;
  freezed: boolean = false;
  destroyed: boolean = false;

  gravityAnimation: Subscription;
  missed = new EventEmitter<void>();
  captured = new EventEmitter<DestroyReport>();

  constructor(){}

  destroy(){

    if(!this.freezed){
      this.destroyed = true;
    }
  }

  beforeCapturing({toState}){
    toState && this.gravityAnimation.unsubscribe();
  }

  afterCapturing({toState}){
    toState && this.captured.emit({
      target: this.fruit,
      coords: {
        x: this.fruit.indent,
        y: this.fruitStyles['top.px'] + this.fruit.size / 2,
      },
    });
  }


  ngOnInit() {

    this.gravityAnimation = interval(500 / this.fruit.weight)
    .subscribe(_ => {
      const currentTop = this.fruitStyles['top.px'] += this.level
      if(currentTop > window.innerHeight){
        this.missed.emit();
      }
    })

    this.fruitStyles = {
      'width.px': this.fruit.size,
      'left.px': this.fruit.indent,
      'top.px': -this.fruit.size,
    }
  }

  ngOnDestroy(){
    this.captured.complete();
    this.missed.complete();
    this.gravityAnimation.unsubscribe();
  }

}