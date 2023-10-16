import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TermApiService } from '../api/term-api.service';
import { EMPTY, Observable } from 'rxjs';
import { Term } from '../model/Term';

@Component({
  selector: 'sm-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsListComponent {
  private termApi = inject(TermApiService);
  terms$ = this.termApi.getList();
  termDetails$: Observable<Term> = EMPTY;

  loadDetails(termNum: number) {
    this.termDetails$ = this.termApi.getDetails(termNum);
  }
}
