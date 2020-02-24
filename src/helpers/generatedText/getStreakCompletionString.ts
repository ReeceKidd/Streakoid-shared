import moment from 'moment-timezone';
import { PastStreak, CurrentStreak } from '@streakoid/streakoid-sdk/lib';
export const getStreakCompletionString = ({
    pastStreaks,
    currentStreak,
    timezone,
}: {
    pastStreaks: PastStreak[];
    currentStreak: CurrentStreak;
    timezone: string;
}) => {
    const currentTime = moment().tz(timezone);
    let streakCompletionString;
    let streakCompletionStringError = false;
    if (currentStreak.numberOfDaysInARow > 0) {
        streakCompletionString = `Days in a row: ${currentStreak.numberOfDaysInARow}`;
    }
    if (currentStreak.numberOfDaysInARow === 0) {
        if (pastStreaks.length === 0) {
            streakCompletionString = `You've never completed this streak`;
            streakCompletionStringError = true;
        } else {
            const mostRecentPastStreak = pastStreaks[pastStreaks.length - 1];

            const lastTimeUserCompletedStreak = moment(mostRecentPastStreak.endDate).tz(timezone);

            const howManyDaysSinceUserCompletedStreak = Math.floor(
                moment.duration(currentTime.diff(lastTimeUserCompletedStreak)).asDays(),
            ).toFixed(0);

            streakCompletionString = `Days since completion: ${howManyDaysSinceUserCompletedStreak}`;
            streakCompletionStringError = true;
        }
    }

    return { error: streakCompletionStringError, string: streakCompletionString };
};
