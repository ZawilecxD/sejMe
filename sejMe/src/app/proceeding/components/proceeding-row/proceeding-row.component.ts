import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sm-proceeding-row',
  templateUrl: './proceeding-row.component.html',
  styleUrls: ['./proceeding-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProceedingRowComponent {}
