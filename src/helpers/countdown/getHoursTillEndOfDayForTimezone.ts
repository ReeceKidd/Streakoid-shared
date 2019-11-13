export const getHoursTillEndOfDayForTimezone = (millisecondsUntilEndOfDay: number) => {
    return Math.floor((millisecondsUntilEndOfDay % 86400000) / 3600000);
};
