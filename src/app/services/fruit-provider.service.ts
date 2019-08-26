import { Injectable } from '@angular/core';
import { interval, Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FRUITS } from '../constants';
import { RandomGeneratorService } from './random-generator.service';
import { Fruit } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class FruitProviderService {

  private destroy: Subject<void>;
  private fruitPicker: Function;

  constructor(private _randomizer: RandomGeneratorService) {
    this.destroy = new Subject();
    this.fruitPicker = this._randomizer.uniqueRandomFrom<Fruit>(FRUITS);
  }

  private getRandomFruit(): Fruit {
    const randomFruit = this.fruitPicker();
    randomFruit.indent = this._randomizer.random(window.innerWidth - randomFruit.size);
    return randomFruit;
  }

  provide(speed: number): Observable<Fruit> {
    this.destroy.next();
    return interval(speed)
    .pipe(
      takeUntil(this.destroy),
      map(_ => this.getRandomFruit()),
    )
  }

  stop(): void{
    this.destroy.next();
  }



}