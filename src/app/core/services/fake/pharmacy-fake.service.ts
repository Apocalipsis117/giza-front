import { Injectable } from '@angular/core';
import items from '@local-data/fakes/items-pharmacy.json';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PharmacyFakeService {

    constructor() {}

    get items() {
        return of(items)
    }
}
