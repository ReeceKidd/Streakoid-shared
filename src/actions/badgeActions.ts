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
} from './types';
import { AppActions, AppState } from '..';
import { BadgeTypes } from '@streakoid/streakoid-sdk/lib';

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

    const getUserBadges = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: GET_USER_BADGES_IS_LOADING });
            const { badges, _id } = getState().users.currentUser;
            const challengeStreaks = await streakoid.challengeStreaks.getAll({ userId: _id });
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

            dispatch({ type: GET_USER_BADGES, payload: populatedBadges });
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
        getUserBadges,
    };
};

export { badgeActions };
