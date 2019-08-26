import { Fruit } from './fruit.interface';

export interface DestroyReport {
    target: Fruit,
    coords: {
        x: number,
        y: number,
    }
}