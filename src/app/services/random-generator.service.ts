import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RandomGeneratorService {

  public random(max: number, min: number = 0): number{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public randomFrom<T>(array: T[]): T {
    const randomIndex = this.random(array.length - 1);
    return array[randomIndex];
  }

  public uniqueRandom(max: number, min: number = 0): () => number {

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


  public uniqueRandomFrom<T>(array: T[]): () => T {

    let prevValue: T;
    let recursiveGenerator = () => {
      const random = this.randomFrom<T>(array);

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