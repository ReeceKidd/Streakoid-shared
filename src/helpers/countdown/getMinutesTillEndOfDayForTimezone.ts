export const getMinutesTillEndOfDayForTimezone = (millisecondsUntilEndOfDay: number) => {
    return Math.round(((millisecondsUntilEndOfDay % 86400000) % 3600000) / 60000);
};
