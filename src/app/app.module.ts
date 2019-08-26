import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { EntryPointDirective } from './directives/entry-point.directive';
import { AppComponent } from './components';
import { FruitComponent } from './components/fruit/fruit.component';
import { PassedBarComponent } from './components/playground/passed-bar/passed-bar.component';
import { PointBarComponent } from './components/playground/point-bar/point-bar.component';
import { RepeatDirective } from './directives/repeat.directive';
import { LevelupComponent } from './components/levelup/levelup.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { ScoreFeedbackComponent } from './components/score-feedback/score-feedback.component';


@NgModule({
  declarations: [
    EntryPointDirective,
    AppComponent,
    FruitComponent,
    PassedBarComponent,
    PointBarComponent,
    RepeatDirective,
    LevelupComponent,
    MainPageComponent,
    PlaygroundComponent,
    GameOverComponent,
    ScoreFeedbackComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
    
  entryComponents: [
    FruitComponent, 
    LevelupComponent, 
    GameOverComponent,
    ScoreFeedbackComponent,
  ],
})

export class AppModule { }
