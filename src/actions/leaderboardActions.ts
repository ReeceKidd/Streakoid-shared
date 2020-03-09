import { Dispatch } from 'redux';

import {
    GET_SOLO_STREAK_LEADERBOARD,
    GET_SOLO_STREAK_LEADERBOARD_LOADING,
    GET_SOLO_STREAK_LEADERBOARD_LOADED,
    GET_SOLO_STREAK_LEADERBOARD_FAIL,
} from './types';
import { AppActions } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { GetAllSoloStreaksSortFields } from '@streakoid/streakoid-sdk/lib/soloStreaks';
import { LeaderboardItem } from '../reducers/leaderboardReducer';

const leaderboardActions = (streakoid: typeof streakoidSDK) => {
    const getSoloStreakLeaderboard = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_LOADING });
            const soloStreaks = await streakoid.soloStreaks.getAll({
                sortField: GetAllSoloStreaksSortFields.currentStreak,
            });
            const leaderboardItems: LeaderboardItem[] = await Promise.all(
                soloStreaks.map(async soloStreak => {
                    const user = await streakoid.users.getOne(soloStreak.userId);
                    return {
                        streakId: soloStreak._id,
                        streakName: soloStreak.streakName,
                        username: user.username,
                        userProfileImage: user.profileImages.originalImageUrl,
                        currentStreakNumberOfDaysInARow: soloStreak.currentStreak.numberOfDaysInARow,
                        streakCreatedAt: new Date(soloStreak.createdAt),
                    };
                }),
            );
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD, payload: leaderboardItems });
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_LOADED });
        } catch (err) {
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_LOADED });
            if (err.response) {
                dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_FAIL, payload: err.message });
            }
        }
    };

    return {
        getSoloStreakLeaderboard,
    };
};

export { leaderboardActions };
