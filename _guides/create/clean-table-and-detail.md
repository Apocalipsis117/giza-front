# Limpiar table y tdetail

Hay sitas en el cual tenemos

`<table-component>` y `<tdetail-component>`

y tenemos que limpiar los detalle y el elemento seleccionado en la tabla. y emitir null y para ello se hace lo siguiente

## agregamos un metodo clean en el componente hijo

```ts
export class tableComponent {
    clean() {
        this.tdSelected.set(-1);
        this.localServ.emit(null);
    }
}
```

## compoente padre
    
```ts
import { ViewChild } from '@angular/core';

export class mainComponent {
    @ViewChild('table') table!: any; // remplaza any por el componente de tabla

    // en tu actionsBar asociado a tdetail agrega : clean: true
    actionsBar: BarActions = {
        clean: true // add this line
    }

    // si estas usando action bar
    barAction(value: ActionName) {
        else if (value === 'clean') this.cleanTdetail();
    }

    cleanTdetail() {
        this.table.clean();
    }
}
```

```html
<table-component #table />

<blade-box-panel (actionBar)="barAction($event)" />
    <tdetail-component />
</blade-box-panel>
```