import { Dispatch } from 'redux';
import StreakStatus from '@streakoid/streakoid-sdk/lib/StreakStatus';

import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import {
    GET_LIVE_CHALLENGE_STREAKS_LOADING,
    GET_LIVE_CHALLENGE_STREAKS_LOADED,
    GET_LIVE_CHALLENGE_STREAKS,
    GET_LIVE_CHALLENGE_STREAKS_FAIL,
    GET_ARCHIVED_CHALLENGE_STREAKS_LOADING,
    GET_ARCHIVED_CHALLENGE_STREAKS_LOADED,
    GET_ARCHIVED_CHALLENGE_STREAKS,
    GET_ARCHIVED_CHALLENGE_STREAKS_FAIL,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL,
    GET_SELECTED_CHALLENGE_STREAK_LOADED,
    GET_SELECTED_CHALLENGE_STREAK,
    GET_SELECTED_CHALLENGE_STREAK_LOADING,
    GET_SELECTED_CHALLENGE_STREAK_FAIL,
    UPDATE_CHALLENGE_STREAK_TIMEZONES,
    UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL,
    ARCHIVE_CHALLENGE_STREAK_LOADING,
    ARCHIVE_CHALLENGE_STREAK,
    ARCHIVE_CHALLENGE_STREAK_LOADED,
    ARCHIVE_CHALLENGE_STREAK_FAIL,
    NAVIGATE_TO_CHALLENGE_STREAKS,
    CLEAR_ARCHIVE_CHALLENGE_STREAK_ERROR_MESSAGE,
    RESTORE_ARCHIVED_CHALLENGE_STREAK_FAIL,
    RESTORE_ARCHIVED_CHALLENGE_STREAK,
    RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED,
    RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADING,
    CLEAR_RESTORE_ARCHIVED_CHALLENGE_STREAK_ERROR_MESSAGE,
    DELETE_ARCHIVED_CHALLENGE_STREAK,
    DELETE_ARCHIVED_CHALLENGE_STREAK_LOADING,
    DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED,
    DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL,
    CLEAR_SELECTED_CHALLENGE_STREAK,
} from './types';
import { sortChallengeStreaks } from '../helpers/sorters/sortStreaks';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';
import { getAverageStreak } from '../helpers/streakCalculations/getAverageStreak';

