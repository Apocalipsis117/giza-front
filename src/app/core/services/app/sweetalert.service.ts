import { Injectable } from '@angular/core';
import { swalOptions } from '@helpers/index';
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertPosition } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetalertService {
    private assets = {
        btnTextConfirm: '<i class="mir mi-check"></i> Comfirmar',
        btnTextCancel: 'Cancelar',
    }
    private ui: SweetAlertOptions = {
        customClass: {
            container: 'sweetalert-custom',
            title: 'sw-title',
            htmlContainer: 'sw-content',
            confirmButton: 'sw-btn-confirm',
            closeButton: 'sw-btn-close',
            cancelButton: 'sw-btn-cancel',
            popup: 'sw-dialog'
        }
    }

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

    toastConfirm(icon: SweetAlertIcon = 'info', setOptions: SwaOptionsSmall | null = null) {
        const options: SwaOptionsSmall = {
            position: 'top',
            ...setOptions
        }
        return Swal.fire({
            ...options,
            icon,
            showCancelButton: true,
            confirmButtonText: this.assets.btnTextConfirm,
            cancelButtonText: this.assets.btnTextCancel,
            showConfirmButton: true,
            toast: true,
            ...this.ui
        });
    }
}

export interface SwaOptionsSmall {
    title?: string;
    text?: string;
    position?: SweetAlertPosition;
}
export interface SwaOptionsAlert {
    title?: string;
    text?: string;
    position?: SweetAlertPosition;
}
export interface SwaOptionsCheckConfirm {
    title?: string;
    placeholder?: string;
    textInvalid?: string;
}