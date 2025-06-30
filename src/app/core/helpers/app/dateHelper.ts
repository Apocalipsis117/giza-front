export const dateHelper = {
    dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    getDateMonth(year: number, mes: number) {
        const primerDia = new Date(year, mes - 1, 1);
        const ultimoDia = new Date(year, mes, 0);

        const numeroDias = ultimoDia.getDate();
        const diaSemanaInicio = primerDia.getDay();
        const diaSemanaFin = ultimoDia.getDay();

        return {
            numeroDias,
            diaSemanaInicio,
            diaSemanaFin
        };
    },
    getMonth(setDate: string | Date) {
        const date = this.isDate(setDate);
        const month = date.getMonth();
        return {
            index: month,
            month: this.addCero(month),
        };
    },
    getDate(setDate: string | Date) {
        const date = this.isDate(setDate);
        const day = date.getDate();
        return {
            index: day,
            day: this.addCero(day),
        };
    },
    isWithinRange(dateStart: string | Date, dateEnd: string | Date, date: number): boolean {
        const startDate = this.isDate(dateStart);
        const endDate = this.isDate(dateEnd);
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        return date >= startDay && date <= endDay;
    },
    getDayPosition(dateStart: string | Date, dateEnd: string | Date, date: number): 'start' | 'center' | 'end' | 'only' | null {
        const startDate = this.isDate(dateStart);
        const endDate = this.isDate(dateEnd);
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();

        if (date === startDay && date === endDay) {
            return 'only';
        } else if (date === startDay) {
            return 'start';
        } else if (date > startDay && date < endDay) {
            return 'center';
        } else if (date === endDay) {
            return 'end';
        }
        return null;
    },
    getDataOfDate(dateInput: null | string | Date = null) {
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
    addCero: (num: number) => num < 10 ? '0' + num : num,
    isDate: (verify?: string | number | Date | null) => verify ? new Date(verify) : new Date()
};