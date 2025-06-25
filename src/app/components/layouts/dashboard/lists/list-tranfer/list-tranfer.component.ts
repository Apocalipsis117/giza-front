import { Component, Input, computed, input, signal } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'list-tranfer',
    standalone: true,
    imports: [CommonModule, NgTemplateOutlet],
    templateUrl: './list-tranfer.component.html'
})
export class ListTranferComponent {
    public readonly setLabel = input<string>('');
    services = signal<any[]>([
        {
            id: 1,
            select: false,
            active: false,
            display: 'Servicio uno'
        },
        {
            id: 2,
            select: false,
            active: false,
            display: 'Servicio dos'
        },
        {
            id: 3,
            select: false,
            active: false,
            display: 'Servicio tres'
        },
        {
            id: 4,
            select: false,
            active: true,
            display: 'Servicio cuatro'
        },
        {
            id: 5,
            select: false,
            active: false,
            display: 'Servicio cinco'
        },
        {
            id: 6,
            select: false,
            active: false,
            display: 'Servicio seis'
        },
        {
            id: 7,
            select: false,
            active: false,
            display: 'Servicio siete'
        },
    ]);

    serviceActives = computed(() => {
        return this.services().filter(item => item.active);
    });

    serviceDisableds = computed(() => {
        return this.services().filter(item => !item.active);
    });

    transfer(id: number) {
        this.services.update(items => [...items.map(item => {
            if (item.id === id) {
                return { ...item, active: !item.active, select: false };
            } else {
                return item;
            }
        })]);
    }

    selectTransfer(id: number) {
        this.services.update(items => [...items.map(item => {
            if (item.id === id) {
                return { ...item, select: !item.select };
            } else {
                return item;
            }
        })]);
    }

    addSelects(status: boolean) {
        this.services.update(items => [...items.map(item => {
            if (item.select) {
                return { ...item, active: status, select: false };
            } else {
                return item;
            }
        })]);
    }

    addAll(status: boolean) {
        this.services.update(items => [...items.map(item => ({ ...item, active: status, select: false }))]);
    }
}
