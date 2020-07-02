import { Dispatch } from 'redux';
import {
    COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL,
    COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK,
    COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING,
    COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED,
    INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL,
    INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK,
    INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING,
    INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED,
} from './types';
import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { teamStreakActions } from './teamStreakActions';

export const teamMemberStreakTaskActions = (streakoid: StreakoidSDK) => {
    const completeTeamMemberStreakTask = ({
        teamStreakId,
        teamMemberStreakId,
    }: {
        teamStreakId: string;
        teamMemberStreakId: string;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING, teamMemberStreakId });
            const userId = getState().users.currentUser._id;

            await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId,
            });

            dispatch({
                type: COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK,
                payload: { teamMemberStreakId },
            });

            if (getState().teamStreaks.selectedTeamStreak._id === teamStreakId) {
                teamStreakActions(streakoid).getSelectedTeamStreak(teamStreakId);
            }

            teamStreakActions(streakoid).getLiveTeamStreaks({ currentUserId: getState().users.currentUser._id });

            dispatch({ type: COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED, teamMemberStreakId });
        } catch (err) {
            dispatch({ type: COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED, teamMemberStreakId });
            if (err.response) {
                dispatch({
                    type: COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL,
                    payload: { teamMemberStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL,
                    payload: { teamMemberStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const incompleteTeamMemberStreakTask = ({
        teamStreakId,
        teamMemberStreakId,
    }: {
        teamStreakId: string;
        teamMemberStreakId: string;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING, teamMemberStreakId });
            const userId = getState().users.currentUser._id;

            await streakoid.incompleteTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId,
            });

            dispatch({
                type: INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK,
                payload: { teamMemberStreakId },
            });

            if (getState().teamStreaks.selectedTeamStreak._id === teamStreakId) {
                teamStreakActions(streakoid).getSelectedTeamStreak(teamStreakId);
            }

            teamStreakActions(streakoid).getLiveTeamStreaks({ currentUserId: getState().users.currentUser._id });

            dispatch({ type: INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED, teamMemberStreakId });
        } catch (err) {
            dispatch({ type: INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED, teamMemberStreakId });
            if (err.response) {
                dispatch({
                    type: INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL,
                    payload: { teamMemberStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL,
                    payload: { teamMemberStreakId, errorMessage: err.message },
                });
            }
        }
    };

    return {
        completeTeamMemberStreakTask,
        incompleteTeamMemberStreakTask,
    };
};
