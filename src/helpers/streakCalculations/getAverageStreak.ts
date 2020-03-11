import { PastStreak, CurrentStreak } from '@streakoid/streakoid-sdk/lib';

export const getAverageStreak = (currentStreak: CurrentStreak, pastStreaks: PastStreak[]) => {
    let pastStreakSum = 0;
    pastStreaks.map(pastStreak => (pastStreakSum += pastStreak.numberOfDaysInARow));
    const totalStreakSum = pastStreakSum + currentStreak.numberOfDaysInARow;
    // Plus one for the current streak
    const averageStreak = totalStreakSum / (pastStreaks.length + 1);
    if (isFinite(averageStreak)) return averageStreak;
    return averageStreak;
};
