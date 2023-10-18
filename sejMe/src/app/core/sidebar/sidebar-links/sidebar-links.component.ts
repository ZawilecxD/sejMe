import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLinksComponent {
  readonly links: SidebarLink[] = [
    { label: 'Posłowie', route: '/member' },
    { label: 'Kluby', route: '/club' },
    { label: 'Komisje', route: '/comittee' },
    { label: 'Posiedzenia', route: '/proceeding' },
    { label: 'Druki sejmowe', route: '/print' },
    { label: 'Interpelacje', route: '/interpelation' },
    { label: 'Procesy legislacyjne', route: '/legislation' },
    { label: 'Transmisje wideo', route: '/video' },
    { label: 'Zapytania', route: '/questions' },
  ];
}

type SidebarLink = {
  label: string;
  route: string;
};
