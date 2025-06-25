import { Pipe, PipeTransform } from '@angular/core';
import { calcutate } from '@helpers/index';

@Pipe({
    standalone: false,
    name: 'ageByDate'
})
export class AgeByDatePipe implements PipeTransform {

    transform(value: unknown): number {
        return calcutate.calcularEdad(value);
    }

}
