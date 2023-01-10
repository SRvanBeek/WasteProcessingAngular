import {Component} from '@angular/core';
import {ToastService} from "../_services/toast.service";

@Component({
  selector: 'app-toast',
  styleUrls: ['./toast.component.scss'],
  template: `
    <ngb-toast
      class="addedToast"
      *ngFor="let toast of toastService.toasts"
      [header]="toast.header" [autohide]="true" [delay]="toast.delay || 3000"
      (hidden)="toastService.remove(toast)"
    >{{toast.body}}</ngb-toast>
  `,
})
export class ToastComponent {
  constructor(public toastService: ToastService) {
  }
}
