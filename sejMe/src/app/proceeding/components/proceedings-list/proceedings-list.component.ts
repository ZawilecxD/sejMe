import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sm-proceedings-list',
  templateUrl: './proceedings-list.component.html',
  styleUrls: ['./proceedings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProceedingsListComponent {}
