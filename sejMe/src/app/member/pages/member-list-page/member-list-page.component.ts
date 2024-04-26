import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MembersFiltersComponent } from '../../components/members-filters/members-filters.component';
import { MembersTableComponent } from '../../components/members-table/members-table.component';

@Component({
  imports: [MembersFiltersComponent, MembersTableComponent],
  standalone: true,
  templateUrl: './member-list-page.component.html',
  styleUrls: ['./member-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberListPageComponent {
  showFilters = false;

  toggleFiltersSection() {
    this.showFilters = !this.showFilters;
  }
}
