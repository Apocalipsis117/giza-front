import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { IpsService } from '@services/api';
import { SweetalertService } from '@services/app';
import { LocalIpsService } from './local-ips.service';
import { FormIpsComponent } from './form-ips/form-ips.component';
import { TableIpsComponent } from './table-ips/table-ips.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { ActionName, BarActions, Ips_APP, tabsControls } from '@interfaces/index';
import { DetailIpsComponent } from './detail-ips/detail-ips.component';
import { DirectivesModule } from '@directive/module';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { timer } from 'rxjs';

@Component({
    selector: 'app-ips',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeTabsHorizontalComponent,
        BladeDialogComponent,
        CardBasicTextComponent,
        BladeBoxPanelComponent,
        FormIpsComponent,
        DetailIpsComponent,
        DirectivesModule,
        TableIpsComponent
    ],
    templateUrl: './ips.component.html'
})
export class RegisterIpsComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly swal$ = inject(SweetalertService);
    private readonly Ips$ = inject(IpsService);
    private readonly local$ = inject(LocalIpsService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormIpsComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormIpsComponent});
    readonly table = viewChild('table', { read: TableIpsComponent});
    actionsDetail: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    actionsUpdate: BarActions = {
        update: true,
        return: true
    }
    tabs: tabsControls[] = [
        {
            active: true,
            idConnect: 'add-entity',
            label: 'Crear entidad'
        },
        {
            active: false,
            idConnect: 'add-platform',
            label: 'Entidades'
        }
    ];

    constructor() {
        this.destroyRef.onDestroy(() => {
            this.local$.entityEmit(null);
        })
    }

    /*canGoOut(): Promise<boolean> | boolean {
        return this.swal$.canOutup(this.formCreate()?.form.dirty)
    }*/

    barAction(e: ActionName) {
        const data = this.local$.getEntity();
        if (e === 'save') this.save();
        else if (e === 'reset') this.formCreate()?.reset();
        else if (e === 'clean') this.cleanDetail();
        else if (e === 'edit') {
            if(data) {
                this.dataEdit(data);
                this.dialogUpdate()?.show();
            } else {
                this.swal$.alertSimple('Debe seleccionar una Entidad', 'info');
            }
        }
        else if (e === 'delete') {
            this.deleteAlert(data);
        }
        else if (e === 'update') this.update();
        else if (e === 'return') {
            this.dataEdit(data)
            this.swal$.alertSimple('Valores originales cargados.', 'success');
        }
    }

    private showTab(id: number) {
        this.tabController()?.showTab(this.tabs[id].idConnect);
    }

    private save() {
        const formIps = this.formCreate()?.formIps;
        const formBilling = this.formCreate()?.formBilling;
        const legalInformation = this.formCreate()?.legalInformation();
        if (formIps?.valid && formBilling?.valid && legalInformation!.length > 0) {
            this.swal$.loading();
            const values = this.formCreate()!.ipsDTO;
            this.Ips$.post(values).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
                },
                complete: () => {
                    this.swal$.formSave('success');
                    this.formCreate()?.reset();
                    // this.table()?.queryAdministrativeEntities();
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            if(formIps?.invalid) {
                console.log('ips');
                this.formCreate()?.formIps.markAllAsTouched();
                this.formCreate()?.step(0);
            }
            else if(formBilling?.invalid) {
                console.log('formBilling');
                this.formCreate()?.step(1);
                this.formCreate()?.formBilling.markAllAsTouched();
            }
            else {
                console.log('legalInformation');
                this.formCreate()?.step(2);
            }
            timer(50).subscribe(() => this.formCreate()?.validateIps())
        }
    }

    private update() {
        /*const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            const data = this.local$.getEntity();
            this.Ips$.update(data!.id, form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
                },
                complete: () => {
                    this.dialogUpdate()?.hide();
                    this.swal$.formSave('success');
                    this.table()?.queryAdministrativeEntities();
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formUpdate()?.markAlltouched();
        }*/
    }

    private deleteAlert(data: Ips_APP | null) {
        if(data) {
            this.swal$.toastConfirm('warning', {
                text: 'Seguro que desea elimina ' + data.name,
                title: 'Confirmar'
            }).then(value => {
                if(value.isConfirmed) {
                    this.delete(data);
                }
            })
        }
    }

    private delete(data: Ips_APP) {
        this.swal$.loading();
        this.Ips$.delete(data.uuid).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                // this.table()?.queryAdministrativeEntities();
                this.local$.entityEmit(null);
            }
        });
    }

    private cleanDetail() {
        // this.table()?.clean();
    }

    private dataEdit(data: Ips_APP | null) {
        if(data) {
            // this.formUpdate()?.setValues(data);
        }
    }
}
