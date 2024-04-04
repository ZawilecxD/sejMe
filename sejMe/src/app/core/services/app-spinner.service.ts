import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subject, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AppSpinnerService {
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private readonly hideTimeoutMs = 0;
  private spinOperationsInProgress = 0;
  private _spinSub: Subject<boolean> = new Subject();
  get spinning$() {
    return this._spinSub.asObservable();
  }

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        tap(event => {
          switch (true) {
            case event instanceof NavigationStart: {
              this.start();
              break;
            }
            case event instanceof NavigationEnd:
            case event instanceof NavigationCancel:
            case event instanceof NavigationError: {
              this.stop();
              break;
            }
            default: {
              break;
            }
          }
        })
      )
      .subscribe();
  }

  start() {
    this.spinOperationsInProgress++;
    this._spinSub.next(true);
    this.document.querySelector('#page-spinner')?.classList.remove('hidden');
  }

  stop() {
    this.spinOperationsInProgress--;
    if (this.spinOperationsInProgress < 0) this.spinOperationsInProgress = 0;
    setTimeout(() => {
      const isSpinning = this.spinOperationsInProgress > 0;
      this._spinSub.next(isSpinning);
      if (!isSpinning) {
        this.document.querySelector('#page-spinner')?.classList.add('hidden');
      }
    }, this.hideTimeoutMs);
  }
}
