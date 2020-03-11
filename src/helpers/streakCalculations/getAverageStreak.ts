import { PastStreak, CurrentStreak } from '@streakoid/streakoid-sdk/lib';

export const getAverageStreak = (currentStreak: CurrentStreak, pastStreaks: PastStreak[]) => {
    let pastStreakSum = 0;
    pastStreaks.map(pastStreak => (pastStreakSum += pastStreak.numberOfDaysInARow));
    const totalStreakSum = pastStreakSum + currentStreak.numberOfDaysInARow;
    // Plus one for the current streak
    if (totalStreakSum === 0) return 0;
    console.log('totalStreakSum', totalStreakSum);
    console.log('pastStreaks length', pastStreaks.length);
    console.log('pastStraeaks + 1', pastStreaks.length + 1);
    const averageStreak = totalStreakSum / (pastStreaks.length + 1);
    console.log('averageStreak', averageStreak);
    return averageStreak;
};
