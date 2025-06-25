# form-readonly

componente formulario que solo es para leer y no para hacer acciones CRUD

```ts
import { InputReadonlyComponent } from '@form-control/input-readonly/input-readonly.component';

@Component({
    imports: [
        InputReadonlyComponent
    ]
})
export class AppComponent {
    public data = input<any|null>(null);

    value = computed(() => ({
        hasData: this.data() !== null,
        uuid: this.data() ? this.data().uuid : ''
    }))
}
```

```html
<form class="block">
    <div class="d-grid items-end">
        <div class="col-span-3">
            <input-readonly setLabel="Uuid" [setValue]="value().uuid" />
        </div>
    </div>
</form>
```