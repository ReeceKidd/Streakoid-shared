import { ChallengeStreak, SoloStreak, PopulatedTeamStreak } from '@streakoid/streakoid-sdk/lib';
import moment from 'moment-timezone';

export const sortByCurrentStreak = (
    streakA: SoloStreak | ChallengeStreak | PopulatedTeamStreak,
    streakB: SoloStreak | ChallengeStreak | PopulatedTeamStreak,
) => {
    if (streakA.currentStreak.numberOfDaysInARow === 0 && streakB.currentStreak.numberOfDaysInARow === 0) {
        if (streakA.pastStreaks.length === 0 && streakB.pastStreaks.length === 0) {
            return 1;
        }
        const streakAMostRecentPastStreak = streakA.pastStreaks[streakA.pastStreaks.length - 1];
        if (!streakAMostRecentPastStreak) {
            return 1;
        }
        const streakBMostRecentPastStreak = streakB.pastStreaks[streakB.pastStreaks.length - 1];
        if (!streakBMostRecentPastStreak) {
            return 1;
        }

        const streakACurrentTime = moment().tz(streakA.timezone);
        const streakBCurrentTime = moment().tz(streakB.timezone);
        const streakALastTimeUserCompletedStreak = moment(streakAMostRecentPastStreak.endDate).tz(streakA.timezone);
        const streakBLastTimeUserCompletedStreak = moment(streakBMostRecentPastStreak.endDate).tz(streakB.timezone);
        const howManyDaysSinceStreakACompletion = Math.floor(
            moment.duration(streakACurrentTime.diff(streakALastTimeUserCompletedStreak)).asDays(),
        );
        const howManyDaysSinceStreakBCompletion = Math.floor(
            moment.duration(streakBCurrentTime.diff(streakBLastTimeUserCompletedStreak)).asDays(),
        );
        return howManyDaysSinceStreakACompletion - howManyDaysSinceStreakBCompletion;
    }
    return streakA.currentStreak.numberOfDaysInARow - streakB.currentStreak.numberOfDaysInARow;
};
