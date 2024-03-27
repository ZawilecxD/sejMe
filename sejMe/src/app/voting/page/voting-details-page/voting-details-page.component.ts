import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ParliamentHallComponent } from 'src/app/parliament-hall/parliament-hall.component';
import { VotingDetails } from '../../model/voting.model';
import { DatePipe } from '@angular/common';
import { VotingResultComponent } from '../../components/voting-row/voting-result/voting-result.component';

@Component({
  selector: 'sm-voting-details-page',
  standalone: true,
  imports: [ParliamentHallComponent, DatePipe, VotingResultComponent],
  templateUrl: './voting-details-page.component.html',
  styleUrl: './voting-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingDetailsPageComponent {
  readonly votingDetails = toSignal<VotingDetails>(
    inject(ActivatedRoute).data.pipe(map(data => data['votingDetails']))
  );
}
