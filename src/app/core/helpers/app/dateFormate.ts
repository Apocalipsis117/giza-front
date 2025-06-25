
export const dateFormate = {
    dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    getDatetime(dateInput: null | string | Date = null) {
        const date = this.isDate(dateInput);

        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth();
        const monthName = this.monthNames[date.getMonth()];
        const dayNames = this.dayNames[date.getDay()-1];
        const seconds = date.getSeconds();
        const fomatDate =  `${year}-${this.addCero(month+1)}-${this.addCero(day)}`;
        const fomatTime =  `${this.addCero(hour)}:${this.addCero(minutes)}`;
        const fomatDatetime =  `${fomatDate} ${fomatTime}`;

        const resp = {
            year,
            month,
            monthName,
            day,
            dayNames,
            hour,
            minutes,
            seconds,
            fomatDate,
            fomatTime,
            fomatDatetime
        };

        return resp;
    },
    addCero: (num: any) => num < 10 ? '0' + num : num,
    isDate: (verify: any) => verify ? new Date(verify) : new Date()
}
