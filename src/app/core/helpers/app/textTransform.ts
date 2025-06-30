export const textTransform = {
    replaceAccent(text: string) {
        let chartReplace = /[áàéèíìóòúùñ]/ig;
        let accent: any = {
            "á":"a",
            "é":"e",
            "í":"i",
            "ó":"o",
            "ú":"u",
            "à":"a",
            "è":"e",
            "ì":"i",
            "ò":"o",
            "ù":"u",
            "ñ":"n"
        }
        return text.replace(chartReplace, (e) => accent[e]);
    }
}