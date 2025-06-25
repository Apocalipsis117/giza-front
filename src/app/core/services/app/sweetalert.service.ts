import { Injectable } from '@angular/core';
import { swalOptions } from '@helpers/index';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetalertService {

    alertSimpleConfirm(message: string) {
        return Swal.fire(swalOptions.confirmAction(message));
    }

    alertSimple(message: string, icon: SweetAlertIcon = 'success') {
        Swal.fire(swalOptions.actionAlert(message, icon));
    }

    loading(dataIn: { title?: string, html?: string } | null = null) {
        const data = {
            title: 'Cargando...',
            html: 'Espere mientras se cargan los datos...',
            ...dataIn
        };
        Swal.fire({
            title: data.title,
            html: data.html,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    close() {
        Swal.close();
    }

    formSave(type: 'success' | 'error' | 'warning' = 'success') {
        const message = {
            success: '¡Guardado!',
            error: '¡Error al guardar!',
            warning: '¡Formulario invalido!'
        }
        this.alertSimple(message[type], type);
    }
}
