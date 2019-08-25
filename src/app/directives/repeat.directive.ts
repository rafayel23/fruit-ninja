import { Directive, TemplateRef, ViewContainerRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[repeat]',
})

export class RepeatDirective implements OnChanges {

  @Input('repeat') quantity: number;
  @Input('repeatMax') max: number;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ){}

  ngOnChanges(){
    if(this.quantity > this.max) return;

    this.viewContainer.clear();
    for(let i = 0; i < this.quantity; i++){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
