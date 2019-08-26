import { Component, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { FruitProviderService } from '../../services';
import { EntryPointDirective } from '../../directives';
import { GameStatistics, Fruit } from '../../interfaces';

import { FruitComponent } from '../fruit/fruit.component';
import { LevelupComponent } from '../levelup/levelup.component';
import { GameOverComponent } from '../game-over/game-over.component';
import { ScoreFeedbackComponent } from '../score-feedback/score-feedback.component';


@Component({
  selector: 'app-playground',
  templateUrl: 'playground.component.html',
  styleUrls: ['./playground.component.scss'],
})

export class PlaygroundComponent {

  @ViewChild(EntryPointDirective , {static: true}) 
  entryPoint: EntryPointDirective;

  fruitRefs: Set<ComponentRef<FruitComponent>>;
  stats: GameStatistics;


  constructor(private _resolver: ComponentFactoryResolver, private _provider: FruitProviderService){
    this.fruitRefs = new Set();
    this.stats = {level: 1, score: 0, capturedCount: 0, missedCount: 0};
  }

  detach(){
    this._provider.stop();
    this.fruitRefs.forEach(ref => {
      this.detachInstance(ref.instance);
    })
  }

  detachInstance(instance: FruitComponent){
    instance.freezed = true;
    instance.captured.complete();
    instance.missed.complete();
    instance.gravityAnimation.unsubscribe();
  }

  showLevelupMessage(level: number){
    const levelupFactory = this._resolver.resolveComponentFactory(LevelupComponent)
    const levelupRef = this.entryPoint.viewRef.createComponent(levelupFactory);
    levelupRef.instance.level = level;

    setTimeout(() => levelupRef.destroy(),2000);
  }

  openGameOverModal(){
    const modalFactory = this._resolver.resolveComponentFactory(GameOverComponent);
    const modalRef = this.entryPoint.viewRef.createComponent(modalFactory);
    modalRef.instance.score = this.stats.score;
    
    this.detach();
    modalRef.instance.restart.subscribe(_ => {
      modalRef.destroy();
      this.fruitRefs.forEach(ref => {
        ref.instance.freezed = false;
        ref.instance.destroy();
        setTimeout(() => ref.destroy(),1000)
      });
      this.stats = {level: 1, score: 0, capturedCount: 0, missedCount: 0};
      this.renderFruits();
    })
  }

  showScoreFeedback(coords: {x: number, y: number}, name: string, point: number){
    const feedbackFactory = this._resolver.resolveComponentFactory(ScoreFeedbackComponent);
    const feedbackRef = this.entryPoint.viewRef.createComponent(feedbackFactory);
    Object.assign(feedbackRef.instance, {coords,name,point});

    setTimeout(() => feedbackRef.destroy(),600);
  }

  renderFruits(){
    let time = 2000 - this.stats.level * 150;
    if(time < 200) time = 200;
    this._provider.provide(time).subscribe(fruit => this.loadFruit(fruit));
  }


  loadFruit(fruit: Fruit): ComponentRef<FruitComponent> {
  
    const fruitFactory = this._resolver.resolveComponentFactory(FruitComponent);
    const viewRef = this.entryPoint.viewRef;

    const fruitRef = viewRef.createComponent(fruitFactory);
    this.fruitRefs.add(fruitRef);

    const instance = <FruitComponent>fruitRef.instance;
    instance.fruit = fruit;
    instance.level = this.stats.level;
    
    instance.captured.subscribe(({target,coords}) => {
      fruitRef.destroy();

      this.fruitRefs.delete(fruitRef);
      this.stats.capturedCount++;
      this.stats.score += target.weight / 10;
      this.showScoreFeedback(coords,target.name,target.weight / 10);

      if(this.stats.capturedCount % 10 === 0){
        this.stats.level++;
        this.showLevelupMessage(this.stats.level);
        this.renderFruits();
      }
    })


    instance.missed.subscribe(_ => {
      fruitRef.destroy();

      this.fruitRefs.delete(fruitRef);
      this.stats.missedCount++;

      if(this.stats.missedCount === 5){
        this.openGameOverModal()
      }
    })

    return fruitRef;
  }

  
  ngOnInit(){
    this.renderFruits()
  }

}
