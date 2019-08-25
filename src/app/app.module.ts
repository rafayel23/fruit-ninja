import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { EntryPointDirective } from './directives/entry-point.directive';
import { AppComponent } from './components';
import { FruitComponent } from './components/fruit/fruit.component';
import { PassedBarComponent } from './components/passed-bar/passed-bar.component';
import { PointBarComponent } from './components/point-bar/point-bar.component';
import { RepeatDirective } from './directives/repeat.directive';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    EntryPointDirective,
    AppComponent,
    FruitComponent,
    PassedBarComponent,
    PointBarComponent,
    RepeatDirective,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
    
  entryComponents: [FruitComponent],
})

export class AppModule { }
