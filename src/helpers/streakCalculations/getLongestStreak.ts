import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';

export const getLongestStreak = (currentStreak: CurrentStreak, pastStreaks: PastStreak[]) => {
    const pastStreakLengths = pastStreaks.map(pastStreak => pastStreak.numberOfDaysInARow);
    const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
    const longestStreak =
        currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
            ? currentStreak.numberOfDaysInARow
            : longestPastStreakNumberOfDays;
    return longestStreak;
};
