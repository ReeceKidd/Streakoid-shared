import { Dispatch } from 'redux';

import {
    GET_LIVE_TEAM_STREAKS,
    GET_LIVE_TEAM_STREAKS_FAIL,
    GET_TEAM_STREAK,
    GET_TEAM_STREAK_FAIL,
    GET_TEAM_STREAK_IS_LOADING,
    GET_TEAM_STREAK_IS_LOADED,
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
    GET_ARCHIVED_TEAM_STREAKS_IS_LOADING,
    GET_ARCHIVED_TEAM_STREAKS_FAIL,
    GET_ARCHIVED_TEAM_STREAKS,
    GET_ARCHIVED_TEAM_STREAKS_IS_LOADED,
    RESTORE_ARCHIVED_TEAM_STREAK,
    RESTORE_ARCHIVED_TEAM_STREAK_FAIL,
    RESTORE_ARCHIVED_TEAM_STREAK_LOADED,
    RESTORE_ARCHIVED_TEAM_STREAK_LOADING,
    CLEAR_RESTORE_TEAM_STREAK_ERROR_MESSAGE,
    DELETE_ARCHIVED_TEAM_STREAK_LOADING,
    DELETE_ARCHIVED_TEAM_STREAK,
    DELETE_ARCHIVED_TEAM_STREAK_LOADED,
    DELETE_ARCHIVED_TEAM_STREAK_FAIL,
    UPDATE_TEAM_STREAK_TIMEZONE,
    UPDATE_TEAM_STREAK_TIMEZONE_FAIL,
    NAVIGATE_TO_STREAK_LIMIT_REACHED,
    JOIN_CHALLENGE_LOADED,
    CLEAR_SELECTED_TEAM_STREAK,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { StreakStatus } from '@streakoid/streakoid-sdk/lib';
import { sortTeamStreaks } from '../helpers/sorters/sortStreaks';
import { PopulatedTeamStreakWithTaskDates } from '../reducers/teamStreakReducer';

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
            const sortedTeamStreaks = sortTeamStreaks(teamStreaks);
            dispatch({ type: GET_LIVE_TEAM_STREAKS, payload: sortedTeamStreaks });
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

    const getArchivedTeamStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            const teamStreaks = await streakoid.teamStreaks.getAll({
                memberId: userId,
                status: StreakStatus.archived,
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
            dispatch({ type: GET_ARCHIVED_TEAM_STREAKS, payload: teamStreaksWithLoadingStates });
            dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_FAIL, payload: err.message });
            }
        }
    };

    const getTeamStreak = (teamStreakId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_TEAM_STREAK_IS_LOADING });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
            const members = teamStreak.members.map(member => {
                const pastStreakLengths = member.teamMemberStreak.pastStreaks.map(
                    pastStreak => pastStreak.numberOfDaysInARow,
                );
                const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
                const longestStreak =
                    member.teamMemberStreak.currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
                        ? member.teamMemberStreak.currentStreak.numberOfDaysInARow
                        : longestPastStreakNumberOfDays;
                return {
                    ...member,
                    teamMemberStreak: {
                        ...member.teamMemberStreak,
                        completeTeamMemberStreakTaskIsLoading: false,
                        completeTeamMemberStreakTaskErrorMessage: '',
                        incompleteTeamMemberStreakTaskIsLoading: false,
                        incompleteTeamMemberStreakTaskErrorMessage: '',
                        longestStreak,
                    },
                };
            });
            const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamStreakId,
            });
            const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(
                completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const counts: any = {};
            for (let i = 0; i < completedTeamMemberStreakTaskDates.length; i++) {
                const key = completedTeamMemberStreakTaskDates[i];
                counts[key] = counts[key] ? counts[key] + 1 : 1;
            }
            const uniqueDates = completedTeamMemberStreakTaskDates.filter(
                (item, index) => completedTeamMemberStreakTaskDates.indexOf(item) === index,
            );
            const completedTeamMemberStreakTaskDatesWithCounts = uniqueDates.map(taskDate => ({
                date: new Date(taskDate),
                count: counts[taskDate],
            }));
            const teamStreakWithLoadingState: PopulatedTeamStreakWithTaskDates = {
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
            const isPayingMember = getState().users.currentUser.membershipInformation.isPayingMember;
            if (!isPayingMember) {
                const userTeamStreaks = await streakoid.teamMemberStreaks.getAll({ userId });
                const teamStreaksLimitForFreeAccounts = 2;
                if (userTeamStreaks.length >= teamStreaksLimitForFreeAccounts) {
                    dispatch({ type: NAVIGATE_TO_STREAK_LIMIT_REACHED });
                    dispatch({ type: JOIN_CHALLENGE_LOADED });
                    return;
                }
            }
            members = [{ memberId: userId }, ...members];
            const teamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                streakDescription,
                numberOfMinutes,
                members,
            });
            const teamStreakMembersWithLoadingStates = teamStreak.members.map(member => {
                const pastStreakLengths = member.teamMemberStreak.pastStreaks.map(
                    pastStreak => pastStreak.numberOfDaysInARow,
                );
                const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
                const longestStreak =
                    member.teamMemberStreak.currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
                        ? member.teamMemberStreak.currentStreak.numberOfDaysInARow
                        : longestPastStreakNumberOfDays;
                return {
                    ...member,
                    teamMemberStreak: {
                        ...member.teamMemberStreak,
                        completeTeamMemberStreakTaskIsLoading: false,
                        completeTeamMemberStreakTaskErrorMessage: '',
                        incompleteTeamMemberStreakTaskIsLoading: false,
                        incompleteTeamMemberStreakTaskErrorMessage: '',
                        longestStreak,
                    },
                };
            });
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members: teamStreakMembersWithLoadingStates,
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
            await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { status: StreakStatus.archived },
            });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
            const teamStreakMembersWithLoadingStates = teamStreak.members.map(member => {
                const pastStreakLengths = member.teamMemberStreak.pastStreaks.map(
                    pastStreak => pastStreak.numberOfDaysInARow,
                );
                const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
                const longestStreak =
                    member.teamMemberStreak.currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
                        ? member.teamMemberStreak.currentStreak.numberOfDaysInARow
                        : longestPastStreakNumberOfDays;
                return {
                    ...member,
                    teamMemberStreak: {
                        ...member.teamMemberStreak,
                        completeTeamMemberStreakTaskIsLoading: false,
                        completeTeamMemberStreakTaskErrorMessage: '',
                        incompleteTeamMemberStreakTaskIsLoading: false,
                        incompleteTeamMemberStreakTaskErrorMessage: '',
                        longestStreak,
                    },
                };
            });
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members: teamStreakMembersWithLoadingStates,
            };
            dispatch({ type: ARCHIVE_TEAM_STREAK, payload: teamStreakWithLoadingState });
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

    const restoreArchivedTeamStreak = (teamStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_LOADING });
            await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { status: StreakStatus.live },
            });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
            const teamStreakMembersWithLoadingStates = teamStreak.members.map(member => {
                const pastStreakLengths = member.teamMemberStreak.pastStreaks.map(
                    pastStreak => pastStreak.numberOfDaysInARow,
                );
                const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
                const longestStreak =
                    member.teamMemberStreak.currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
                        ? member.teamMemberStreak.currentStreak.numberOfDaysInARow
                        : longestPastStreakNumberOfDays;
                return {
                    ...member,
                    teamMemberStreak: {
                        ...member.teamMemberStreak,
                        completeTeamMemberStreakTaskIsLoading: false,
                        completeTeamMemberStreakTaskErrorMessage: '',
                        incompleteTeamMemberStreakTaskIsLoading: false,
                        incompleteTeamMemberStreakTaskErrorMessage: '',
                        longestStreak,
                    },
                };
            });
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members: teamStreakMembersWithLoadingStates,
            };
            dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK, payload: teamStreakWithLoadingState });
            dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_LOADED });
            dispatch({ type: NAVIGATE_TO_TEAM_STREAKS });
        } catch (err) {
            dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const clearRestoreArchivedTeamStreakErrorMessage = (): AppActions => ({
        type: CLEAR_RESTORE_TEAM_STREAK_ERROR_MESSAGE,
    });

    const deleteArchivedTeamStreak = (teamStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_LOADING });
            await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { status: StreakStatus.deleted },
            });
            dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK, payload: teamStreakId });
            dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_LOADED });
            dispatch({ type: NAVIGATE_TO_TEAM_STREAKS });
        } catch (err) {
            dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const updateTeamStreakTimezone = ({ teamStreakId, timezone }: { teamStreakId: string; timezone: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { timezone },
            });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
            const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({ teamStreakId });
            await Promise.all(
                teamMemberStreaks.map(teamMemberStreak => {
                    return streakoid.teamMemberStreaks.update({
                        teamMemberStreakId: teamMemberStreak._id,
                        updateData: { timezone },
                    });
                }),
            );
            const teamStreakMembersWithLoadingStates = teamStreak.members.map(member => {
                const pastStreakLengths = member.teamMemberStreak.pastStreaks.map(
                    pastStreak => pastStreak.numberOfDaysInARow,
                );
                const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
                const longestStreak =
                    member.teamMemberStreak.currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
                        ? member.teamMemberStreak.currentStreak.numberOfDaysInARow
                        : longestPastStreakNumberOfDays;
                return {
                    ...member,
                    teamMemberStreak: {
                        ...member.teamMemberStreak,
                        completeTeamMemberStreakTaskIsLoading: false,
                        completeTeamMemberStreakTaskErrorMessage: '',
                        incompleteTeamMemberStreakTaskIsLoading: false,
                        incompleteTeamMemberStreakTaskErrorMessage: '',
                        longestStreak,
                    },
                };
            });
            const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamStreakId,
            });
            const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(
                completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const counts: any = {};
            for (let i = 0; i < completedTeamMemberStreakTaskDates.length; i++) {
                const key = completedTeamMemberStreakTaskDates[i];
                counts[key] = counts[key] ? counts[key] + 1 : 1;
            }
            const uniqueDates = completedTeamMemberStreakTaskDates.filter(
                (item, index) => completedTeamMemberStreakTaskDates.indexOf(item) === index,
            );
            const completedTeamMemberStreakTaskDatesWithCounts = uniqueDates.map(taskDate => ({
                date: new Date(taskDate),
                count: counts[taskDate],
            }));
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members: teamStreakMembersWithLoadingStates,
                completedTeamMemberStreakTaskDatesWithCounts,
            };
            dispatch({ type: UPDATE_TEAM_STREAK_TIMEZONE, payload: teamStreakWithLoadingState });
        } catch (err) {
            if (err.response) {
                dispatch({ type: UPDATE_TEAM_STREAK_TIMEZONE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: UPDATE_TEAM_STREAK_TIMEZONE_FAIL, payload: err.message });
            }
        }
    };

    const clearSelectedTeamStreak = (): AppActions => ({
        type: CLEAR_SELECTED_TEAM_STREAK,
    });

    return {
        getLiveTeamStreaks,
        getArchivedTeamStreaks,
        getTeamStreak,
        createTeamStreak,
        clearCreateTeamStreakError,
        editTeamStreak,
        clearEditTeamStreakErrorMessage,
        addFriendToTeamStreak,
        archiveTeamStreak,
        clearArchiveTeamStreakErrorMessage,
        restoreArchivedTeamStreak,
        clearRestoreArchivedTeamStreakErrorMessage,
        deleteArchivedTeamStreak,
        updateTeamStreakTimezone,
        clearSelectedTeamStreak,
    };
};
