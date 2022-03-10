export default function formatTime(date) {
    let time = new Date(date);

    const hours = time.getHours();
    const mins = time.getMinutes();
    let meridiem = hours < 12 ? "AM" : "PM";

    let timeString = (String(hours % 12).padStart(2, '0') === "00" ? "12" : String(hours % 12).padStart(2, '0')) + ":" + String(mins).padStart(2, '0') + " " + meridiem;

    return timeString;
}

export const timeFormatter = (timestamp) => {

};