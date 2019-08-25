import { Injectable } from '@angular/core';
import { FRUITS } from '../constants';

@Injectable({
  providedIn: 'root'
})

export class RandomGeneratorService {

  constructor() {}

  random(max: number, min: number = 0): number{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomFrom<T>(array: T[]): T {
    const randomIndex = this.random(array.length - 1);
    return array[randomIndex];
  }

  uniqueRandom(max: number, min: number = 0): () => number {

    let prevValue: number;

    let recursiveGenerator = () => {
      const random = this.random(max,min);

      if(prevValue === random){
        return recursiveGenerator();
      }
      else{
        return prevValue = random;    
      }
    }

    return recursiveGenerator;

  }


  uniqueRandomFrom<T>(array: T[]): () => T {

    let prevValue: any;

    let recursiveGenerator = () => {
      const random = this.randomFrom(array);

      if(prevValue === random){
        return recursiveGenerator();
      }
      else{
        return prevValue = random; 
      }
    }

    return recursiveGenerator;

  }


}