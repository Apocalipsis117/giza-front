import { Component, computed, inject, signal } from '@angular/core';
import { Institutions_APP, Institutions_Detail } from '@interfaces/index';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { LocalInstitutionsService } from '../local-institutions.service';

@Component({
    selector: 'detail-institutions',
    standalone: true,
    imports: [
        SelectSomeItemComponent
    ],
    templateUrl: './detail-institutions.component.html'
})
export class DetailInstitutionsComponent {
    private readonly local$ = inject(LocalInstitutionsService);
    data = signal<Institutions_APP | null>(null);

    ngOnInit(): void {
        this.local$.readEntity$.subscribe(data => {
            this.data.set(data);
        })
    }

    value = computed((): Institutions_Detail => {
        return {
            name: this.data()!.name,
            roomCode: this.data()!.roomCode,
            address: this.data()!.address,
            phone: this.data()!.phone,
            email: this.data()!.email,
            complexityLevel: this.data()!.complexityLevel.name,
            department: this.data()!.department.name,
            legalNature: this.data()!.legalNature.name,
            municipality: this.data()!.municipality.name,
            referralType: this.data()!.referralType.name,
        }
    })
}
