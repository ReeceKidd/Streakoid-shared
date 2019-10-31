import { Dispatch } from 'react';
import { Reducer } from 'redux';

import {
    GET_LIVE_TEAM_STREAKS,
    GET_LIVE_TEAM_STREAKS_FAIL,
    GET_TEAM_STREAK,
    GET_TEAM_STREAK_FAIL,
    DELETE_TEAM_STREAK,
    DELETE_TEAM_STREAK_FAIL,
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
import { AppActions } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { StreakStatus } from '@streakoid/streakoid-sdk/lib';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const teamStreakActions = (streakoid: typeof streakoidSDK, rootReducer: Reducer) => {
    const getLiveTeamStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => ReturnType<typeof rootReducer>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_LIVE_TEAM_STREAKS_IS_LOADING });
            const userId = getState().users.currentUser._id;
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
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members,
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
    }) => async (dispatch: Dispatch<AppActions>, getState: () => ReturnType<typeof rootReducer>): Promise<void> => {
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

    const deleteTeamStreak = (teamStreakId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            await streakoid.teamStreaks.update({ teamStreakId, updateData: { status: StreakStatus.deleted } });
            dispatch({ type: DELETE_TEAM_STREAK, teamStreakId });
            dispatch({ type: NAVIGATE_TO_TEAM_STREAKS });
        } catch (err) {
            if (err.response) {
                dispatch({ type: DELETE_TEAM_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: DELETE_TEAM_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

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
        deleteTeamStreak,
        addFriendToTeamStreak,
        archiveTeamStreak,
        clearArchiveTeamStreakErrorMessage,
    };
};