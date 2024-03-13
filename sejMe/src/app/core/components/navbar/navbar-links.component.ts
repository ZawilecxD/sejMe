import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ul[sm-navbar-links]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (link of links; track link.route) {
      <li>
        <a
          [routerLink]="link.route"
          routerLinkActive="active"
          class="w-full btn btn-ghost rounded-none normal-case flex content-center">
          {{ link.label }}
        </a>
      </li>
    }
  `,
})
export class NavbarLinksComponent {
  readonly links: NavbarLink[] = [
    { label: 'Posłowie', route: 'member' },
    { label: 'Kluby', route: 'club' },
    { label: 'Komisje', route: 'committee' },
    { label: 'Posiedzenia', route: 'proceeding' },
    { label: 'Druki sejmowe', route: 'print' },
    { label: 'Interpelacje', route: 'interpelation' },
    { label: 'Procesy legislacyjne', route: 'legislation' },
    { label: 'Transmisje wideo', route: 'video' },
    { label: 'Zapytania', route: 'questions' },
  ];
}

type NavbarLink = {
  label: string;
  route: string;
};
