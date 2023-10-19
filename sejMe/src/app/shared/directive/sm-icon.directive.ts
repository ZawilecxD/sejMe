import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({ selector: '[smIcon]' })
export class SmIconDirective implements OnInit {
  @Input({ required: true, alias: 'smIcon' })
  iconName!: HeroIconName;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (!HERO_ICONS[this.iconName]) {
      console.error(`Could not find any icon for name='${this.iconName}'`);
      return;
    }
    const svgElement = this.setupSvgElement();
    const pathElement = this.setupPathElement();
    this.renderer.appendChild(svgElement, pathElement);
    this.renderer.appendChild(this.el.nativeElement, svgElement);
  }

  private setupSvgElement() {
    const svgElement = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svgElement, 'fill', 'none');
    this.renderer.setAttribute(svgElement, 'viewBox', '0 0 24 24');
    this.renderer.setAttribute(svgElement, 'stroke-width', '1.5');
    this.renderer.setAttribute(svgElement, 'stroke', 'currentColor');
    this.renderer.addClass(svgElement, 'w-6');
    this.renderer.addClass(svgElement, 'h-6');
    return svgElement;
  }

  private setupPathElement() {
    const pathElement = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(pathElement, 'stroke-linecap', 'round');
    this.renderer.setAttribute(pathElement, 'stroke-linejoin', 'round');
    this.renderer.setAttribute(pathElement, 'd', HERO_ICONS[this.iconName]);
    return pathElement;
  }
}

const HERO_ICONS = {
  'bars-3': 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',
};

type HeroIconName = keyof typeof HERO_ICONS;
