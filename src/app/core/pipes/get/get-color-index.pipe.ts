import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: false,
    name: 'getColorIndex'
})
export class GetColorIndexPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }

}
