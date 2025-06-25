import { CommonModule } from '@angular/common';
import { Component, computed, output, signal } from '@angular/core';
import { generator } from '@helpers/index';
import { FilesOutput } from '@interfaces/index';
import { ProgressBarComponent } from '@layouts/shared/progress-bar/progress-bar.component';

@Component({
    selector: 'input-panel-img',
    standalone: true,
    imports: [CommonModule, ProgressBarComponent],
    templateUrl: './input-panel-img.component.html'
})
export class InputPanelImgComponent {
    files = output<FilesOutput[]>();
    saveFiles = signal<FilesOutput[]>([]);
    porcentLoad = signal<number>(0);
    visibleLoad = signal<boolean>(false);
    id = generator.uuid('checkinline');
    fileValid = ['png', 'jpg', 'bmp', 'gif', 'jpeg'];

    getFiles($event: any) {
        let file = $event.target.files[0];
        this.visibleLoad.set(true);
        let typeFile = file.type ? file.type.split('/') : [];
        let isValid = this.fileValid.some(s => s === typeFile[1]);
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.addEventListener('progress', (e: any) => this.calculatePorcentage(e));
        fileReader.addEventListener('loadend', (e: any) => {
            if (isValid) {
                let base64 = e.target.result;
                this.saveFiles.update(items => [...items, { file, base64 }]);
                $event.target.value = '';
            }
            this.hiddeLoad();
            this.emit();
        });
    }

    calculatePorcentage(e: any) {
        this.porcentLoad.set((Number(e.loaded) * 100) / e.total);
    }

    delete(index: number) {
        this.saveFiles.update(items => items.filter((_, index) => index !== index));
        this.emit();
    }

    emit() {
        this.files.emit(this.saveFiles());
    }

    hiddeLoad() {
        this.porcentLoad.set(100);
        setTimeout(() => {
            this.visibleLoad.set(false);
            this.porcentLoad.set(0);
        }, 500);
    }

    clean() {
        this.saveFiles.set([]);
        this.files.emit([]);
    }

    accept = computed(() => '.' + this.fileValid.join(',.'));
}
