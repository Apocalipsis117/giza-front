import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ItemListApp } from '@interfaces/index';
import { PipesModule } from '@pipes/module';

@Component({
    selector: 'btns-aside',
    standalone: true,
    imports: [NgClass, PipesModule, DirectivesModule],
    templateUrl: './btns-aside.component.html'
})
export class BtnsAsideComponent {
    public actions = input<ItemListApp[]>([]);
}
