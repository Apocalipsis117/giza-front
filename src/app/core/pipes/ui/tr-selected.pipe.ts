import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: false,
    name: 'trSelected'
})
export class TrSelectedPipe implements PipeTransform {

    transform(id: number, idx: number): string {
        if (idx === id) {
            return 'bg-default-200';
        } else {
            return '';
        }
    }

}
