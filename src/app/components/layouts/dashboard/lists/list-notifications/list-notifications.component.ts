import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'list-notifications',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './list-notifications.component.html'
})
export class ListNotificationsComponent {

}
