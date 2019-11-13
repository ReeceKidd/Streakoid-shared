import { tz } from 'moment-timezone';

export const getCurrentTimeForTimezone = (timezone: string) => {
    return tz(timezone)
        .endOf('day')
        .toDate();
};
