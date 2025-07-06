## Add

agregar columna color a activity vehicle
esto para darle color a los badged


# idea para vistas y accesos

si el usuario es odontologo

su vista asociadas a odontologia se habilitan
pero para saber que puede hacer en esas vistas se guarda lo siguiente
un json con los tipos de acceso ['read', 'delete', 'create', ...] depende que tenga podra acceder

```yml
read: leer datos
write: crear o modificar datos
delete: remover o eliminar datos
update: actualizar información existente
fileRead: puede leer archivos
fileWrite: puede crear o modificar archivos
fileDelete: puede eliminar archivos
download: descargar archivos o recursos
upload: subir archivos al sistema
list: listar elementos o recursos
search: buscar información en el sistema
view: visualizar detalles de un elemento
edit: editar información o configuraciones
approve: aprobar solicitudes o cambios
reject: rechazar solicitudes o cambios
archive: archivar elementos
restore: restaurar elementos archivados o eliminados
share: compartir recursos con otros usuarios
comment: agregar comentarios
like: marcar como favorito o dar “me gusta”
dislike: marcar como “no me gusta”
assign: asignar tareas o recursos a usuarios
unassign: desasignar tareas o recursos
invite: invitar usuarios al sistema
removeUser: eliminar usuarios del sistema
grantPermission: otorgar permisos a otros usuarios
revokePermission: revocar permisos otorgados
configure: cambiar configuraciones del sistema
resetPassword: restablecer la contraseña
viewLogs: ver registros o logs de actividad
export: exportar datos o informes
import: importar datos o información
subscribe: suscribirse a notificaciones o servicios
unsubscribe: cancelar suscripción
report: reportar problemas o contenido
flag: marcar contenido para revisión
print: imprimir documentos o reportes
signin: iniciar sesión
signout: cerrar sesión
profileEdit: editar el perfil de usuario
profileView: ver perfil propio o de otros
notify: recibir notificaciones
mute: silenciar notificaciones
unmute: reactivar notificaciones
favorite: agregar a favoritos
unfavorite: quitar de favoritos
```

```yml
view-auth:
  - read
  - view
  - list
  - search
  - profileView

edit-auth:
  - write
  - update
  - edit
  - approve
  - reject
  - configure
  - resetPassword
  - profileEdit

file-management:
  - fileRead
  - fileWrite
  - fileDelete
  - download
  - upload

permissions:
  - grantPermission
  - revokePermission
  - assign
  - unassign
  - invite
  - removeUser

notifications:
  - notify
  - subscribe
  - unsubscribe
  - mute
  - unmute

content-interaction:
  - comment
  - like
  - dislike
  - favorite
  - unfavorite
  - share
  - flag
  - report

data-management:
  - delete
  - archive
  - restore
  - export
  - import
  - print

session:
  - signin
  - signout
```

- en la tabla de su roll como empleado se agrega varias colimnas
    - view-auth, file-auth,