import { getEndOfDayTimeForTimezone } from './getEndOfDayTimeForTimezone';
import { getCurrentTimeForTimezone } from './getCurrentTimeForTimezone';
import { getMillisecondsTillEndOfDay } from './getMillisecondsTillEndOfDay';
import { getHoursTillEndOfDayForTimezone } from './getHoursTillEndOfDayForTimezone';
import { getMinutesTillEndOfDayForTimezone } from './getMinutesTillEndOfDayForTimezone';
import { getFormattedHoursAndMinutes } from './getFormattedHoursAndMinutes';

export const getCountdownTime = (timezone: string) => {
    const endOfDay = getEndOfDayTimeForTimezone(timezone);
    const currentTime = getCurrentTimeForTimezone(timezone);
    const millisecondsTillEndOfDay = getMillisecondsTillEndOfDay({ endOfDay, currentTime });
    const hoursTillEndOfDay = getHoursTillEndOfDayForTimezone(millisecondsTillEndOfDay);
    const minutesTillEndOfDay = getMinutesTillEndOfDayForTimezone(millisecondsTillEndOfDay);
    const { hoursDifference, minutesDifference } = getFormattedHoursAndMinutes({
        hoursTillEndOfDay,
        minutesTillEndOfDay,
    });
    const oneHour = 60;
    return {
        hoursDifference,
        minutesDifference: minutesDifference === oneHour ? minutesDifference - 1 : minutesDifference,
    };
};
