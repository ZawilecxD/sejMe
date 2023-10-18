import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { TermApiService } from '../../api/term-api.service';
import { EMPTY, Observable } from 'rxjs';
import { Term } from '../../model/Term';
import { Store } from '@ngrx/store';
import { loadTerms } from '../../state/terms.actions';
import {
  selectAllTerms,
  selectTermsError,
  selectTermsStatus,
} from '../../state/terms.selectors';

@Component({
  selector: 'sm-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsListComponent implements OnInit {
  private store = inject(Store);
  terms$ = this.store.select(selectAllTerms);
  status$ = this.store.select(selectTermsStatus);
  error$ = this.store.select(selectTermsError);
  selectedTerm: Term | null = null;

  ngOnInit() {
    this.store.dispatch(loadTerms());
  }

  showDetails(term: Term) {
    this.selectedTerm = term;
  }
}
