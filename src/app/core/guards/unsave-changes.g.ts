interface CanComponentDeactivate {
    canGoOut: () => boolean | Promise<boolean>;
}

export function UnsavedChangesGuard(component: CanComponentDeactivate): boolean | Promise<boolean> {
    return component.canGoOut ? component.canGoOut() : true;
}