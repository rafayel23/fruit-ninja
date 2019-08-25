import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FruitProviderService } from '../../services';
import { EntryPointDirective } from '../../directives/entry-point.directive';
import { FruitComponent } from '../fruit/fruit.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  @ViewChild(EntryPointDirective , {static: true}) 
  entry: EntryPointDirective;

  passedCount: number = 0;
  shootCount: number = 0;
  points: number = 0;
  level: number = 1;

  constructor(
  private _resolver: ComponentFactoryResolver,
  private _dataProvider: FruitProviderService,
  ){}

  loadFruit(fruitOptions){
  
    const fruitFactory = this._resolver.resolveComponentFactory(FruitComponent);
    const viewRef = this.entry.viewRef;

    const fruitRef = viewRef.createComponent(fruitFactory);
    const instance = <FruitComponent>fruitRef.instance;
    instance.options = fruitOptions;
    instance.level = this.level;
    
    const shootObserver = instance.shoot.subscribe(({name,weight}) => {
      this.shootCount++;
      this.points += weight / 10;
      fruitRef.destroy();

      this.level = Math.trunc(this.shootCount / 10 + 1);
    })

    const passedObserver = instance.passed.subscribe(_ => {
      this.passedCount++;
      fruitRef.destroy();
      if(this.passedCount === 5){
        alert('GAME OVER')
      }
    })

    fruitRef.onDestroy(_ => {
      shootObserver.unsubscribe();
      passedObserver.unsubscribe();
    })
  }
  
  ngOnInit(){
    this._dataProvider.provide().subscribe(options => this.loadFruit(options));
  }

}
