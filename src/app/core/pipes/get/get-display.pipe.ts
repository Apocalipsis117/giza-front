import { Pipe, PipeTransform } from '@angular/core';
import { queryData } from '@helpers/index';
import { DisplayLang, DisplayValues } from '@interfaces/index';

@Pipe({
    standalone: false,
    name: 'getDisplay'
})
export class GetDisplayPipe implements PipeTransform {

    transform(display: DisplayLang[], value: DisplayValues): DisplayLang {
        return queryData.getLangValue(display, {
            key: value,
            lang: 'es'
        });
    }

}
