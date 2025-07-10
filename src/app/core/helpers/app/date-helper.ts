export type DateFormatNames = 'dayMonthYear' | 'fullWithDay' | 'isoLike' | 'slashDate' | 'exportExcel' | 'reportStyle' | 'compact' | 'textWithComma' | 'default';

export interface FormatOptions {
    formate?: DateFormatNames;
    hour?: boolean;
    cutDay?: boolean;
    cutMonth?: boolean;
}

export class DateHelper {
    private dateMain: Date;
    private dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    private monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    private cutName = 3;

    constructor(date: string | number | Date | null = null) {
        this.dateMain = this.isDate(date);
    }

    formatDate(setOptions: FormatOptions = {}): string {
        const date = this.dateMain;

        const options = {
            formate: setOptions.formate ?? 'default',
            hour: setOptions.hour ?? false,
            cutDay: setOptions.cutDay ?? false,
            cutMonth: setOptions.cutMonth ?? false,
        };

        const dd = date.getDate();
        const nd = this.dayNames[date.getDay()];
        const mm = this.monthNames[date.getMonth()];
        const yy = date.getFullYear();

        const _mm = options.cutMonth ? mm.substring(0, this.cutName) : mm;
        const _nd = options.cutDay ? nd.substring(0, this.cutName) : nd;

        let ff: string;
        switch (options.formate) {
            case 'dayMonthYear': // Ej: 17 de Diciembre 1995
                ff = `${dd} de ${_mm} ${yy}`;
                break;

            case 'fullWithDay': // Ej: Lunes 17 de Diciembre 1995
                ff = `${_nd} ${dd} de ${_mm} ${yy}`;
                break;

            case 'isoLike': // Ej: 1995-12-17 (ISO-like, con nombre de mes)
                ff = `${yy}-${this.addCero(date.getMonth() + 1)}-${this.addCero(dd)}`;
                break;

            case 'slashDate': // Ej: 17/12/1995
                ff = `${this.addCero(dd)}/${this.addCero(date.getMonth() + 1)}/${yy}`;
                break;

            case 'exportExcel': // Ej: 17-Dec-1995
                ff = `${this.addCero(dd)}-${_mm.substring(0, 3)}-${yy}`;
                break;

            case 'reportStyle': // Ej: 17 Dic 1995
                ff = `${dd} ${_mm.substring(0, 3)} ${yy}`;
                break;

            case 'compact': // Ej: 17121995
                ff = `${this.addCero(dd)}${this.addCero(date.getMonth() + 1)}${yy}`;
                break;

            case 'textWithComma': // Ej: Diciembre 17, 1995
                ff = `${_mm} ${dd}, ${yy}`;
                break;

            default: // fallback por si no se especifica uno válido
                ff = `${dd}-${_mm}-${yy}`;
                break;
        }

        const hour = options.hour ? ` a las ${this.addCero(date.getHours())}:${this.addCero(date.getMinutes())}` : '';
        return ff + hour;
    }

    formatDivider(divider: string = '-'): string {
        const date = this.dateMain;
        const mm = this.addCero(date.getMonth() + 1);
        const dd = this.addCero(date.getDate());
        return `${date.getFullYear()}${divider}${mm}${divider}${dd}`;
    }

    // ========== MÉTODOS ORIGINALES CONSERVADOS ==========

    get getDateMonth() {
        const date = this.dateMain;
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);

        const days = lastDate.getDate();
        const weekDayStart = firstDate.getDay();
        const weekDayEnd = lastDate.getDay();
        const remainingDays = days - date.getDate();
        const calendarIndex = month + 1;

        return {
            days,
            weekDayStart,
            weekDayStartName: this.dayNames[weekDayStart],
            weekDayEnd,
            weekDayEndName: this.dayNames[weekDayEnd],
            remainingDays,
            currentDay: date.getDate(),
            monthIndex: month,
            calendarIndex,
            month: this.addCero(calendarIndex),
            monthName: this.getMonthName(),
            weeksInMonth: Math.ceil((weekDayStart + days) / 7),
            daysArray: Array.from({ length: days }, (_, i) => i + 1)
        };
    }

    getMonthName(date?: Date | null): string {
        const d = date ? date : this.dateMain;
        return this.monthNames[d.getMonth()];
    }

    get getDate() {
        const day = this.dateMain.getDate();
        return {
            index: day,
            day: this.addCero(day)
        };
    }

    isWithinRange(options: { dateEnd: string | Date, date: number }): boolean {
        const endDate = this.isDate(options.dateEnd);
        const startDay = this.dateMain.getDate();
        const endDay = endDate.getDate();
        return options.date >= startDay && options.date <= endDay;
    }

    getDayPosition(dateEnd: string | Date, date: number): 'start' | 'center' | 'end' | 'only' | null {
        const endDate = this.isDate(dateEnd);
        const startDay = this.dateMain.getDate();
        const endDay = endDate.getDate();

        if (date === startDay && date === endDay) return 'only';
        if (date === startDay) return 'start';
        if (date > startDay && date < endDay) return 'center';
        if (date === endDay) return 'end';
        return null;
    }

    get getDataOfDate() {
        const year = this.dateMain.getFullYear();
        const hour = this.dateMain.getHours();
        const minutes = this.dateMain.getMinutes();
        const day = this.dateMain.getDate();
        const month = this.dateMain.getMonth();
        const monthName = this.monthNames[month];
        const dayNames = this.dayNames[this.dateMain.getDay()];
        const seconds = this.dateMain.getSeconds();

        const fomatDate = `${year}-${this.addCero(month + 1)}-${this.addCero(day)}`;
        const fomatTime = `${this.addCero(hour)}:${this.addCero(minutes)}`;
        const fomatDatetime = `${fomatDate} ${fomatTime}`;

        return {
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
    }

    private isDate(verify?: string | number | Date | null): Date {
        if (!verify) return new Date();

        if (verify instanceof Date) return verify;

        if (typeof verify === 'number') return new Date(verify);

        if (typeof verify === 'string') {
            const dmyMatch = verify.match(/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/);
            if (dmyMatch) {
                const [_, day, month, year] = dmyMatch;
                return new Date(Number(year), Number(month) - 1, Number(day));
            }

            const ymdMatch = verify.match(/^(\d{4})[\/\-](\d{2})[\/\-](\d{2})$/);
            if (ymdMatch) {
                const [_, year, month, day] = ymdMatch;
                return new Date(Number(year), Number(month) - 1, Number(day));
            }

            const parsed = new Date(verify);
            if (!isNaN(parsed.getTime())) return parsed;
        }

        return new Date();
    }

    private addCero = (num: number) => num < 10 ? '0' + num : num;

    private isLeapYear(date: Date | null = null): boolean {
        const d = this.isDate(date);
        const year = d.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
}
