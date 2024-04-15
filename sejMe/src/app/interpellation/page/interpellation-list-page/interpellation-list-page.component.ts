import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-interpellation-list-page',
  standalone: true,
  imports: [],
  templateUrl: './interpellation-list-page.component.html',
  styleUrl: './interpellation-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterpellationListPageComponent {}
