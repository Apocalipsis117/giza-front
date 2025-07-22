import { Component, computed, inject, signal, viewChild, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArraySignalCrud, formHelper, ngFormHelper } from '@helpers/index';
import { InputAvatarComponent } from '@im-inputs/input-avatar/input-avatar.component';
import { InputDateComponent } from '@im-inputs/input-date/input-date.component';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectSearhComponent } from '@im-inputs/input-select-searh/input-select-searh.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlImagen, FormControlOption, FormGroupTyped, IForm, Ips_APPDTO, Ips_base_APPDTO, LegalInformation_APPDTO, StepAction } from '@interfaces/index';
import { BillingParameters_APPDTO } from '@interfaces/setting/billing-parameters.i';
import { BarStepsComponent } from '@layouts/dashboard/bars/bar-steps/bar-steps.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { TableUiComponent } from '@layouts/dashboard/tables/table-ui/table-ui.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { ApartmentCitiesService, LevelIpsService, TypeDniIpsService, TypeRepresentativeService } from '@services/api';
import { RxAppGisaService, SweetalertService } from '@services/app';
import { ValidateNumberEmpty, ValidateStringEmpty } from '@valid-control/index';
import { distinctUntilChanged, forkJoin, take } from 'rxjs';

@Component({
    selector: 'form-ips',
    imports: [
        BarStepsComponent,
        InputSelectComponent,
        InputTextComponent,
        BadgeStatusComponent,
        InputNumberComponent,
        ReactiveFormsModule,
        BladeBoxTitleComponent,
        TableUiComponent,
        InputAvatarComponent,
        InputOnoffComponent,
        InputDateComponent,
        InputSelectSearhComponent,
        ButtonComponent
    ],
    templateUrl: './form-ips.component.html'
})
export class FormIpsComponent {
    private validates = viewChildren('validate');
    private signatureImg = viewChild('signatureImg', { read: InputAvatarComponent });
    private readonly app$ = inject(RxAppGisaService);
    private readonly swa$ = inject(SweetalertService);
    private readonly ApartmentCities$ = inject(ApartmentCitiesService);
    private readonly TypeRepresentative$ = inject(TypeRepresentativeService);
    private readonly TypeDniIps$ = inject(TypeDniIpsService);
    private readonly LevelIps$ = inject(LevelIpsService);
    private readonly fb = inject(FormBuilder);
    stepActive = signal<string | number>('');
    legalInformation = signal<LegalInformation_APPDTO[]>([]);
    crud: ArraySignalCrud<LegalInformation_APPDTO>;
    optionsTypeRepresentative = signal<FormControlOption[]>([]);
    optionsApartments = signal<FormControlOption[]>([]);
    optionsTypeDniIps = signal<FormControlOption[]>([]);
    optionsLevelIps = signal<FormControlOption[]>([]);
    optionsCities = signal<FormControlOption[]>([]);
    steps: StepAction[] = [
        {
            action: 'collapse-one',
            label: 'Paso 1',
            text: 'Informacion basica'
        },
        {
            action: 'collapse-two',
            label: 'Paso 2',
            text: 'Parametros de facturación'
        },
        {
            action: 'collapse-three',
            label: 'Paso 3',
            text: 'Representantes legales'
        }
    ];

    formIps: FormGroup;
    formIpsClone: Ips_base_APPDTO;
    formIpsControls: IForm<Ips_base_APPDTO> = {
        address: [ '', [ValidateStringEmpty()] ],
        code: [ '' ],
        departmentId: [ null ],
        email: [ '' ],
        healthcareFacilityIdTypeId: [ null ],
        identificationNumber: [ '' ],
        ipsLogo: [ '' ],
        levelId: [ null ],
        municipalityId: [ null ],
        name: [ '', [ValidateStringEmpty()] ],
        phone: [ '', [ValidateStringEmpty()] ],
        prefix: [ '' ],
        siauPhone: [ '' ],
        taxId: [ '' ],
        verificationDigit: [ '' ]
    };

    formLegal: FormGroup;
    formLegalClone: LegalInformation_APPDTO;
    formLegalControls: IForm<LegalInformation_APPDTO> = {
        healthcareRepTypeId: [ null ],
        name: [ '' ],
        signatureImg: [ '' ],
        status: [ true ]
    };

