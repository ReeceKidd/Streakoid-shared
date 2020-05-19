import moment from 'moment-timezone';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
export const getStreakCompletionInfo = ({
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
    if (currentStreak.numberOfDaysInARow > 0) {
        return {
            currentStreak,
        };
    }
    if (currentStreak.numberOfDaysInARow === 0) {
        if (pastStreaks.length === 0) {
            const daysSinceUserCreatedStreak = Number(
                Math.floor(moment.duration(currentTime.diff(createdAt)).asDays()).toFixed(0),
            );
            return {
                daysSinceUserCreatedStreak,
            };
        } else {
            const mostRecentPastStreak = pastStreaks[pastStreaks.length - 1];

            const lastTimeUserCompletedStreak = moment(mostRecentPastStreak.endDate).tz(timezone);

            const daysSinceUserCompletedStreak = Number(
                Math.floor(moment.duration(currentTime.diff(lastTimeUserCompletedStreak)).asDays() + 1).toFixed(0),
            );

            return {
                daysSinceUserCompletedStreak,
            };
        }
    }
};
