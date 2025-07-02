esta es mi interface API

nombre: ___

#### API

```json

```

#### DTO

```json

```

Estructura de interface

```ts
/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface Current_API {
    name: string;
}

export interface /*name*/_DTO extends Current_API {}

export interface /*name*/_API extends Current_API {}

export interface /*name*/_PageResponse extends ResponseAPI<PageAPI<_API>> {}
export interface /*name*/_PageAPI extends PageAPI<_API> {}
export interface /*name*/_ListResponse extends ResponseAPI<_API[]> {}
export interface /*name*/_Response extends ResponseAPI<_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface Current_APP {}

export interface _APP extends Current_APP {}

export interface _APPDTO extends Current_APP {}

export interface _PageAPP extends PageAPI<_APP> {}
```

- Quiero que remplaze ___ por el nombre de la interface que te mencione. example: `_APP` => `NameInterface_APP`
- EL Current_* APP/API son las key compartidas entre `_API/_DTO` | `_APP/_APPDTO`
- Pasa las key en español a ingles y comentalas con su original. example: `name: string; // nombre`