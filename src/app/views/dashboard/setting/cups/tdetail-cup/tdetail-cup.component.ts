import { Component, computed, inject, signal } from '@angular/core';
import { CupsAPP } from '@interfaces/app';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalCupsService } from '../local-cups.service';
import { NgClass } from '@angular/common';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';

@Component({
    selector: 'tdetail-cup',
    standalone: true,
    imports: [
        BlockSwitchStatusComponent,
        NgClass,
        SelectSomeItemComponent
    ],
    templateUrl: './tdetail-cup.component.html'
})
export class TdetailCupComponent {
    cup$ = inject(LocalCupsService);
    cup = signal<CupsAPP | null>(null);

    ngOnInit(): void {
        this.cup$.watchCup.subscribe(data => {
            this.cup.set(data);
        })
    }

    cupData = computed(() => {
        return {
            name: this.cup()!.name,
            level: this.cup()!.level.name,
            concRip: this.cup()!.ripsConcept.name,
            gender: this.cup()!.gender.name,
            birth: this.cup()!.birth,
            birthType: this.cup()!.birthType.name,
            points: this.cup()!.points,
            uvt: this.cup()!.uvt,
            scope: this.cup()!.scope.name,
            unique: this.cup()!.unique,
            nonInvasiveProcedure: this.cup()!.nonInvasiveProcedure,
            service: this.cup()!.serviceType.name,
            uvr: this.cup()!.uvr,
            age: `${this.cup()!.minAge} a ${this.cup()!.maxAge} años`,
            genderColor: this.cup()!.gender.name === 'Femenino' ? 'text-pink-500' : 'text-blue-500'
        }
    })
}
