import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Term } from 'src/app/term/model/Term';
import { loadTerms } from 'src/app/term/state/terms.actions';
import {
  selectAllTerms,
  selectTermsStatus,
  selectTermsError,
} from 'src/app/term/state/terms.selectors';

@Component({
  templateUrl: './term-select-page.component.html',
  styleUrls: ['./term-select-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermSelectPageComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  terms$ = this.store.select(selectAllTerms);
  status$ = this.store.select(selectTermsStatus);
  error$ = this.store.select(selectTermsError);
  readonly compareTerms = (a: Term, b: Term) => a?.num === b?.num;

  ngOnInit() {
    // route resolver zeby zawsze fetchowalo liste termów przed załądowaniem
    // nastepnie route resolver musi wybierac na podstawie id z urla konkretny term a jesli go nie ma to prezkierowac
    // na ten widok wyboru terma
    // resolver powinien moze ustawiac selectedTerm w STORE
    // po zmianie poprzez sidebar powinno byc przekierowanie na strone główna dla terma ?
    this.store.dispatch(loadTerms());
  }

  onTermSelect(term: Term) {
    this.router.navigate([term.num]);
  }
}
