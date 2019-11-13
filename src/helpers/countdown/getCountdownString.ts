import { getCountdownTime } from './getCountdownTime';

export const getCountdownString = (timezone: string) => {
    const { hoursDifference, minutesDifference } = getCountdownTime(timezone);

    let timeString = '';

    if (hoursDifference > 1) {
        timeString += `${hoursDifference} hours`;
    } else {
        timeString += `${hoursDifference} hour`;
    }

    timeString += ` and `;

    if (minutesDifference > 1) {
        timeString += `${minutesDifference} minutes`;
    } else {
        timeString += `${minutesDifference} minute`;
    }

    return timeString;
};
