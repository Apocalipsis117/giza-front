import { Component, ElementRef, Input, ViewChild, computed, input, output } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { BtnToggle, UiSize } from '@interfaces/index';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [DirectivesModule],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @ViewChild('button') button!: ElementRef;
    public action = output<any>();
    public setIcon = input<string>('');
    public full = input<boolean>(false);
    public setTitle = input<string>('');
    public setSize = input<UiSize>(null);
    public setActive = input<boolean>(false);
    public setColor = input<'yellow' | 'blue' | 'red' | 'gray' | 'green' | null>(null);
    public ui = input<'outline' | 'gentle' | 'outlight' | 'sweet' | null>(null);
    @Input() setAction: string = 'click';
    @Input() isDisabled: boolean = false;
    @Input() setType: 'button' | 'submit' | 'reset' = 'button';
    @Input() idConnect: string = '';
    @Input() setRole: BtnToggle = null;
    @Input() formConnect: string | null = null;

    color = computed(() => {
        const ui = this.ui() ? `-${this.ui()}` : '';
        const color = this.setColor() ? `-${this.setColor()}` : '-default';
        return 'btn' + ui + color;
    })

    active = computed(() => this.setActive() ? 'active' : '')
    buttonSize = computed(() => this.setSize() ? `btn-${this.setSize()}` : '')
    marginIconText = computed(() => this.setIcon() && this.setTitle() ? 'ml-3' : '')
    width = computed(() => this.full() ? 'w-full' : '')

    ngAfterViewInit(): void {
        if (this.formConnect && this.setType === 'submit') {
            const btn = this.button.nativeElement as HTMLButtonElement;
            btn.setAttribute('form', this.formConnect);
        }
    }

    emit() {
        this.action.emit(this.setAction)
    }
}


