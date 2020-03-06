import { PastStreak, CurrentStreak } from '@streakoid/streakoid-sdk/lib';

export const getLongestStreak = (currentStreak: CurrentStreak, pastStreaks: PastStreak[]) => {
    const pastStreakLengths = pastStreaks.map(pastStreak => pastStreak.numberOfDaysInARow);
    const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
    const longestStreak =
        currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
            ? currentStreak.numberOfDaysInARow
            : longestPastStreakNumberOfDays;
    return longestStreak;
};
