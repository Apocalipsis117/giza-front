import { CommonModule } from '@angular/common';
import { Component, ViewChild, computed, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPanelImgPreviewComponent } from '@form-control/input-panel-img-preview/input-panel-img-preview.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ngFormHelper } from '@helpers/index';
import { IForm, OptionsForm } from '@interfaces/index';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { TypeRepresentativeService } from '@services/api';
import { SweetalertService } from '@services/app';
import { LocalIpsService } from '../local-ips.service';

@Component({
    selector: 'form-register-ips-two',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputPanelSelectComponent,
        InputPanelTextComponent,
        InputPanelImgPreviewComponent,
        ButtonComponent,
        TitleIconSectionComponent,
        BladeBoxTitleComponent
    ],
    templateUrl: './form-register-ips-two.component.html'
})
export class FormRegisterIpsTwoComponent {
    @ViewChild('inputFileImg') inputFileImg!: InputPanelImgPreviewComponent;
    // output
    FormData = output<any>();
    // inject
    loca$ = inject(LocalIpsService);
    typeRepresentative$ = inject(TypeRepresentativeService);
    fb = inject(FormBuilder);
    swal = inject(SweetalertService);
    // signals
    legalRepresentatives = signal<any[]>([]);
    typeRepresOptions = signal<OptionsForm[]>([]);
    selectForDelete = signal<number>(-1);
    // form
    form: FormGroup;
    itemClone: any;
    item: IForm<any> = {
        file: ['', Validators.required],
        type: ['', Validators.required],
        name: ['', Validators.required]
    };

    constructor() {
        this.itemClone = ngFormHelper.unboxProperties(this.item);
        this.form = this.fb.group(this.itemClone);
    }

    options = computed(() => {
        return this.typeRepresOptions().filter((x: any) => !this.legalRepresentatives().some((y: any) => y.type === x.value));
    })

    list = computed(() => {
        return this.legalRepresentatives().map((x: any, i: number) => ({
            id: i,
            name: x.name,
            typeName: this.typeRepresOptions().find((y: any) => y.value === x.type)?.name,
            file: x.file
        }));
    });

    ngOnInit(): void {
        this.typeRepresentative$.getAll('options').subscribe(data => this.typeRepresOptions.set(data));
        this.watchEventForm();
    }

    fileImg(event: any) {
        this.form.patchValue({
            file: event
        })
    }

    save() {
        if (this.form.valid) {
            this.legalRepresentatives.update(x => [...x, this.form.value]);
            this.FormData.emit(this.legalRepresentatives());
            this.clean();
        } else {
            this.swal.formSave('warning');
        }
    }

    clean() {
        this.inputFileImg.clean();
        this.form.reset(this.itemClone);
    }

    cleanList() {
        this.legalRepresentatives.set([]);
        this.FormData.emit(this.legalRepresentatives());
    }

    delete(index: number) {
        this.selectForDelete.set(index);
        this.swal.alertSimpleConfirm('¿Estas seguro de eliminar este registro?').then((result: any) => {
            if (result.isConfirmed) {
                this.legalRepresentatives.update(x => x.filter((y: any, i: number) => i !== index));
                this.FormData.emit(this.legalRepresentatives());
            } else {
                this.selectForDelete.set(-1);
            }
        });
    }

    watchEventForm() {
        this.loca$.watchEventForm.subscribe(data => {
            if (data === 'reset') this.cleanList();
        });
    }
}
