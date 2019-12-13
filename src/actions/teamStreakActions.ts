import { Dispatch } from 'redux';
import moment from 'moment-timezone';

import {
    GET_LIVE_TEAM_STREAKS,
    GET_LIVE_TEAM_STREAKS_FAIL,
    GET_TEAM_STREAK,
    GET_TEAM_STREAK_FAIL,
    ADD_FRIEND_TO_TEAM_STREAK,
    ADD_FRIEND_TO_TEAM_STREAK_FAIL,
    CREATE_TEAM_STREAK,
    CREATE_TEAM_STREAK_IS_LOADING,
    CREATE_TEAM_STREAK_IS_LOADED,
    CREATE_TEAM_STREAK_ERROR,
    CLEAR_CREATE_TEAM_STREAK_ERROR,
    GET_LIVE_TEAM_STREAKS_IS_LOADING,
    GET_LIVE_TEAM_STREAKS_IS_LOADED,
    CLEAR_SELECTED_FRIENDS,
    GET_TEAM_STREAK_IS_LOADING,
    GET_TEAM_STREAK_IS_LOADED,
    EDIT_TEAM_STREAK,
    EDIT_TEAM_STREAK_LOADED,
    EDIT_TEAM_STREAK_FAIL,
    EDIT_TEAM_STREAK_LOADING,
    CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE,
    ARCHIVE_TEAM_STREAK_IS_LOADING,
    ARCHIVE_TEAM_STREAK,
    ARCHIVE_TEAM_STREAK_IS_LOADED,
    ARCHIVE_TEAM_STREAK_FAIL,
    CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE,
    NAVIGATE_TO_SPECIFIC_TEAM_STREAK,
    NAVIGATE_TO_TEAM_STREAKS,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { StreakStatus } from '@streakoid/streakoid-sdk/lib';

export const teamStreakActions = (streakoid: typeof streakoidSDK) => {
    const getLiveTeamStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_LIVE_TEAM_STREAKS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            const teamStreaks = await streakoid.teamStreaks.getAll({
                memberId: userId,
                status: StreakStatus.live,
            });
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
            dispatch({ type: GET_LIVE_TEAM_STREAKS, payload: teamStreaksWithLoadingStates });
            dispatch({ type: GET_LIVE_TEAM_STREAKS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_LIVE_TEAM_STREAKS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_LIVE_TEAM_STREAKS_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_LIVE_TEAM_STREAKS_FAIL, errorMessage: err.message });
            }
        }
    };

    const getTeamStreak = (teamStreakId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_TEAM_STREAK_IS_LOADING });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
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
            const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamStreakId,
            });
            console.log(`Number of complete team member streak tasks: ${completedTeamMemberStreakTaskDates.length}`);
            const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(completeTask =>
                moment(new Date(completeTask.createdAt), 'YYYY/MM/DD').toString(),
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const counts: any = {};
            for (let i = 0; i < completedTeamMemberStreakTaskDates.length; i++) {
                const key = completedTeamMemberStreakTaskDates[i];
                counts[key] = counts[key] ? counts[key] + 1 : 1;
            }
            console.log(counts);
            const uniqueDates = completedTeamMemberStreakTaskDates.filter(
                (item, index) => completedTeamMemberStreakTaskDates.indexOf(item) === index,
            );
            console.log(`Number of unique dates: ${uniqueDates.length}`);
            const completedTeamMemberStreakTaskDatesWithCounts = uniqueDates.map(taskDate => ({
                date: new Date(taskDate),
                count: counts[taskDate],
            }));
            console.log('Complete dates with counts');
            console.log(completedTeamMemberStreakTaskDatesWithCounts);
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members,
                completedTeamMemberStreakTaskDatesWithCounts,
            };
            dispatch({ type: GET_TEAM_STREAK, payload: teamStreakWithLoadingState });
            dispatch({ type: GET_TEAM_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_TEAM_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_TEAM_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_TEAM_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const createTeamStreak = ({
        streakName,
        members,
        streakDescription,
        numberOfMinutes,
    }: {
        streakName: string;
        members: { memberId: string }[];
        streakDescription?: string;
        numberOfMinutes?: number;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: CREATE_TEAM_STREAK_IS_LOADING });
            const userId = getState().users.currentUser._id;
            members = [{ memberId: userId }, ...members];
            const teamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                streakDescription,
                numberOfMinutes,
                members,
            });
            const teamStreakMembersWitLoadingStates = teamStreak.members.map(member => {
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
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members: teamStreakMembersWitLoadingStates,
            };
            dispatch({ type: CREATE_TEAM_STREAK, payload: teamStreakWithLoadingState });
            dispatch({ type: CLEAR_SELECTED_FRIENDS });
            dispatch({ type: CREATE_TEAM_STREAK_IS_LOADED });
            dispatch({ type: NAVIGATE_TO_TEAM_STREAKS });
        } catch (err) {
            dispatch({ type: CREATE_TEAM_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: CREATE_TEAM_STREAK_ERROR, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: CREATE_TEAM_STREAK_ERROR, errorMessage: err.message });
            }
        }
    };

    const clearCreateTeamStreakError = (): AppActions => ({
        type: CLEAR_CREATE_TEAM_STREAK_ERROR,
    });

    const editTeamStreak = ({
        teamStreakId,
        streakName,
        streakDescription,
        numberOfMinutes,
    }: {
        teamStreakId: string;
        streakName: string;
        streakDescription?: string;
        numberOfMinutes?: number;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: EDIT_TEAM_STREAK_LOADING });
            const teamStreak = await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: {
                    streakName,
                    streakDescription,
                    numberOfMinutes,
                },
            });
            dispatch({ type: EDIT_TEAM_STREAK, payload: teamStreak });
            dispatch({ type: NAVIGATE_TO_SPECIFIC_TEAM_STREAK, payload: teamStreakId });
            dispatch({ type: EDIT_TEAM_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: EDIT_TEAM_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: EDIT_TEAM_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: EDIT_TEAM_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const clearEditTeamStreakErrorMessage = (): AppActions => ({
        type: CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE,
    });

    const addFriendToTeamStreak = (friendId: string, teamStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            await streakoid.teamStreaks.teamMembers.create({ friendId, teamStreakId });
            dispatch({ type: ADD_FRIEND_TO_TEAM_STREAK });
        } catch (err) {
            if (err.response) {
                dispatch({ type: ADD_FRIEND_TO_TEAM_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: ADD_FRIEND_TO_TEAM_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const archiveTeamStreak = (teamStreakId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: ARCHIVE_TEAM_STREAK_IS_LOADING });
            const updatedTeamStreak = await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { status: StreakStatus.archived },
            });
            dispatch({ type: ARCHIVE_TEAM_STREAK, payload: updatedTeamStreak });
            dispatch({ type: ARCHIVE_TEAM_STREAK_IS_LOADED });
            dispatch({ type: NAVIGATE_TO_TEAM_STREAKS });
        } catch (err) {
            dispatch({ type: ARCHIVE_TEAM_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: ARCHIVE_TEAM_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: ARCHIVE_TEAM_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearArchiveTeamStreakErrorMessage = (): AppActions => ({
        type: CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE,
    });

    return {
        getLiveTeamStreaks,
        getTeamStreak,
        createTeamStreak,
        clearCreateTeamStreakError,
        editTeamStreak,
        clearEditTeamStreakErrorMessage,
        addFriendToTeamStreak,
        archiveTeamStreak,
        clearArchiveTeamStreakErrorMessage,
    };
};
