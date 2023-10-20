import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

const SAVED_THEME_KEY = 'sm-saved-theme';
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly availableThemes: AppTheme[] = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ];
  private _currentTheme: AppTheme = this.availableThemes[0];
  private renderer!: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const savedTheme = localStorage.getItem(SAVED_THEME_KEY);
    if (savedTheme && this.isAppThemeName(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.availableThemes[0]);
    }
  }

  setTheme(theme: AppTheme) {
    this._currentTheme = theme;
    localStorage.setItem(SAVED_THEME_KEY, theme);
    this.renderer.setAttribute(
      this.document.documentElement,
      'data-theme',
      theme
    );
  }

  isAppThemeName(name: string): name is AppTheme {
    return this.availableThemes.includes(name as AppTheme);
  }

  get currentTheme() {
    return this._currentTheme;
  }
}

export type AppTheme =
  | 'light'
  | 'dark'
  | 'cupcake'
  | 'bumblebee'
  | 'emerald'
  | 'corporate'
  | 'synthwave'
  | 'retro'
  | 'cyberpunk'
  | 'valentine'
  | 'halloween'
  | 'garden'
  | 'forest'
  | 'aqua'
  | 'lofi'
  | 'pastel'
  | 'fantasy'
  | 'wireframe'
  | 'black'
  | 'luxury'
  | 'dracula'
  | 'cmyk'
  | 'autumn'
  | 'business'
  | 'acid'
  | 'lemonade'
  | 'night'
  | 'coffee'
  | 'winter';
