import { ElementRef } from "@angular/core";

export interface SelectKeyboardNavConfig<T = any> {
    /** Lista de opciones actualmente visibles (filtradas) */
    options: T[];
    /** Índice actualmente seleccionado (referencia reactiva o variable simple) */
    currentIndex: number;
    /** Función para establecer el índice seleccionado */
    setCurrentIndex: (idx: number) => void;
    /** Función para invocar cuando se selecciona una opción */
    onSelect: (option: T) => void;
    /** (Opcional) Si quieres que el índice vuelva a -1 en teclas distintas */
    resetOnOtherKeys?: boolean;
}

export const arrayControlHelper = {
    handleSelectKeyboardNav<T = any>(
        event: KeyboardEvent,
        config: SelectKeyboardNavConfig<T>
    ) {
        const { options, currentIndex, setCurrentIndex, onSelect, resetOnOtherKeys } = config;
        const len = options.length;

        if (event.key === 'ArrowDown') {
            setCurrentIndex(Math.min(currentIndex + 1, len - 1));
            event.preventDefault();
        } else if (event.key === 'ArrowUp') {
            setCurrentIndex(Math.max(currentIndex - 1, 0));
            event.preventDefault();
        } else if (event.key === 'Enter') {
            if (currentIndex >= 0 && currentIndex < len) {
                onSelect(options[currentIndex]);
                event.preventDefault();
            }
        } else if (resetOnOtherKeys) {
            setCurrentIndex(-1);
        }
    },
    autoScroll(idx: number, items: readonly ElementRef<HTMLLIElement>[]) {
        if (idx >= 0 && idx < items.length) {
            items[idx]?.nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }
}