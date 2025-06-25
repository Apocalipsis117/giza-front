import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { LegalDataIpsAPP } from '@interfaces/app';
import { ActionName, BasicDataIpsDTO_APP, BillingIpsDTO_APP, IForm } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeStepsComponent } from '@layouts/dashboard/blades/blade-steps/blade-steps.component';
import { IpsService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormRegisterIpsOneComponent } from './form-register-ips-one/form-register-ips-one.component';
import { FormRegisterIpsThreeComponent } from './form-register-ips-three/form-register-ips-three.component';
import { FormRegisterIpsTwoComponent } from './form-register-ips-two/form-register-ips-two.component';
import { LocalIpsService } from './local-ips.service';

@Component({
    selector: 'app-ips',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        BladeStepsComponent,
        FormRegisterIpsOneComponent,
        FormRegisterIpsTwoComponent,
        FormRegisterIpsThreeComponent
    ],
    templateUrl: './ips.component.html'
})
export class RegisterIpsComponent {
    private readonly ips$ = inject(IpsService);
    private readonly local$ = inject(LocalIpsService);
    private readonly swal$ = inject(SweetalertService);
    private readonly fb = inject(FormBuilder);
    form: FormGroup;

    formIpsClone: BasicDataIpsDTO_APP;
    formIps: IForm<BasicDataIpsDTO_APP> = {
        code: [''],
        email: [''],
        departmentId: [''],
        address: [''],
        verificationDigit: [''],
        indicative: [''],
        ipsLogo: [''],
        levelId: [''],
        name: [''],
        identificationNumber: [''],
        phone: [''],
        ipsIdentificationTypeId: [''],
        cityId: [''],
        neighborhood: ['']
    }
    pFacturacionIpsClone: BillingIpsDTO_APP;
    pFacturacionIps: IForm<BillingIpsDTO_APP> = {
        resolutionNumber: [''],
        startDate: [''],
        endDate: [''],
        resolutionDate: [''],
        resolutionValidity: [''],
        prefix: [''],
        invoiceNumber: [''],
        collectionAccountNumber: [''],
        soatDelegate: [''],
        ripsResponsible: [''],
        receivesRemissions: [false],
        printsAppointmentSheets: [false],
        handlesClinicalHistory: [false],
        formulaValidity: [''],
        numberOfDaysStays: [''],
        collectionAccountFooter: ['']
    }


    constructor() {
        this.form = this.fb.group({
            ips: this.fb.group(this.formIps),
            datosLegalesIps: [[] as LegalDataIpsAPP[]],
            pFacturacionIps: this.fb.group(this.pFacturacionIps)
        })
        this.formIpsClone = ngFormHelper.unboxProperties(this.formIps)
        this.pFacturacionIpsClone = ngFormHelper.unboxProperties(this.pFacturacionIps)
    }

    ips = computed(() => {
        return this.form.get('ips') as FormGroup;
    })

    get LegalData() {
        return this.form.get('datosLegalesIps') as FormGroup;
    }

    billingParametersFor = computed(() => {
        return this.form.get('pFacturacionIps') as FormGroup;
    })

    formData(event: any[]) {
        if (event.length > 0) {
            const data: LegalDataIpsAPP[] = event.map(x => ({
                ipsRepresentativeType: x.type,
                name: x.name,
                status: true,
                signatureImg: x.file.base64
            }))
            this.LegalData.patchValue(data);
        }
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        if (this.ips().valid) {
            this.swal$.loading();
            this.ips$.post(this.form.value).subscribe({
                next: (data) => {
                    console.info("data", data);
                    this.swal$.formSave('success');
                    this.reset();
                },
                error: () => this.swal$.formSave('error')
            });
        } else {
            this.swal$.formSave('warning');
        }
    }

    reset() {
        this.ips().patchValue(this.formIpsClone);
        this.billingParametersFor().patchValue(this.pFacturacionIpsClone);
        this.LegalData.patchValue([]);
        this.local$.emit('reset');
    }
}
