import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'sm-voting-details-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './voting-details-page.component.html',
  styleUrl: './voting-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingDetailsPageComponent {
  readonly votingDetails = toSignal(
    inject(ActivatedRoute).data.pipe(map(data => data['votingDetails']))
  );
}
