export function twelveHourTime(timestamp, clock) {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let meridiem = hours < 12 ? "AM" : "PM";

    let hourString = `${String(hours % 12).padStart(2, '0') === "00" ? "12" : String(hours % 12).padStart(2, '0')}`;

    if (clock) return `${hourString}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${meridiem}`;

    return `${hourString}:${String(minutes).padStart(2, '0')} ${meridiem}`;
}

export function twentyFourHourTime(timestamp, clock) {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (clock) return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export function getDay(timestamp) {
    const date = new Date(timestamp);
    let day = date.getDay();
    switch (day) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        default:
            day = "Saturday";
    }
    return day;
}