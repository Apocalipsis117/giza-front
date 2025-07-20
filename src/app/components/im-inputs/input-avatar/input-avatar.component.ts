import { Component, computed, ElementRef, input, output, signal, SimpleChanges, viewChild } from '@angular/core';
import { FileReaderHelper } from '@helpers/index';
import { FormControlEncode, FormControlImagen } from '@interfaces/index';
import formatFile from '@local-data/app/format-file.json';

@Component({
    selector: 'input-avatar',
    imports: [],
    templateUrl: './input-avatar.component.html'
})
export class InputAvatarComponent {
    public readonly maxSize = input<number>(0);
    public readonly currentImg = input<string | null>(null);
    public readonly fileEncode = input<FormControlEncode>('base64');
    private inputFile = viewChild<ElementRef>('inputFile');
    public onFile = output<FormControlImagen | null>();
    file = signal<FormControlImagen | null>(null);
    loading = signal<number>(0);
    isCurrentImg = signal<boolean>(false);
    readonly formatesImg = formatFile.formats.img;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentImg']) {
            const currentImg = changes['currentImg'].currentValue;
            const isCurrent = currentImg && currentImg !== '';
            this.isCurrentImg.set(isCurrent)
        }
    }

    changeFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files;
        if (files) this.formatFile(Array.from(files));
    }

    visibility = computed(() => !(this.loading() === 0 || this.loading() === 100))

    accept = computed(() => {
        return this.formatesImg.map((format) => `.${format}`).join(',');
    })

    private formatFile(files: File[]) {
        this.loading.set(0);
        new FileReaderHelper(files, { encode: this.fileEncode() }, {
            progress: (value: number) => {
                this.loading.set(value);
            },
            next: (value) => {
                let formattedFile: FormControlImagen | null = {
                    file: value.file,
                    size: value.size,
                    name: value.name,
                    formate: value.format || ''
                };
                this.file.set(formattedFile);
            },
            complete: () => {
                this.emit();
                this.cleanInput();
                this.loading.set(0);
            },
        });
    }

    emit() {
        this.onFile.emit(this.file());
    }

    remove() {
        this.file.set(null);
        this.cleanInput();
        this.emit();
        if(this.currentImg()) {
            this.isCurrentImg.set(true);
        }
    }

    changeIsCurrentImg(value: boolean) {
        this.isCurrentImg.set(value);
    }

    cleanInput() {
        const el: any = this.inputFile()?.nativeElement;
        el.value = '';
    }
}
