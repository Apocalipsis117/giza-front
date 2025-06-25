import { Injectable } from '@angular/core';
import { DataAuditApp } from '@interfaces/index';
import data from '@local-data/app/audit-data.json';

@Injectable({
  providedIn: 'root'
})
export class NewAuditService {
    get menuside(): DataAuditApp {
        return data.data;
    }
}
