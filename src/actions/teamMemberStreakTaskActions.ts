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
    GET_SELECTED_TEAM_STREAK,
} from './types';
import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

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
                const selectedTeamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
                dispatch({
                    type: GET_SELECTED_TEAM_STREAK,
                    payload: {
                        ...getState().teamStreaks.selectedTeamStreak,
                        completedToday: selectedTeamStreak.completedToday,
                        currentStreak: selectedTeamStreak.currentStreak,
                        members: getState().teamStreaks.selectedTeamStreak.members.map(member => {
                            if (member.teamMemberStreak._id === teamMemberStreakId) {
                                return {
                                    ...member,
                                    teamMemberStreak: {
                                        ...member.teamMemberStreak,
                                        completedToday: true,
                                    },
                                };
                            }
                            return member;
                        }),
                        hasCurrentUserCompletedTaskForTheDay: true,
                    },
                });
            }

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
                const selectedTeamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
                dispatch({
                    type: GET_SELECTED_TEAM_STREAK,
                    payload: {
                        ...getState().teamStreaks.selectedTeamStreak,
                        completedToday: selectedTeamStreak.completedToday,
                        currentStreak: selectedTeamStreak.currentStreak,
                        members: getState().teamStreaks.selectedTeamStreak.members.map(member => {
                            if (member.teamMemberStreak._id === teamMemberStreakId) {
                                return {
                                    ...member,
                                    teamMemberStreak: {
                                        ...member.teamMemberStreak,
                                        completedToday: false,
                                    },
                                };
                            }
                            return member;
                        }),
                        hasCurrentUserCompletedTaskForTheDay: false,
                    },
                });
            }

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
