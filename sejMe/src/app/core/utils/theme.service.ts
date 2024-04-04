import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SAVED_THEME_KEY = 'sm-saved-theme';
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly availableThemes: AppTheme[] = ['light', 'dark'];
  private _currentTheme: BehaviorSubject<AppTheme> = new BehaviorSubject(
    this.availableThemes[0]
  );
  private renderer!: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    const savedTheme = localStorage.getItem(SAVED_THEME_KEY);
    if (savedTheme && this.isAppThemeName(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.availableThemes[0]);
    }
  }

  switchTheme() {
    const newTheme = this._currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: AppTheme) {
    this._currentTheme.next(theme);
    console.log(theme);
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

  get currentTheme$() {
    return this._currentTheme.asObservable();
  }
}

export type AppTheme = 'light' | 'dark';
