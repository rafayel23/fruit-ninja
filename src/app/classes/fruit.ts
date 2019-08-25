import { Type } from '@angular/core';
import { FruitOptions } from '../interfaces';

export class Fruit {
    constructor(
    public component: Type<any>, 
    public options: FruitOptions
    ){}
}