    formBilling: FormGroup;
    formBillingClone: BillingParameters_APPDTO;
    formBillingControls: IForm<BillingParameters_APPDTO> = {
        dianResolutionNumber: [ NaN, [ValidateNumberEmpty()]  ],
        resolutionDate: [ '' ],
        resolutionValidity: [ '' ],
        fromNumber: [ NaN ],
        toNumber: [ NaN ],
        invoiceNumber: [ NaN ],
        collectionAccountNumber: [ '' ],
        receivesReferrals: [ false ],
        printsAppointmentSheets: [ false ],
        handlesMedicalRecords: [ false ],
        prescriptionValidity: [ '' ],
        stayDaysNumber: [ NaN ],
        collectionAccountFooter: [ '' ]
    };

    get controlIps() {
        return this.formIps.controls as FormGroupTyped<Ips_base_APPDTO>;
    }

    get controlLegal() {
        return this.formLegal.controls as FormGroupTyped<LegalInformation_APPDTO>;
    }

    get controlBilling() {
        return this.formBilling.controls as FormGroupTyped<BillingParameters_APPDTO>;
    }

    constructor() {
        this.formIps = this.fb.group(this.formIpsControls);
        this.formIpsClone = ngFormHelper.unboxProperties(this.formIpsControls);
        this.formLegal = this.fb.group(this.formLegalControls);
        this.formLegalClone = ngFormHelper.unboxProperties(this.formLegalControls);
        this.formBilling = this.fb.group(this.formBillingControls);
        this.formBillingClone = ngFormHelper.unboxProperties(this.formBillingControls);
        // init step
        const stepActive = this.steps[ 0 ].action;
        this.stepActive.set(stepActive);
        // crud
        this.crud = new ArraySignalCrud<LegalInformation_APPDTO>(this.legalInformation, {
            onEdit: (item) => this.formLegal.patchValue(item),
            onCancel: () => this.formLegal.reset(),
            onDelete: () => {
                this.swa$.alertSimple('Representante eliminado', 'info')
            },
        });
    }

    ngOnInit(): void {
        this.app$.watchCountries.subscribe({
            next: (value) => this.optionsApartments.set(value.apartaments)
        });
        this.watchDepartamentId();
        const obs = forkJoin({
                TypeRepresentative: this.TypeRepresentative$.list('options'),
                TypeDniIps: this.TypeDniIps$.list('options'),
                LevelIps: this.LevelIps$.list('options'),
            });

            obs.pipe(take(1)).subscribe({
                next: (value) => {
                    this.optionsTypeRepresentative.set(value.TypeRepresentative);
                    this.optionsTypeDniIps.set(value.TypeDniIps);
                    this.optionsLevelIps.set(value.LevelIps);
                }
            });
    }

    list = computed(() => {
        const items = this.legalInformation();
        return items.map(x => ({
            current: x,
            healthcareRepTypeName: formHelper.findOption(x.healthcareRepTypeId, this.optionsTypeRepresentative())?.name
        }))
    })

    watchDepartamentId() {
        this.formIps.get('departmentId')!.valueChanges.pipe(distinctUntilChanged()).subscribe({
            next: (value) => {
                this.ApartmentCities$.filterByDepartment(value).subscribe({
                    next: (value) => {
                        this.optionsCities.set(value);
                    }
                })
            }
        })
    }

    validateIps() {
        this.validates()?.forEach((x: any) => x.validate())
    }

    onStep(action: string) {
        this.stepActive.set(action);
    }

    get ipsDTO() {
        const ips = this.formIps.value as Ips_base_APPDTO;
        const billingParameters = this.formBilling.value as BillingParameters_APPDTO;
        const value: Ips_APPDTO = {
            ips,
            billingParameters,
            legalInformation: this.legalInformation()
        };
        return value;
    }

    submitForm() {
        if (this.crud.isEditing()) {
            this.crud.update(this.formLegal.value); // edita
        } else {
            this.crud.add(this.formLegal.value); // agrega
        }
        this.signatureImg()?.remove();
        this.formLegal.reset();
    }

    cancelEdit() {
        this.crud.cancel();
        this.signatureImg()?.remove();
    }

    pacthImg($event: FormControlImagen | null) {
        this.formLegal.patchValue({
            signatureImg: $event?.file || ''
        });
    }

    pacthLogo($event: FormControlImagen | null) {
        this.formIps.patchValue({
            ipsLogo: $event?.file || ''
        });
    }

    step(index: number) {
        this.stepActive.set(this.steps[ index ].action);
    }

    reset() {
        this.formIps.reset();
        this.formIps.clearValidators();
        this.formIps.updateValueAndValidity();
        this.formBilling.reset();
        this.formBilling.clearValidators();
        this.formBilling.updateValueAndValidity();
        this.legalInformation.set([]);
    }

}
