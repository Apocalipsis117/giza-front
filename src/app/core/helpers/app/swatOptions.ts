import { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

export const swalOptions: SwalOptions = {
    confirmAction: (text: string = '') => ({
        text,
        toast: true,
        icon: 'warning',
        position: 'top',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: '<i class="icofont-check"></i> Confirmar',
        confirmButtonColor: '#FF6E6E',
        cancelButtonColor: '#C0C0C0'
    }),
    actionAlert: (text: string = '', icon: SweetAlertIcon = 'success') => ({
        text,
        icon,
        toast: true,
        position: 'top',
        showCloseButton: true,
        showConfirmButton: false,
        timer: 3500
    })
}

export const swalMessage = {
    closeView: 'Seguro que quiere salir de esta vista',
    deleteItemAction: 'Confirmar eliminacion',
    saveSuccess: 'Registro creado exitosamente',
    saveError: 'Error al guardar registro',
    formInvalid: 'Formulario incorrecto'
}

interface SwalOptions {
    confirmAction(text: string): SweetAlertOptions;
    actionAlert(text: string, icon?: SweetAlertIcon): SweetAlertOptions;
}