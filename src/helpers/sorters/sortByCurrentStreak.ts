import { CurrentStreak } from '@streakoid/streakoid-sdk/lib';

export const sortByCurrentStreak = (currentStreakA: CurrentStreak, currentStreakB: CurrentStreak) => {
    return currentStreakB.numberOfDaysInARow - currentStreakA.numberOfDaysInARow;
};
