
const els = document.querySelectorAll('.icon-holder')
const clientEvent = {
    copyTextContent(text) {
        const clipboard = navigator.clipboard;

        clipboard.writeText(text).then(() => {
            console.log('copied');
            const timeOut = setTimeout(() => {
                console.log('copied end');
                clearTimeout(timeOut)
            }, 1500)
        })
        .catch(err => {
            console.error('Error al copiar el texto:', err);
        });
    }
}
els.forEach(item => {
    const copy = item.querySelector('i').getAttribute('class');
    item.addEventListener('click', () => {
        clientEvent.copyTextContent(copy)
    })
})