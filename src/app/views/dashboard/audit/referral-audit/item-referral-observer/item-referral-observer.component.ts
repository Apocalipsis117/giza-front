import { Component, Input } from '@angular/core';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'item-referral-observer',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './item-referral-observer.component.html'
})
export class ItemReferralObserverComponent {
    @Input() data: any = null;

    get endowment() {
        return this.data ? this.data.dotacion : '';
    }

    get observation() {
        return this.data ? this.data.observacion : '';
    }
}
