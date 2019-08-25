import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[entryPoint]'
})
export class EntryPointDirective {

  constructor(public viewRef: ViewContainerRef) {}

}
