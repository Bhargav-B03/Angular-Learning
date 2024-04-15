import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  constructor(private elemRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elemRef.nativeElement, 'backgroundColor', 'blue');
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elemRef.nativeElement, 'backgroundColor', 'blue');
    this.backgroundColor = 'blue';
  }
  
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.removeStyle(this.elemRef.nativeElement, 'backgroundColor');
    this.backgroundColor = 'transparent';
  }
}
