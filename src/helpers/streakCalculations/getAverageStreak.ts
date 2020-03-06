import { PastStreak, CurrentStreak } from '@streakoid/streakoid-sdk/lib';

export const getAverageStreak = (currentStreak: CurrentStreak, pastStreaks: PastStreak[]) => {
    let pastStreakSum = 0;
    pastStreaks.map(pastStreak => (pastStreakSum += pastStreak.numberOfDaysInARow));
    const totalStreakLength = pastStreakSum + currentStreak.numberOfDaysInARow;
    // Plus one for the current streak
    const averageStreak = totalStreakLength / (pastStreaks.length + 1);
    return averageStreak;
};
