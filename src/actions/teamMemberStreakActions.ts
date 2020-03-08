import { Dispatch } from 'redux';

import {
    GET_TEAM_MEMBER_STREAK_IS_LOADING,
    GET_TEAM_MEMBER_STREAK,
    GET_TEAM_MEMBER_STREAK_IS_LOADED,
    GET_TEAM_MEMBER_STREAK_FAIL,
} from './types';
import { AppActions } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

const teamMemberStreakActions = (streakoid: typeof streakoidSDK) => {
    const getTeamMemberStreak = (teamMemberStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_TEAM_MEMBER_STREAK_IS_LOADING });
            const teamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreakId);
            const teamMemberStreakOwner = await streakoid.users.getOne(teamMemberStreak.userId);
            const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamMemberStreakId,
            });
            const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(
                completeTask => new Date(completeTask.createdAt),
            );
            dispatch({
                type: GET_TEAM_MEMBER_STREAK,
                payload: {
                    ...teamMemberStreak,
                    username: teamMemberStreakOwner.username,
                    userProfileImage: teamMemberStreakOwner.profileImages.originalImageUrl,
                    completedTeamMemberStreakTaskDates,
                },
            });
            dispatch({ type: GET_TEAM_MEMBER_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_TEAM_MEMBER_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_TEAM_MEMBER_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_TEAM_MEMBER_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    return {
        getTeamMemberStreak,
    };
};

export { teamMemberStreakActions };
