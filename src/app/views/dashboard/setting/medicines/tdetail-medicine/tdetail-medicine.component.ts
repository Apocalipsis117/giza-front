import { Component, computed, inject, input, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { Medicine_APP, tabsControls } from '@interfaces/index';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { LocalMedicineService } from '../local-medicine.service';

@Component({
    selector: 'tdetail-medicine',
    standalone: true,
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        ButtonComponent
    ],
    templateUrl: './tdetail-medicine.component.html'
})
export class TdetailMedicineComponent {
    readonly tabController = viewChild('tabDetails', { read: BladeTabsHorizontalComponent});
    public readonly data = input<Medicine_APP | null>(null);
    local$ = inject(LocalMedicineService);
    tabsControls: tabsControls[] = [
        {
            active: true,
            idConnect: 'tab-detail-a',
            label: 'Información'
        },
        {
            active: false,
            idConnect: 'tab-detail-b',
            label: 'Otros datos'
        }
    ];

    value = computed(() => {
        const _ = this.data()!;
        return {
            name: _.name,
            code: _.code,
            atc: _.atc,
            unitPrice: _.unitPrice,
            cum: _.cum || '',
            cumCons: _.cumConsecutive || '',
            cumName: _.cumName,
            referenceUnit: _.referenceUnit || '',
            otherName: _.otherName,
            adverseEffect: _.adverseEffect || 'Ninguno',
            contraindications: _.contraindications || 'Ninguno',
            ompatibility: _.interactionIncompatibility || 'Ninguno',
            liquid: _.liquid,
            isActive:  _.status,
            costCenter:  _.costCenter.name,
            pharmaceuticalForm: _.pharmaceuticalForm.name,
            medicineTypeName: _.medicineType.name,
            measurementUnit: _.unitOfMeasure.name,
            concentration: _.concentration.name,
        }
    });

    manualsRate = computed(() => {
        return this.data()!.medicineManualTariffMeds.map(x => ({
            name: x.medicineTariffManual.name,
            value: x.value
        }))
    })
}
