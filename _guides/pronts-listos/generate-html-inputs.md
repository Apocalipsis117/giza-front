tengo la siguiente interface:

```ts
```

estos son los inputs disponibles

```html
<input-text setType="..." /> <!-- text, email -->
<input-number /><!-- numeros -->
<input-date /><!-- fechas -->
<input-select /><!-- id/uud -->
<input-onoff /><!-- checkbox -->
```

para las keys que teminen en: Id/Uiid example: loremId usa el `<input-select>`
solo generame la lista de inputs

que quede asi:

```html
<input-text setLabel="..." formControlName="..." />
```