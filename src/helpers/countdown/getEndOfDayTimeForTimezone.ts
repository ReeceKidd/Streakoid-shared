import { tz } from 'moment-timezone';

export const getEndOfDayTimeForTimezone = (timezone: string) => {
    return tz(timezone)
        .endOf('day')
        .toDate();
};
