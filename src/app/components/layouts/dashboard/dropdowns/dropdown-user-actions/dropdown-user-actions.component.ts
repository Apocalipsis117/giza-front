import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActionMenuUserActions } from '@interfaces/index';
import { AppMenuService } from '@services/app';

@Component({
  selector: 'dropdown-user-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-user-actions.component.html'
})
export class DropdownUserActionsComponent {
    userActions = inject(AppMenuService);
    actions = signal<UserActionMenuUserActions[]>([]);

    ngOnInit(): void {
        const data = this.userActions.menuUser;
        this.actions.set(data)
    }

}
