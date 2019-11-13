export const getFormattedHoursAndMinutes = ({
    hoursTillEndOfDay,
    minutesTillEndOfDay,
}: {
    hoursTillEndOfDay: number;
    minutesTillEndOfDay: number;
}) => {
    if (hoursTillEndOfDay === 60) {
        return {
            hoursDifference: hoursTillEndOfDay += 1,
            minutesDifference: 0,
        };
    }
    return { hoursDifference: hoursTillEndOfDay, minutesDifference: minutesTillEndOfDay };
};
