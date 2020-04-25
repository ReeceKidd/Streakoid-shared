import moment from 'moment-timezone';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
export const getStreakCompletionString = ({
    pastStreaks,
    currentStreak,
    timezone,
    createdAt,
}: {
    pastStreaks: PastStreak[];
    currentStreak: CurrentStreak;
    timezone: string;
    createdAt: Date;
}) => {
    const currentTime = moment().tz(timezone);
    let streakCompletionString;
    let streakCompletionStringError = false;
    if (currentStreak.numberOfDaysInARow > 0) {
        streakCompletionString = `Days in a row: ${currentStreak.numberOfDaysInARow}`;
    }
    if (currentStreak.numberOfDaysInARow === 0) {
        if (pastStreaks.length === 0) {
            const howManyDaysSinceUserCreatedStreak = Math.floor(
                moment.duration(currentTime.diff(createdAt)).asDays(),
            ).toFixed(0);
            streakCompletionString = `Days since creation: ${howManyDaysSinceUserCreatedStreak}`;
            streakCompletionStringError = true;
        } else {
            const mostRecentPastStreak = pastStreaks[pastStreaks.length - 1];

            const lastTimeUserCompletedStreak = moment(mostRecentPastStreak.endDate).tz(timezone);

            const howManyDaysSinceUserCompletedStreak = Math.floor(
                moment.duration(currentTime.diff(lastTimeUserCompletedStreak)).asDays() + 1,
            ).toFixed(0);

            streakCompletionString = `Days since completion: ${howManyDaysSinceUserCompletedStreak}`;
            streakCompletionStringError = true;
        }
    }

    return { error: streakCompletionStringError, string: streakCompletionString };
};
