import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  animations: [
    trigger('not-found', [
      state('void', style({ opacity: 0, transform: 'translateX(-20px)' })),
      state('ready', style({ opacity: 1, transform: 'translateX(0px)' })),
      transition('void => ready', animate('300ms 0s ease-in')),
    ]),
  ],
})
export class NotFoundComponent {
  notFoundState = 'ready';

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['/calendar']);
  }
}
