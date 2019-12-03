import { Dispatch } from 'redux';
import {
    COMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL,
    COMPLETE_TEAM_MEMBER_STREAK_TASK,
    COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING,
    COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED,
    INCOMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL,
    INCOMPLETE_TEAM_MEMBER_STREAK_TASK,
    INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING,
    INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED,
    GET_LIVE_TEAM_STREAKS,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { StreakStatus } from '@streakoid/streakoid-sdk/lib';

export const teamMemberStreakTaskActions = (streakoid: typeof streakoidSDK) => {
    const completeTeamMemberStreakTask = ({
        teamStreakId,
        teamMemberStreakId,
    }: {
        teamStreakId: string;
        teamMemberStreakId: string;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING, teamMemberStreakId });
            const userId = getState().users.currentUser._id;

            await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId,
            });

            dispatch({
                type: COMPLETE_TEAM_MEMBER_STREAK_TASK,
                teamMemberStreakId,
            });
            const teamStreaks = await streakoid.teamStreaks.getAll({ memberId: userId, status: StreakStatus.live });
            const teamStreaksWithLoadingStates = teamStreaks.map(teamStreak => {
                const members = teamStreak.members.map(member => {
                    return {
                        ...member,
                        teamMemberStreak: {
                            ...member.teamMemberStreak,
                            completeTeamMemberStreakTaskIsLoading: false,
                            completeTeamMemberStreakTaskErrorMessage: '',
                            incompleteTeamMemberStreakTaskIsLoading: false,
                            incompleteTeamMemberStreakTaskErrorMessage: '',
                        },
                    };
                });
                return {
                    ...teamStreak,
                    members,
                };
            });
            dispatch({
                type: GET_LIVE_TEAM_STREAKS,
                payload: teamStreaksWithLoadingStates,
            });
            dispatch({ type: COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED, teamMemberStreakId });
        } catch (err) {
            dispatch({ type: COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED, teamMemberStreakId });
            if (err.response) {
                dispatch({
                    type: COMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL,
                    payload: { teamMemberStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: COMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL,
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
            dispatch({ type: INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING, teamMemberStreakId });
            const userId = getState().users.currentUser._id;

            await streakoid.incompleteTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId,
            });

            const teamStreaks = await streakoid.teamStreaks.getAll({ memberId: userId, status: StreakStatus.live });
            const teamStreaksWithLoadingStates = teamStreaks.map(teamStreak => {
                const members = teamStreak.members.map(member => {
                    return {
                        ...member,
                        teamMemberStreak: {
                            ...member.teamMemberStreak,
                            completeTeamMemberStreakTaskIsLoading: false,
                            completeTeamMemberStreakTaskErrorMessage: '',
                            incompleteTeamMemberStreakTaskIsLoading: false,
                            incompleteTeamMemberStreakTaskErrorMessage: '',
                        },
                    };
                });
                return {
                    ...teamStreak,
                    members,
                };
            });
            dispatch({
                type: GET_LIVE_TEAM_STREAKS,
                payload: teamStreaksWithLoadingStates,
            });

            dispatch({ type: INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED, teamMemberStreakId });
            dispatch({
                type: INCOMPLETE_TEAM_MEMBER_STREAK_TASK,
                teamMemberStreakId,
            });
        } catch (err) {
            dispatch({ type: INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED, teamMemberStreakId });
            if (err.response) {
                dispatch({
                    type: INCOMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL,
                    payload: { teamMemberStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: INCOMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL,
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
