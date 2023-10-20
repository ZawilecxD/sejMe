import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { ItemSelectOption } from 'src/app/shared/interface/ItemSelectOption';
import { Term } from 'src/app/term/model/Term';
import { loadTerms } from 'src/app/term/state/terms.actions';
import {
  selectAllTerms,
  selectTermsError,
  selectTermsStatus,
} from 'src/app/term/state/terms.selectors';

@Component({
  selector: 'sm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  private store = inject(Store);
  terms$ = this.store.select(selectAllTerms);
  status$ = this.store.select(selectTermsStatus);
  error$ = this.store.select(selectTermsError);
  selectedTerm: Term | null = null;
  readonly compareTerms = (a: Term, b: Term) => a?.num === b?.num;

  ngOnInit() {
    this.store.dispatch(loadTerms());
  }

  onTermSelect(term: Term) {
    this.selectedTerm = term;
  }
}
