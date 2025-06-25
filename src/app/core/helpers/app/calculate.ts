export const calcutate = {
    calcularEdad(date: any) {
        var cumple_arr = date.split("-");
        var cumple_date = new Date(cumple_arr[0], cumple_arr[1] - 1, cumple_arr[2]);
        var ageDifMs = Date.now() - cumple_date.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}