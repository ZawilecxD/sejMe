import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-proceedings-list-page',
  styleUrls: ['./proceedings-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './proceedings-list-page.component.html',
})
export class ProceedingsListPageComponent {}
