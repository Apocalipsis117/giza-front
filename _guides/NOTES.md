# name para interface

Queso_DTO
--
name para grupo DTO __(grupo json)__ a enviar al backend
ej:

```ts
interface QuesoDTO {
    name: string;
}
interface YucaDTO {
    name: string;
}

// post api
interface Queso_DTO {
    queso: QuesoDTO;
    yuca: YucaDTO;
}
```

QuesoDTO
--
name DTO para objetos que no son grupos a enviar
ej:

```ts
// post api
interface QuesoDTO {
    name: string;
}
```

Queso_APP
--
interface pertenecientes a la app
Queso_API __@return__ Queso_APP <!-- interface de entrada a interface de salida -->


## Queso_APP __@return__ Queso_DTO / QuesoDTO