const challengeStreakActions = (streakoid: typeof streakoidSDK) => {
    const getLiveChallengeStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_LIVE_CHALLENGE_STREAKS_LOADING });
            const currentUser = getState().users.currentUser;
            const userId = currentUser._id;
            const challengeStreaks = await streakoid.challengeStreaks.getAll({
                userId,
                status: StreakStatus.live,
            });
            const sortedChallengeStreaks = sortChallengeStreaks(challengeStreaks);
            const challengeStreaksWithClientData = await Promise.all(
                sortedChallengeStreaks.map(async challengeStreak => {
                    const challenge = await streakoid.challenges.getOne({
                        challengeId: challengeStreak.challengeId,
                    });
                    return {
                        ...challengeStreak,
                        challengeName: challenge.name,
                        challengeDescription: challenge.description,
                        completeChallengeStreakTaskIsLoading: false,
                        completeChallengeStreakTaskErrorMessage: '',
                        incompleteChallengeStreakTaskIsLoading: false,
                        incompleteChallengeStreakTaskErrorMessage: '',
                    };
                }),
            );
            dispatch({
                type: GET_LIVE_CHALLENGE_STREAKS,
                payload: challengeStreaksWithClientData,
            });
            dispatch({ type: GET_LIVE_CHALLENGE_STREAKS_LOADED });
        } catch (err) {
            dispatch({ type: GET_LIVE_CHALLENGE_STREAKS_LOADED });
            if (err.response) {
                dispatch({ type: GET_LIVE_CHALLENGE_STREAKS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_LIVE_CHALLENGE_STREAKS_FAIL, payload: err.message });
            }
        }
    };

    const getArchivedChallengeStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_ARCHIVED_CHALLENGE_STREAKS_LOADING });
            const currentUser = getState().users.currentUser;
            const userId = currentUser._id;
            const challengeStreaks = await streakoid.challengeStreaks.getAll({
                userId,
                status: StreakStatus.archived,
            });
            const challengeStreaksWithLoadingStates = await Promise.all(
                challengeStreaks.map(async challengeStreak => {
                    const challenge = await streakoid.challenges.getOne({ challengeId: challengeStreak.challengeId });
                    return {
                        ...challengeStreak,
                        challengeName: challenge.name,
                        completeChallengeStreakTaskIsLoading: false,
                        completeChallengeStreakTaskErrorMessage: '',
                        incompleteChallengeStreakTaskIsLoading: false,
                        incompleteChallengeStreakTaskErrorMessage: '',
                    };
                }),
            );
            dispatch({ type: GET_ARCHIVED_CHALLENGE_STREAKS, payload: challengeStreaksWithLoadingStates });
            dispatch({ type: GET_ARCHIVED_CHALLENGE_STREAKS_LOADED });
        } catch (err) {
            dispatch({ type: GET_ARCHIVED_CHALLENGE_STREAKS_LOADED });
            if (err.response) {
                dispatch({ type: GET_ARCHIVED_CHALLENGE_STREAKS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_ARCHIVED_CHALLENGE_STREAKS_FAIL, payload: err.message });
            }
        }
    };

    const getSelectedChallengeStreak = ({ challengeStreakId }: { challengeStreakId: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_SELECTED_CHALLENGE_STREAK_LOADING });
            const challengeStreak = await streakoid.challengeStreaks.getOne({ challengeStreakId });
            const challengeStreakOwner = await streakoid.users.getOne(challengeStreak.userId);
            const challenge = await streakoid.challenges.getOne({ challengeId: challengeStreak.challengeId });
            const completeChallengeStreakTasks = await streakoid.completeChallengeStreakTasks.getAll({
                challengeStreakId,
            });
            const completedChallengeStreakTaskDates = completeChallengeStreakTasks.map(
                completeTask => new Date(completeTask.createdAt),
            );
            const challengeStreakWithLoadingStates = {
                ...challengeStreak,
                challengeName: challenge.name,
                challengeDescription: challenge.description,
                joinChallengeStreakTaskIsLoading: false,
                joinChallengeStreakTaskErrorMessage: '',
                completeChallengeStreakTaskIsLoading: false,
                completeChallengeStreakTaskErrorMessage: '',
                incompleteChallengeStreakTaskIsLoading: false,
                incompleteChallengeStreakTaskErrorMessage: '',
                completedChallengeStreakTaskDates,
                username: challengeStreakOwner.username,
                userProfileImage: challengeStreakOwner.profileImages.originalImageUrl,
                longestStreak: getLongestStreak(challengeStreak.currentStreak, challengeStreak.pastStreaks),
                averageStreak: getAverageStreak(challengeStreak.currentStreak, challengeStreak.pastStreaks),
                totalTimesTracked: completeChallengeStreakTasks.length,
            };
            dispatch({ type: GET_SELECTED_CHALLENGE_STREAK, payload: challengeStreakWithLoadingStates });
            dispatch({ type: GET_SELECTED_CHALLENGE_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: GET_SELECTED_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: GET_SELECTED_CHALLENGE_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_SELECTED_CHALLENGE_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const archiveChallengeStreak = ({ challengeStreakId }: { challengeStreakId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: ARCHIVE_CHALLENGE_STREAK_LOADING });
            const updatedChallengeStreak = await streakoid.challengeStreaks.update({
                challengeStreakId,
                updateData: { status: StreakStatus.archived },
            });
            const currentUser = getState().users.currentUser;
            const challenge = await streakoid.challenges.getOne({ challengeId: updatedChallengeStreak.challengeId });
            const completeChallengeStreakTasks = await streakoid.completeChallengeStreakTasks.getAll({
                challengeStreakId: updatedChallengeStreak._id,
            });
            const challengeStreakWithLoadingState = {
                ...updatedChallengeStreak,
                challengeName: challenge.name,
                challengeDescription: challenge.description,
                joinChallengeStreakTaskIsLoading: false,
                joinChallengeStreakTaskErrorMessage: '',
                completeChallengeStreakTaskIsLoading: false,
                completeChallengeStreakTaskErrorMessage: '',
                incompleteChallengeStreakTaskIsLoading: false,
                incompleteChallengeStreakTaskErrorMessage: '',
                completedChallengeStreakTaskDates: [],
                username: currentUser.username,
                userProfileImage: currentUser.profileImages.originalImageUrl,
                longestStreak: getLongestStreak(
                    updatedChallengeStreak.currentStreak,
                    updatedChallengeStreak.pastStreaks,
                ),
                averageStreak: getAverageStreak(
                    updatedChallengeStreak.currentStreak,
                    updatedChallengeStreak.pastStreaks,
                ),
                totalTimesTracked: completeChallengeStreakTasks.length,
            };
            dispatch({ type: ARCHIVE_CHALLENGE_STREAK, payload: challengeStreakWithLoadingState });
            dispatch({ type: ARCHIVE_CHALLENGE_STREAK_LOADED });
            dispatch({ type: NAVIGATE_TO_CHALLENGE_STREAKS });
        } catch (err) {
            dispatch({ type: ARCHIVE_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: ARCHIVE_CHALLENGE_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: ARCHIVE_CHALLENGE_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const clearArchiveChallengeStreakErrorMessage = (): AppActions => ({
        type: CLEAR_ARCHIVE_CHALLENGE_STREAK_ERROR_MESSAGE,
    });

    const restoreArchivedChallengeStreak = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADING });
            const updatedChallengeStreak = await streakoid.challengeStreaks.update({
                challengeStreakId,
                updateData: { status: StreakStatus.live },
            });
            const currentUser = getState().users.currentUser;
            const challenge = await streakoid.challenges.getOne({ challengeId: updatedChallengeStreak.challengeId });
            const completeChallengeStreakTasks = await streakoid.completeChallengeStreakTasks.getAll({
                challengeStreakId: updatedChallengeStreak._id,
            });
            const challengeStreakWithLoadingState = {
                ...updatedChallengeStreak,
                challengeName: challenge.name,
                challengeDescription: challenge.description,
                joinChallengeStreakTaskIsLoading: false,
                joinChallengeStreakTaskErrorMessage: '',
                completeChallengeStreakTaskIsLoading: false,
                completeChallengeStreakTaskErrorMessage: '',
                incompleteChallengeStreakTaskIsLoading: false,
                incompleteChallengeStreakTaskErrorMessage: '',
                completedChallengeStreakTaskDates: [],
                username: currentUser.username,
                userProfileImage: currentUser.profileImages.originalImageUrl,
                longestStreak: getLongestStreak(
                    updatedChallengeStreak.currentStreak,
                    updatedChallengeStreak.pastStreaks,
                ),
                averageStreak: getAverageStreak(
                    updatedChallengeStreak.currentStreak,
                    updatedChallengeStreak.pastStreaks,
                ),
                totalTimesTracked: completeChallengeStreakTasks.length,
            };
            dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK, payload: challengeStreakWithLoadingState });
            dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED });
            dispatch({ type: NAVIGATE_TO_CHALLENGE_STREAKS });
        } catch (err) {
            dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const clearRestoreArchivedChallengeStreakErrorMessage = (): AppActions => ({
        type: CLEAR_RESTORE_ARCHIVED_CHALLENGE_STREAK_ERROR_MESSAGE,
    });

    const deleteArchivedChallengeStreak = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK_LOADING });
            await streakoid.challengeStreaks.update({
                challengeStreakId,
                updateData: { status: StreakStatus.deleted },
            });
            dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK, payload: challengeStreakId });
            dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED });
            dispatch({ type: NAVIGATE_TO_CHALLENGE_STREAKS });
        } catch (err) {
            dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const completeChallengeStreakTask = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING, challengeStreakId });
            const userId = getState().users.currentUser._id;
            const completeChallengeStreakTask = await streakoid.completeChallengeStreakTasks.create({
                challengeStreakId,
                userId,
            });
            dispatch({
                type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK,
                payload: completeChallengeStreakTask.challengeStreakId,
            });
            dispatch({ type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED, challengeStreakId });
        } catch (err) {
            dispatch({ type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED, challengeStreakId });
            if (err.response) {
                dispatch({
                    type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const incompleteChallengeStreakTask = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING, challengeStreakId });
            const userId = getState().users.currentUser._id;
            await streakoid.incompleteChallengeStreakTasks.create({ userId, challengeStreakId });
            dispatch({
                type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK,
                payload: challengeStreakId,
            });
            dispatch({ type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED, challengeStreakId });
        } catch (err) {
            dispatch({ type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED, challengeStreakId });
            if (err.response) {
                dispatch({
                    type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const updateChallengeStreakTimezones = (timezone: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            const userId = getState().users.currentUser._id;
            const challengeStreaks = await streakoid.challengeStreaks.getAll({ userId });
            await Promise.all(
                challengeStreaks.map(challengeStreak => {
                    return streakoid.challengeStreaks.update({
                        challengeStreakId: challengeStreak._id,
                        updateData: { timezone },
                    });
                }),
            );
            dispatch({ type: UPDATE_CHALLENGE_STREAK_TIMEZONES, payload: timezone });
        } catch (err) {
            if (err.response) {
                dispatch({ type: UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL, payload: err.message });
            }
        }
    };

    const clearSelectedChallengeStreak = (): AppActions => ({
        type: CLEAR_SELECTED_CHALLENGE_STREAK,
    });

    return {
        getLiveChallengeStreaks,
        getArchivedChallengeStreaks,
        getSelectedChallengeStreak,
        archiveChallengeStreak,
        clearArchiveChallengeStreakErrorMessage,
        restoreArchivedChallengeStreak,
        clearRestoreArchivedChallengeStreakErrorMessage,
        deleteArchivedChallengeStreak,
        completeChallengeStreakTask,
        incompleteChallengeStreakTask,
        updateChallengeStreakTimezones,
        clearSelectedChallengeStreak,
    };
};

export { challengeStreakActions };
