import { computed, signal, WritableSignal } from '@angular/core';

type IndexKey<T> = keyof T;

interface CrudConfig<T> {
    index?: IndexKey<T>;
    onEdit?: (values: T) => void;
    onCancel?: () => void;
    onAdd?: (item: T) => void;
    onDelete?: (key: any) => void;
    onUpdate?: (item: T) => void;
    onComplete?: () => void;
    onError?: (error: string, context?: any) => void;
}

export class ArraySignalCrud<T extends Record<string, any>> {
    private items: WritableSignal<T[]>;
    private config: CrudConfig<T>;
    private editingIndex = signal<number | null>(null);

    formData = signal<Partial<T>>({});

    constructor(items: WritableSignal<T[]>, config: CrudConfig<T> = {}) {
        this.items = items;
        this.config = config;
    }

    isEditing = computed(() => this.editingIndex() !== null);

    current = computed(() => {
        const idx = this.editingIndex();
        return idx !== null ? this.items()[ idx ] ?? null : null;
    });

    add(data: Omit<T, IndexKey<T>>) {
        try {
            const newItem = { ...(data as T) };
            this.items.update(arr => [ ...arr, newItem ]);
            this.config.onAdd?.(newItem);
            this.config.onComplete?.();
        } catch (e) {
            this.config.onError?.('Error al agregar', e);
        }
    }

    edit(item: T) {
        try {
            const arr = this.items();
            let index = -1;

            if (this.config.index) {
                const key = this.config.index;
                index = arr.findIndex(el => el[ key ] === item[ key ]);
            } else {
                index = arr.indexOf(item);
            }

            if (index === -1) {
                this.config.onError?.('Elemento a editar no encontrado', item);
                return;
            }

            this.editingIndex.set(index);
            this.formData.set({ ...item });
            this.config.onEdit?.(item);
            this.config.onComplete?.();
        } catch (e) {
            this.config.onError?.('Error en edición', e);
        }
    }

    update(partial: Partial<T>) {
        try {
            const idx = this.editingIndex();
            if (idx === null) {
                this.config.onError?.('No hay elemento en edición para actualizar');
                return;
            }

            this.items.update(arr => {
                const updated = { ...arr[ idx ], ...partial };
                const copy = [ ...arr ];
                copy[ idx ] = updated;
                this.config.onUpdate?.(updated);
                return copy;
            });

            this.cancel(); // ← onComplete se lanza desde cancel()
        } catch (e) {
            this.config.onError?.('Error al actualizar', e);
        }
    }

    delete(keyOrIndex: any) {
        try {
            const arr = this.items();
            let index = -1;

            if (this.config.index) {
                index = arr.findIndex(el => el[ this.config.index! ] === keyOrIndex);
            } else if (typeof keyOrIndex === 'number') {
                index = keyOrIndex;
            }

            if (index === -1) {
                this.config.onError?.('Elemento a eliminar no encontrado', keyOrIndex);
                return;
            }

            this.items.update(list => list.filter((_, i) => i !== index));

            if (this.editingIndex() === index) {
                this.cancel(); // ← onComplete se lanza desde cancel()
            } else {
                this.config.onDelete?.(keyOrIndex);
                this.config.onComplete?.();
            }
        } catch (e) {
            this.config.onError?.('Error al eliminar', e);
        }
    }

    cancel() {
        try {
            this.editingIndex.set(null);
            this.formData.set({});
            this.config.onCancel?.();
            this.config.onComplete?.();
        } catch (e) {
            this.config.onError?.('Error al cancelar edición', e);
        }
    }

    reset() {
        try {
            this.items.set([]);
            this.cancel(); // ← onComplete se lanza desde cancel()
        } catch (e) {
            this.config.onError?.('Error al resetear', e);
        }
    }

    set(items: T[]) {
        try {
            this.items.set(items);
            this.config.onComplete?.();
        } catch (e) {
            this.config.onError?.('Error al establecer items', e);
        }
    }

    patch(data: Partial<T>) {
        try {
            this.formData.set({ ...this.formData(), ...data });
        } catch (e) {
            this.config.onError?.('Error al aplicar patch', e);
        }
    }

    getAll(): T[] {
        return this.items();
    }

    getCurrent(): T | null {
        return this.current();
    }

    getIndexValue(): number | null {
        return this.editingIndex();
    }
}
