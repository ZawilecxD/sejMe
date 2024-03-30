import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ParliamentHallComponent } from 'src/app/parliament-hall/parliament-hall.component';
import { VotingDetails } from '../../model/voting.model';
import { DatePipe } from '@angular/common';
import { VotingResultComponent } from '../../components/voting-row/voting-result/voting-result.component';
import {
  AppTabOption,
  AppTabsComponent,
} from 'src/app/shared/component/app-tabs/app-tabs.component';
import { FormsModule } from '@angular/forms';
import { VotingMembersListComponent } from '../../components/voting-members-list/voting-members-list.component';

@Component({
  selector: 'sm-voting-details-page',
  standalone: true,
  imports: [
    ParliamentHallComponent,
    DatePipe,
    VotingResultComponent,
    AppTabsComponent,
    FormsModule,
    VotingMembersListComponent,
  ],
  templateUrl: './voting-details-page.component.html',
  styleUrl: './voting-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingDetailsPageComponent {
  readonly votingDetails = toSignal<VotingDetails>(
    inject(ActivatedRoute).data.pipe(map(data => data['votingDetails']))
  );
  readonly tabsOptions: AppTabOption[] = [
    { label: 'Lista', value: VotingDetailsViewMode.LIST },
    { label: 'Sala', value: VotingDetailsViewMode.HALL },
  ];
  readonly selectedViewMode = model(VotingDetailsViewMode.LIST);
  readonly VotingDetailsViewMode = VotingDetailsViewMode;
}

enum VotingDetailsViewMode {
  LIST = 'List',
  HALL = 'Hall',
}
