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
  'paint-brush':
    'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
  user: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
};

type HeroIconName = keyof typeof HERO_ICONS;
