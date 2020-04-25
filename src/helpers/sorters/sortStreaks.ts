import moment from 'moment-timezone';
import { SoloStreak } from '@streakoid/streakoid-models/lib/Models/SoloStreak';
import { ChallengeStreak } from '@streakoid/streakoid-models/lib/Models/ChallengeStreak';
import { PopulatedTeamStreak } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamStreak';

export const sortByCurrentStreak = (
    streakA: SoloStreak | ChallengeStreak | PopulatedTeamStreak,
    streakB: SoloStreak | ChallengeStreak | PopulatedTeamStreak,
) => {
    return streakA.currentStreak.numberOfDaysInARow - streakB.currentStreak.numberOfDaysInARow;
};

export const sortByPastStreak = (
    streakA: SoloStreak | ChallengeStreak | PopulatedTeamStreak,
    streakB: SoloStreak | ChallengeStreak | PopulatedTeamStreak,
) => {
    if (streakA.pastStreaks.length === 0 && streakB.pastStreaks.length === 0) {
        return 0;
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
};

export const sortSoloStreaks = (streaks: SoloStreak[]): SoloStreak[] => {
    const completedStreaks: SoloStreak[] = [];
    const activeStreaks: SoloStreak[] = [];
    const inactiveStreaks: SoloStreak[] = [];
    const notStartedStreaks: SoloStreak[] = [];

    streaks.map(streak => {
        if (streak.completedToday) {
            completedStreaks.push(streak);
            return;
        }
        if (streak.currentStreak.numberOfDaysInARow > 0) {
            activeStreaks.push(streak);
            return;
        }
        if (streak.currentStreak.numberOfDaysInARow === 0 && streak.pastStreaks.length > 0) {
            inactiveStreaks.push(streak);
            return;
        }
        notStartedStreaks.push(streak);
    });

    return [
        ...activeStreaks.sort(sortByCurrentStreak),
        ...inactiveStreaks.sort(sortByPastStreak),
        ...notStartedStreaks,
        ...completedStreaks,
    ];
};

export const sortChallengeStreaks = (streaks: ChallengeStreak[]): ChallengeStreak[] => {
    const completedStreaks: ChallengeStreak[] = [];
    const activeStreaks: ChallengeStreak[] = [];
    const inactiveStreaks: ChallengeStreak[] = [];
    const notStartedStreaks: ChallengeStreak[] = [];

    streaks.map(streak => {
        if (streak.completedToday) {
            completedStreaks.push(streak);
            return;
        }
        if (streak.currentStreak.numberOfDaysInARow > 0) {
            activeStreaks.push(streak);
            return;
        }
        if (streak.currentStreak.numberOfDaysInARow === 0 && streak.pastStreaks.length > 0) {
            inactiveStreaks.push(streak);
            return;
        }
        notStartedStreaks.push(streak);
    });

    return [
        ...activeStreaks.sort(sortByCurrentStreak),
        ...inactiveStreaks.sort(sortByPastStreak),
        ...notStartedStreaks,
        ...completedStreaks,
    ];
};

export const sortTeamStreaks = (streaks: PopulatedTeamStreak[]): PopulatedTeamStreak[] => {
    const completedStreaks: PopulatedTeamStreak[] = [];
    const activeStreaks: PopulatedTeamStreak[] = [];
    const inactiveStreaks: PopulatedTeamStreak[] = [];
    const notStartedStreaks: PopulatedTeamStreak[] = [];

    streaks.map(streak => {
        if (streak.completedToday) {
            completedStreaks.push(streak);
            return;
        }
        if (streak.currentStreak.numberOfDaysInARow > 0) {
            activeStreaks.push(streak);
            return;
        }
        if (streak.currentStreak.numberOfDaysInARow === 0 && streak.pastStreaks.length > 0) {
            inactiveStreaks.push(streak);
            return;
        }
        notStartedStreaks.push(streak);
    });

    return [
        ...activeStreaks.sort(sortByCurrentStreak),
        ...inactiveStreaks.sort(sortByPastStreak),
        ...notStartedStreaks,
        ...completedStreaks,
    ];
};
