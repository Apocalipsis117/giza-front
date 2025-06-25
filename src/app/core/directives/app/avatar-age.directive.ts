import { Directive, ElementRef, inject, input } from '@angular/core';
import { queryData } from '@helpers/index';

@Directive({
    standalone: false,
    selector: '[appAvatarAge]'
})
export class AvatarAgeDirective {
    private readonly elRef = inject(ElementRef);
    public age = input<number>(0);
    public gender = input<'f' | 'm' | undefined | string>(undefined);

    ngAfterViewInit(): void {
        const el = this.elRef?.nativeElement as HTMLElement;
        el.setAttribute('src', this.obtenerAvatar());
    }
    obtenerAvatar() {
        return queryData.avatar(this.age(), this.gender())
    }

}
