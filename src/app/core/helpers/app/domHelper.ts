export const domHelper = {
    attrId(text: string) {
        return text ? `#${text}` : text;
    },
    addClassIfAvtive(active: boolean ,classList: string = ''){
        return active ? classList : '';
    },
    isElement(el: HTMLElement | string) {
        const element = typeof el === 'string' ? document.getElementById(el) : el;
        return element as HTMLElement;
    }
}