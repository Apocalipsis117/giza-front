import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrSelectedDirective } from './app/tr-selected.directive';
import { ColorStatusToogleDirective } from './app/color-status-toogle.directive';
import { BtnBsToggleDirective } from './bootstrap/btn-bsToggle.directive';
import { AvatarAgeDirective } from './app/avatar-age.directive';
import { BsCollapseBtnDirective } from './bootstrap/bs-collapse-btn.directive';
import { BsCollapseContentDirective } from './bootstrap/bs-collapse-content.directive';
import { BsOffcanvasBtnDirective } from './bootstrap/bs-offcanvas-btn.directive';
import { BsTabBtnDirective } from './bootstrap/bs-tab-btn.directive';
import { BsTabContentDirective } from './bootstrap/bs-tab-content.directive';
import { EffectBumbbleDirective } from './implement/effect-bumbble.directive';

const shared = [
    ColorStatusToogleDirective,
    TrSelectedDirective,
    BtnBsToggleDirective,
    AvatarAgeDirective,
    BsCollapseBtnDirective,
    BsCollapseContentDirective,
    BsOffcanvasBtnDirective,
    BsTabBtnDirective,
    BsTabContentDirective,
    EffectBumbbleDirective
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
export class DirectivesModule {}
