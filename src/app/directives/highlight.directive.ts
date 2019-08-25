import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  native: HTMLImageElement;
  constructor(private ref: ElementRef) {
    this.native = this.ref.nativeElement;
    this.native.style.transition = 'opacity 0.3s'
    this.native.style.cursor = 'pointer'
  }

  @HostListener('mouseover')
  onAim(){
    this.native.style.opacity = '0.8'
  }

  @HostListener('mouseleave')
  onLeave(){
    this.native.style.opacity = 'initial'
  }

}
