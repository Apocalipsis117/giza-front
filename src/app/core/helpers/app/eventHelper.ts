export const eventHelper = {
    handleClick(event: any, setOptions: OptionsHandleClick | null = null) {
        const options: OptionsHandleClick = {
            closest: null,
            ...setOptions
        }
        const target = options.closest ? event.target.closest(options.closest) : event.target;
        const el = target as HTMLElement;

        // Tamaño del elemento
        const width = el.offsetWidth;
        const height = el.offsetHeight;

        // Coordenadas del clic dentro del elemento
        const clickX = event.offsetX;
        const clickY = event.offsetY;

        // Bounding box del elemento respecto al viewport
        const rect = el.getBoundingClientRect();
        const distanceFromViewportTop = rect.top;    // Distancia desde el viewport hasta el borde superior del elemento
        const distanceFromViewportLeft = rect.left;  // Distancia desde el viewport hasta el borde izquierdo del elemento

        // Coordenadas globales del clic en la página
        const pageX = event.pageX;
        const pageY = event.pageY;

        // Coordenadas del clic en la ventana (viewport)
        const clientX = event.clientX;
        const clientY = event.clientY;

        // Desplazamiento de scroll de la ventana
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        const relativeX = clientX - distanceFromViewportLeft;
        const relativeY = clientY - distanceFromViewportTop;

        // Devuelve un objeto con todos los valores calculados
        return {
            tag: target.tagName,
            elementSize: { width, height },
            clickPosition: { x: clickX, y: clickY },
            viewportPosition: { top: distanceFromViewportTop, left: distanceFromViewportLeft },
            globalClickPosition: { x: pageX, y: pageY },
            viewportClickPosition: { clientX, clientY },
            scrollOffset: { x: scrollX, y: scrollY },
            relativePosition: { x: relativeX, y: relativeY }
        };
    }
}

interface OptionsHandleClick {
    closest?: string | null;
}