import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import {
    GET_BADGES,
    GET_BADGES_FAIL,
    GET_BADGES_IS_LOADING,
    GET_BADGES_IS_LOADED,
    GET_USER_BADGES_IS_LOADING,
    GET_USER_BADGES_IS_LOADED,
    GET_USER_BADGES_FAIL,
    GET_USER_BADGES,
    GET_BADGE_LOADED,
    GET_BADGE_FAIL,
    GET_BADGE_LOADING,
    GET_BADGE,
} from './types';
import { AppActions, AppState } from '..';
import { BadgeTypes } from '@streakoid/streakoid-sdk/lib';
import { UserBadge } from '../reducers/badgesReducer';

export const sortBadgesByLongestStreak = (badgeA: UserBadge, badgeB: UserBadge) => {
    let comparison = 0;
    if (badgeA.longestStreak > badgeB.longestStreak) {
        comparison = -1;
    } else if (badgeA.longestStreak < badgeB.longestStreak) {
        comparison = 1;
    }
    return comparison;
};

const badgeActions = (streakoid: typeof streakoidSDK) => {
    const getBadges = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_BADGES_IS_LOADING });
            const badges = await streakoid.badges.getAll({});
            dispatch({ type: GET_BADGES, payload: badges });
            dispatch({ type: GET_BADGES_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_BADGES_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_BADGES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_BADGES_FAIL, payload: err.message });
            }
        }
    };

    const getBadge = (badgeId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_BADGE_LOADING });
            const userId = getState().users.currentUser._id;
            const badge = await streakoid.badges.getOne({ badgeId });
            let populatedBadge;
            if (badge.badgeType === BadgeTypes.challenge) {
                const challengeStreaks = await streakoid.challengeStreaks.getAll({ userId });
                const associatedChallengeStreak = challengeStreaks.find(
                    challengeStreak => challengeStreak.badgeId === badge._id,
                );
                if (!associatedChallengeStreak) {
                    populatedBadge = {
                        ...badge,
                        longestStreak: 0,
                    };
                } else {
                    const { pastStreaks, currentStreak } = associatedChallengeStreak;
                    const pastStreakLengths = pastStreaks.map(pastStreak => pastStreak.numberOfDaysInARow);
                    const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
                    const longestStreak =
                        currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
                            ? currentStreak.numberOfDaysInARow
                            : longestPastStreakNumberOfDays;

                    populatedBadge = {
                        ...badge,
                        longestStreak,
                    };
                }
            } else {
                populatedBadge = { ...badge, longestStreak: 0 };
            }
            dispatch({ type: GET_BADGE, payload: populatedBadge });
            dispatch({ type: GET_BADGE_LOADED });
        } catch (err) {
            dispatch({ type: GET_BADGE_LOADED });
            if (err.response) {
                dispatch({ type: GET_BADGE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_BADGE_FAIL, payload: err.message });
            }
        }
    };

    const getUserBadges = ({ userId }: { userId: string }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_USER_BADGES_IS_LOADING });
            const user = await streakoid.users.getOne(userId);
            const { badges } = user;
            const challengeStreaks = await streakoid.challengeStreaks.getAll({ userId });
            const populatedBadges = await Promise.all(
                badges.map(badge => {
                    if (badge.badgeType === BadgeTypes.challenge) {
                        const associatedChallengeStreak = challengeStreaks.find(
                            challengeStreak => challengeStreak.badgeId === badge._id,
                        );
                        if (!associatedChallengeStreak) {
                            return {
                                ...badge,
                                longestStreak: 0,
                            };
                        }
                        const { pastStreaks, currentStreak } = associatedChallengeStreak;
                        const pastStreakLengths = pastStreaks.map(pastStreak => pastStreak.numberOfDaysInARow);
                        const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
                        const longestStreak =
                            currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
                                ? currentStreak.numberOfDaysInARow
                                : longestPastStreakNumberOfDays;

                        return {
                            ...badge,
                            longestStreak,
                        };
                    }
                    return {
                        ...badge,
                        longestStreak: 0,
                    };
                }),
            );

            dispatch({ type: GET_USER_BADGES, payload: populatedBadges.sort(sortBadgesByLongestStreak) });
            dispatch({ type: GET_USER_BADGES_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_USER_BADGES_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_USER_BADGES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_USER_BADGES_FAIL, payload: err.message });
            }
        }
    };

    return {
        getBadges,
        getBadge,
        getUserBadges,
    };
};

export { badgeActions };
