import { NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { swalMessage } from '@helpers/index';
import { BarActionToolBarActions } from '@interfaces/index';
import { PipesModule } from '@pipes/module';
import { AppMenuService, BarToolControllerService, SweetalertService } from '@services/app';

@Component({
    selector: 'app-bar-tools',
    standalone: true,
    imports: [PipesModule, NgClass],
    templateUrl: './bar-tools.component.html'
})
export class BarToolsComponent implements OnInit {
    private readonly appMenu$ = inject(AppMenuService);
    private readonly swal$ = inject(SweetalertService);
    private readonly barTool$ = inject(BarToolControllerService);
    menuTools = signal<BarActionToolBarActions[]>([])

    ngOnInit(): void {
        const data = this.appMenu$.menuTools();
        this.menuTools.set(data);
    }

    action(action: string) {
        this.barTool$.changeAction(action);
    }

    close() {
        this.swal$.alertSimpleConfirm(swalMessage.closeView).then(data => {
            if (data.isConfirmed) {
                console.log('confirm')
            }
        })
    }
}
