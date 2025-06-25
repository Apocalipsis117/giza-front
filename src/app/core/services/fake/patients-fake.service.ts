import { Injectable } from '@angular/core';
import data from '@local-data/fakes/patients.json';
import { ModelPatientsApp } from '@models/index';
import { map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientsFakeService {

    constructor() {}

    get items() {
        return of(data).pipe(map(data => ModelPatientsApp.setProperty(data.data.pacientes)));
    }
}
