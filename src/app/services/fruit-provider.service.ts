import { Injectable } from '@angular/core';
import { interval, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FRUITS } from '../constants';
import { RandomGeneratorService } from './random-generator.service';

@Injectable({
  providedIn: 'root'
})

export class FruitProviderService {

  constructor(private _randomizer: RandomGeneratorService) {}

  provide(){

    const fruitPicker = this._randomizer.uniqueRandomFrom(FRUITS);

    return interval(2000)
    .pipe(
      map(_ => {
        const randomFruit = fruitPicker();
        randomFruit.indent = this._randomizer.random(window.innerWidth - randomFruit.size);

        return randomFruit;
      })
    )
  }

}
