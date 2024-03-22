import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  standalone: true,
  selector: 'sm-voting-page',
  template: `<router-outlet></router-outlet> `,
})
export class VotingPageComponent {}
