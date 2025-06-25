import { ItemListApp } from './app.interface';

export interface AuditApp {
    data: DataAuditApp;
}

export interface DataAuditApp {
    menuShortcut: ItemListApp[];
}
