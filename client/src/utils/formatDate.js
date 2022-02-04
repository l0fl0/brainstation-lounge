function formatTime(date) {
    let time = new Date(date);

    const hours = time.getHours();
    const mins = time.getMinutes();

    let timeString = String(hours % 12).padStart(2, '0') + ":" + String(mins).padStart(2, '0');

    return timeString;
}

export default formatTime