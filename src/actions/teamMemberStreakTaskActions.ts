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
    GET_LIVE_TEAM_STREAKS,
    COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK,
    COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADING,
    COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADED,
    COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_FAIL,
    INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_FAIL,
    INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADED,
    INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK,
    INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADING,
} from './types';
import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';

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
                teamMemberStreakId,
            });
            const teamStreaks = await streakoid.teamStreaks.getAll({ memberId: userId, status: StreakStatus.live });
            const teamStreaksWithLoadingStates = await Promise.all(
                teamStreaks.map(async teamStreak => {
                    const members = await Promise.all(
                        teamStreak.members.map(async member => {
                            const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                                userId: member._id,
                                teamStreakId: teamStreak._id,
                            });
                            const { currentStreak, pastStreaks } = member.teamMemberStreak;
                            return {
                                ...member,
                                teamMemberStreak: {
                                    ...member.teamMemberStreak,
                                    completeTeamMemberStreakTaskIsLoading: false,
                                    completeTeamMemberStreakTaskErrorMessage: '',
                                    incompleteTeamMemberStreakTaskIsLoading: false,
                                    incompleteTeamMemberStreakTaskErrorMessage: '',
                                    longestStreak: getLongestStreak(currentStreak, pastStreaks),
                                    totalTimesTracked: totalTimesTracked.length,
                                },
                            };
                        }),
                    );
                    return {
                        ...teamStreak,
                        members,
                        activityFeed: {
                            totalActivityFeedCount: 0,
                            activityFeedItems: [],
                        },
                    };
                }),
            );
            dispatch({
                type: GET_LIVE_TEAM_STREAKS,
                payload: teamStreaksWithLoadingStates,
            });
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

    const completeSelectedTeamMemberStreakTask = ({
        teamStreakId,
        selectedTeamMemberStreakId,
    }: {
        teamStreakId: string;
        selectedTeamMemberStreakId: string;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({
                type: COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADING,
                payload: { selectedTeamMemberStreakId },
            });
            const userId = getState().users.currentUser._id;

            await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId: selectedTeamMemberStreakId,
            });

            dispatch({
                type: COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK,
                payload: { selectedTeamMemberStreakId },
            });
            dispatch({
                type: COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADED,
                payload: { selectedTeamMemberStreakId },
            });
        } catch (err) {
            dispatch({
                type: COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADED,
                payload: { selectedTeamMemberStreakId },
            });
            if (err.response) {
                dispatch({
                    type: COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_FAIL,
                    payload: { selectedTeamMemberStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: COMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_FAIL,
                    payload: { selectedTeamMemberStreakId, errorMessage: err.message },
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

            const teamStreaks = await streakoid.teamStreaks.getAll({ memberId: userId, status: StreakStatus.live });
            const teamStreaksWithLoadingStates = await Promise.all(
                teamStreaks.map(async teamStreak => {
                    const members = await Promise.all(
                        teamStreak.members.map(async member => {
                            const { currentStreak, pastStreaks } = member.teamMemberStreak;
                            const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                                userId: member._id,
                                teamStreakId: teamStreak._id,
                            });
                            return {
                                ...member,
                                teamMemberStreak: {
                                    ...member.teamMemberStreak,
                                    completeTeamMemberStreakTaskIsLoading: false,
                                    completeTeamMemberStreakTaskErrorMessage: '',
                                    incompleteTeamMemberStreakTaskIsLoading: false,
                                    incompleteTeamMemberStreakTaskErrorMessage: '',
                                    longestStreak: getLongestStreak(currentStreak, pastStreaks),
                                    totalTimesTracked: totalTimesTracked.length,
                                },
                            };
                        }),
                    );
                    return {
                        ...teamStreak,
                        members,
                        activityFeed: {
                            totalActivityFeedCount: 0,
                            activityFeedItems: [],
                        },
                    };
                }),
            );
            dispatch({
                type: GET_LIVE_TEAM_STREAKS,
                payload: teamStreaksWithLoadingStates,
            });

            dispatch({ type: INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED, teamMemberStreakId });
            dispatch({
                type: INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK,
                teamMemberStreakId,
            });
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

    const incompleteSelectedTeamMemberStreakTask = ({
        teamStreakId,
        selectedTeamMemberStreakId,
    }: {
        teamStreakId: string;
        selectedTeamMemberStreakId: string;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({
                type: INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADING,
                payload: { selectedTeamMemberStreakId },
            });
            const userId = getState().users.currentUser._id;

            await streakoid.incompleteTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId: selectedTeamMemberStreakId,
            });

            dispatch({
                type: INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK,
                payload: { selectedTeamMemberStreakId },
            });
            dispatch({
                type: INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADED,
                payload: { selectedTeamMemberStreakId },
            });
        } catch (err) {
            dispatch({
                type: INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_IS_LOADED,
                payload: { selectedTeamMemberStreakId },
            });
            if (err.response) {
                dispatch({
                    type: INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_FAIL,
                    payload: { selectedTeamMemberStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: INCOMPLETE_SELECTED_TEAM_MEMBER_STREAK_TASK_FAIL,
                    payload: { selectedTeamMemberStreakId, errorMessage: err.message },
                });
            }
        }
    };

    return {
        completeTeamMemberStreakTask,
        completeSelectedTeamMemberStreakTask,
        incompleteTeamMemberStreakTask,
        incompleteSelectedTeamMemberStreakTask,
    };
};
