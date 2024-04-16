import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-interpellations-list',
  standalone: true,
  imports: [],
  templateUrl: './interpellations-list.component.html',
  styleUrl: './interpellations-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterpellationsListComponent {

}
