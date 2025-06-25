import { Component, output, signal } from '@angular/core';
import { FilesOutput } from '@interfaces/index';
import { generator } from '@helpers/index';

@Component({
  selector: 'input-panel-img-preview',
  standalone: true,
  imports: [],
  templateUrl: './input-panel-img-preview.component.html'
})
export class InputPanelImgPreviewComponent {
    file = output<FilesOutput | null>();
    visibleLoad = signal(false);
    saveFile = signal<FilesOutput | null>(null);
    porcentLoad = signal(0);
    id: string = generator.uuid('input');
    fileValid = ['png', 'jpg', 'bmp', 'gif', 'jpeg'];

    getFiles($event: any) {
        let file = $event.target.files[0];
        this.visibleLoad.set(true);
        let typeFile = file.type ? file.type.split('/'): [];
        let isValid = this.fileValid.some(s => s === typeFile[1]);
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.addEventListener('progress', (e: any) => this.calculatePorcentage(e));
        fileReader.addEventListener('loadend', (e: any) => {
            if(isValid){
                let base64 = e.target.result;
                this.saveFile.set({ file, base64 });
                $event.target.value = '';
            }
            this.hiddeLoad();
            this.emit();
        });
    }

    calculatePorcentage(e: any){
        this.porcentLoad.set((Number(e.loaded) * 100) / e.total);
    }

    clean(){
        this.saveFile.set(null);
        this.emit();
    }

    emit(){
        this.file.emit(this.saveFile());
    }

    hiddeLoad() {
        this.porcentLoad.set(100);
        setTimeout(()=> {
            this.visibleLoad.set(false);
            this.porcentLoad.set(0);
        }, 500)
    }

    get accept(){
        return '.' + this.fileValid.join(',.');
    }
}
