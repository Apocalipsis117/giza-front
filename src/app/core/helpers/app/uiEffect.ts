export const uiEffect = {
    bumbble(el: any, setOptions: OptionsBumbble | null = null) {
        const options = {
            duration: setOptions?.duration || 500,
            sizeEnd: setOptions?.sizeEnd || 50,
            posX: setOptions?.posX || 0,
            posY: setOptions?.posY || 0
        }
        // span
        let span = document.createElement('span');
        span.classList.add('im-effect-bumbble');
        span.style.setProperty('--im-bumbble-position-x', `${options.posX}px`);
        span.style.setProperty('--im-bumbble-position-y', `${options.posY}px`);
        el.append(span);

        // Animación de crecimiento
        const anim = setTimeout(() => {
            span.style.setProperty('--im-bumbble-size', `${options.sizeEnd * 1.5}px`);
            clearTimeout(anim)
        }, 20);

        // animación opacity
        const apacity = setTimeout(() => {
            span.style.setProperty('--im-bumbble-opacity', '0');
            clearTimeout(apacity)
        }, options.duration - (options.duration / 2));

        // Eliminar el span
        const remove = setTimeout(() => {
            span.remove();
            clearTimeout(remove)
        }, options.duration);
    }
}

interface OptionsBumbble {
    posX?: number;
    posY?: number;
    sizeEnd?: number;
    duration?: number;
}