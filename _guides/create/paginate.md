# table paginate

```ts
import { Component, inject, signal } from '@angular/core';
import { queries } from '@helpers/index';

export class MyComponent {
    testServ = inject(TestService);
    data = signal<anyAPP_PAGE | null>(null);

    // primary
    paramPaginate = signal<any>(queries.paramsPage);

    queryTest() {
        this.testServ.getAllPage(this.paramPaginate()).subscribe(data => this.data.set(data))
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryTest();
    }
}
```

```html
<table-component [dataTable]="data()" (paginate)="paginate($event)" />
```

# set data in blade-table

esto permite que el componente blade-table inicie en paginacion

1. en tu componente `<table-component>`  agregaras las siguientes lineas

```ts
dataTable = input<anyAPP_PAGE | null>(null);
paginate = output<any>();

list = computed(() => this.dataTable() ? this.dataTable()!.content : []);
load = computed(() => this.dataTable() ? this.dataTable()!.content.length > 0 : false);
```

```html
<blade-table [paginate]="dataTable()" (controlPaginate)="paginate.emit($event)" [load]="load()">
```