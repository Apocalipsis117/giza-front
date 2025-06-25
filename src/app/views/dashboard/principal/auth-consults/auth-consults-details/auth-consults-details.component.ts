import { Component, computed, inject, signal } from '@angular/core';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { TestService } from '@services/app';

@Component({
    selector: 'auth-consults-details',
    standalone: true,
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent
    ],
    templateUrl: './auth-consults-details.component.html'
})
export class AuthConsultsDetailsComponent {
    data = signal<any | null>(null); // replace any with your interface
    localServ = inject(TestService);

    ngOnInit(): void {
        this.localServ.watchData.subscribe(data => this.data.set(data));
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
        };
    });
}
