import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDisplayPipe } from './get/get-display.pipe';
import { AgeByDatePipe } from './date/age-by-date.pipe';
import { TrSelectedPipe } from './ui/tr-selected.pipe';
import { GetColorIndexPipe } from './get/get-color-index.pipe';

const shared = [
    GetDisplayPipe,
    AgeByDatePipe,
    TrSelectedPipe,
    GetColorIndexPipe
];

@NgModule({
    declarations: [
        ...shared
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ...shared
    ]
})
export class PipesModule {}
