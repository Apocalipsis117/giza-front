import { NgClass } from '@angular/common';
import { Component, forwardRef, HostListener, Input, ElementRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';
import { OptionPeopleFormcontrol } from '@interfaces/index';

@Component({
    selector: 'input-panel-select-doctor',
    standalone: true,
    imports: [NgClass, FormsModule],
    templateUrl: './input-panel-select-doctor.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelSelectDoctorComponent),
        multi: true
    }]
})
export class InputPanelSelectDoctorComponent implements ControlValueAccessor {
    private readonly el = inject(ElementRef);
    @Input() setLabel: string = '';
    @Input() options: OptionPeopleFormcontrol[] = [];
    optionsFilters: OptionPeopleFormcontrol[] = [];
    currentValue: number | string = '';
    nameSearch: string = '';
    visible = false;
    idInput: string;
    idContainer: string;
    classDisplayNone = 'hidden';

    constructor() {
        const uuid = generator.uuid('doctor-');
        this.idInput = uuid;
        this.idContainer = uuid + '-xd';
    }

    get valueInput(): OptionPeopleFormcontrol {
        if (this.options.length > 0) {
            const option = this.options.find(option => String(option.value) === String(this.currentValue));
            return option ? option : {
                name: '?',
                avatar: 'assets/img/ui/avatar-f-2.jpeg',
                nid: '---',
                value: -1
            };
        } else {
            return {
                name: 'Vacio',
                avatar: 'assets/img/ui/avatar-f-2.jpeg',
                nid: '---',
                value: -1
            }
        }
    }

    get isVisible() {
        return !this.visible ? this.classDisplayNone : '';
    }

    @HostListener('window:click', ['$event.target']) click(e: any): void {
        if (e.closest('#' + this.idContainer)) {
            (e.closest('#' + this.idInput)) ? this.visible = !this.visible : this.visible = true;
            const el = this.el.nativeElement.querySelector('[name="filter"]');
            const timeOut = setTimeout(() => {
                el.focus();
                clearTimeout(timeOut);
            }, 100)
        } else {
            this.visible = false;
        }
    }
    writeValue(obj: any): void {
        this.currentValue = obj ? obj : '';
    }
    onChange = (_: any) => {};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onTouch = () => {};
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    filter() {
        let search = this.nameSearch.toLowerCase();
        const options = this.options.filter(option => {
            let value = option.name.toLowerCase();
            return value.search(search) > -1;
        })
        if (search != '') {
            this.optionsFilters = options;
        } else {
            this.optionsFilters = [];
        }

    }
    select(value: any) {
        this.clean();
        this.currentValue = value.value;
        this.onChange(this.currentValue);
    }
    clean() {
        this.visible = false;
        this.nameSearch = '';
        this.optionsFilters = [];
    }
}
