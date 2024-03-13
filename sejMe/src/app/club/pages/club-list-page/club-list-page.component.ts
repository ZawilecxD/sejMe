import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClubFiltersComponent } from '../../components/club-filters/club-filters.component';
import { ClubListComponent } from '../../components/club-list/club-list.component';

@Component({
  standalone: true,
  imports: [ClubFiltersComponent, ClubListComponent],
  selector: '@sm-club-list-page',
  templateUrl: './club-list-page.component.html',
  styleUrls: ['./club-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubListPageComponent {}
