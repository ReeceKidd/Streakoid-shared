import { Dispatch } from 'redux';
import StreakStatus from '@streakoid/streakoid-sdk/lib/StreakStatus';

import {
    GET_SOLO_STREAK,
    GET_LIVE_SOLO_STREAKS,
    CREATE_SOLO_STREAK,
    GET_LIVE_SOLO_STREAKS_FAIL,
    GET_SOLO_STREAK_FAIL,
    EDIT_SOLO_STREAK,
    EDIT_SOLO_STREAK_FAIL,
    EDIT_SOLO_STREAK_IS_LOADING,
    EDIT_SOLO_STREAK_IS_LOADED,
    UPDATE_SOLO_STREAK_TIMEZONES_FAIL,
    UPDATE_SOLO_STREAK_TIMEZONES,
    CREATE_SOLO_STREAK_IS_LOADING,
    CREATE_SOLO_STREAK_IS_LOADED,
    CREATE_SOLO_STREAK_ERROR,
    CLEAR_CREATE_SOLO_STREAK_ERROR,
    GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING,
    GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADED,
    GET_SOLO_STREAK_IS_LOADING,
    GET_SOLO_STREAK_IS_LOADED,
    GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING,
    GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED,
    GET_ARCHIVED_SOLO_STREAKS,
    GET_ARCHIVED_SOLO_STREAKS_FAIL,
    RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING,
    RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED,
    RESTORE_ARCHIVED_SOLO_STREAK,
    RESTORE_ARCHIVED_SOLO_STREAK_FAIL,
    ARCHIVE_SOLO_STREAK_IS_LOADING,
    ARCHIVE_SOLO_STREAK,
    ARCHIVE_SOLO_STREAK_IS_LOADED,
    ARCHIVE_SOLO_STREAK_FAIL,
    CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE,
    CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE,
    CLEAR_RESTORE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE,
    CREATE_COMPLETE_SOLO_STREAK_TASK_LOADING,
    CREATE_COMPLETE_SOLO_STREAK_TASK,
    CREATE_COMPLETE_SOLO_STREAK_TASK_LOADED,
    CREATE_COMPLETE_SOLO_STREAK_TASK_FAIL,
    CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADING,
    CREATE_INCOMPLETE_SOLO_STREAK_TASK_FAIL,
    CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADED,
    CREATE_INCOMPLETE_SOLO_STREAK_TASK,
    DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING,
    DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED,
    DELETE_ARCHIVED_SOLO_STREAK,
    DELETE_ARCHIVED_SOLO_STREAK_FAIL,
    NAVIGATE_TO_SOLO_STREAKS,
    NAVIGATE_TO_SPECIFIC_SOLO_STREAK,
    NAVIGATE_TO_STREAK_LIMIT_REACHED,
    JOIN_CHALLENGE_LOADED,
    CLEAR_SELECTED_SOLO_STREAK,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { sortByCurrentStreak } from '../helpers/sorters/sortByCurrentStreak';

const soloStreakActions = (streakoid: typeof streakoidSDK) => {
    const getLiveSoloStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            const soloStreaks = await streakoid.soloStreaks.getAll({
                userId,
                status: StreakStatus.live,
            });
            const soloStreaksWithLoadingStates = soloStreaks.map(soloStreak => {
                return {
                    ...soloStreak,
                    completeSoloStreakTaskIsLoading: false,
                    completeSoloStreakTaskErrorMessage: '',
                    incompleteSoloStreakTaskIsLoading: false,
                    incompleteSoloStreakTaskErrorMessage: '',
                };
            });
            dispatch({ type: GET_LIVE_SOLO_STREAKS, payload: soloStreaksWithLoadingStates.sort(sortByCurrentStreak) });
            dispatch({ type: GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_LIVE_SOLO_STREAKS_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_LIVE_SOLO_STREAKS_FAIL, errorMessage: err.message });
            }
        }
    };

    const getArchivedSoloStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            const soloStreaks = await streakoid.soloStreaks.getAll({ userId, status: StreakStatus.archived });
            const soloStreaksWithLoadingStates = soloStreaks.map(soloStreak => {
                return {
                    ...soloStreak,
                    createSoloStreakTaskIsLoading: false,
                    createCompleteSoloStreakTaskErrorMessage: '',
                };
            });
            dispatch({ type: GET_ARCHIVED_SOLO_STREAKS, payload: soloStreaksWithLoadingStates });
            dispatch({ type: GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_ARCHIVED_SOLO_STREAKS_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_ARCHIVED_SOLO_STREAKS_FAIL, errorMessage: err.message });
            }
        }
    };

    const getSoloStreak = (soloStreakId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_SOLO_STREAK_IS_LOADING });
            const soloStreak = await streakoid.soloStreaks.getOne(soloStreakId);
            const soloStreakOwner = await streakoid.users.getOne(soloStreak.userId);
            console.log('soloStreakOwnner', soloStreakOwner);
            const completeSoloStreakTasks = await streakoid.completeSoloStreakTasks.getAll({ streakId: soloStreakId });
            const completedSoloStreakTaskDates = completeSoloStreakTasks.map(
                completeTask => new Date(completeTask.createdAt),
            );
            dispatch({
                type: GET_SOLO_STREAK,
                payload: {
                    ...soloStreak,
                    username: soloStreakOwner.username,
                    userProfileImage: soloStreakOwner.profileImages.originalImageUrl,
                    completedSoloStreakTaskDates,
                },
            });
            dispatch({ type: GET_SOLO_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: NAVIGATE_TO_SOLO_STREAKS });
            dispatch({ type: GET_SOLO_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_SOLO_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_SOLO_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const createSoloStreak = ({
        streakName,
        streakDescription,
        numberOfMinutes,
    }: {
        streakName: string;
        streakDescription?: string;
        numberOfMinutes?: number;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: CREATE_SOLO_STREAK_IS_LOADING });
            dispatch({ type: CLEAR_CREATE_SOLO_STREAK_ERROR });
            const userId = getState().users.currentUser._id;
            const isPayingMember = getState().users.currentUser.membershipInformation.isPayingMember;
            if (!isPayingMember) {
                const userSoloStreaks = await streakoid.soloStreaks.getAll({ userId, status: StreakStatus.live });
                const soloStreaksLimitForFreeAccounts = 2;
                if (userSoloStreaks.length >= soloStreaksLimitForFreeAccounts) {
                    dispatch({ type: NAVIGATE_TO_STREAK_LIMIT_REACHED });
                    dispatch({ type: JOIN_CHALLENGE_LOADED });
                    return;
                }
            }
            const soloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
                streakDescription,
                numberOfMinutes,
            });
            const soloStreakWithLoadingState = {
                ...soloStreak,
                completeSoloStreakTaskIsLoading: false,
                completeSoloStreakTaskErrorMessage: '',
                incompleteSoloStreakTaskIsLoading: false,
                incompleteSoloStreakTaskErrorMessage: '',
            };
            dispatch({ type: CREATE_SOLO_STREAK_IS_LOADED });
            dispatch({ type: CREATE_SOLO_STREAK, payload: soloStreakWithLoadingState });
            dispatch({ type: NAVIGATE_TO_SOLO_STREAKS });
        } catch (err) {
            dispatch({ type: CREATE_SOLO_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: CREATE_SOLO_STREAK_ERROR, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: CREATE_SOLO_STREAK_ERROR, errorMessage: err.message });
            }
        }
    };

    const editSoloStreak = ({
        soloStreakId,
        streakName,
        streakDescription,
        numberOfMinutes,
    }: {
        soloStreakId: string;
        streakName: string;
        streakDescription?: string;
        numberOfMinutes?: number;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: EDIT_SOLO_STREAK_IS_LOADING });
            const soloStreak = await streakoid.soloStreaks.update({
                soloStreakId,
                updateData: {
                    streakName,
                    streakDescription,
                    numberOfMinutes,
                },
            });
            const soloStreakWithLoadingState = {
                ...soloStreak,
                completeSoloStreakTaskIsLoading: false,
                completeSoloStreakTaskErrorMessage: '',
                incompleteSoloStreakTaskIsLoading: false,
                incompleteSoloStreakTaskErrorMessage: '',
            };
            dispatch({ type: EDIT_SOLO_STREAK, soloStreak: soloStreakWithLoadingState });
            dispatch({ type: NAVIGATE_TO_SPECIFIC_SOLO_STREAK, payload: soloStreakId });
            dispatch({ type: EDIT_SOLO_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: EDIT_SOLO_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: EDIT_SOLO_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: EDIT_SOLO_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearEditSoloStreakErrorMessage = (): AppActions => ({
        type: CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE,
    });

    const archiveSoloStreak = (soloStreakId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: ARCHIVE_SOLO_STREAK_IS_LOADING });
            const updatedSoloStreak = await streakoid.soloStreaks.update({
                soloStreakId,
                updateData: { status: StreakStatus.archived },
            });
            const soloStreakWithLoadingState = {
                ...updatedSoloStreak,
                createSoloStreakTaskIsLoading: false,
                createCompleteSoloStreakTaskErrorMessage: '',
            };
            dispatch({ type: ARCHIVE_SOLO_STREAK, payload: soloStreakWithLoadingState });
            dispatch({ type: ARCHIVE_SOLO_STREAK_IS_LOADED });
            dispatch({ type: NAVIGATE_TO_SOLO_STREAKS });
        } catch (err) {
            dispatch({ type: ARCHIVE_SOLO_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: ARCHIVE_SOLO_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: ARCHIVE_SOLO_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearArchiveSoloStreakErrorMessage = (): AppActions => ({
        type: CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE,
    });

    const restoreArchivedSoloStreak = (soloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING });
            const updatedSoloStreak = await streakoid.soloStreaks.update({
                soloStreakId,
                updateData: { status: StreakStatus.live },
            });
            const soloStreakWithLoadingState = {
                ...updatedSoloStreak,
                completeSoloStreakTaskIsLoading: false,
                completeSoloStreakTaskErrorMessage: '',
                incompleteSoloStreakTaskIsLoading: false,
                incompleteSoloStreakTaskErrorMessage: '',
            };
            dispatch({ type: RESTORE_ARCHIVED_SOLO_STREAK, payload: soloStreakWithLoadingState });
            dispatch({ type: RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED });
            dispatch({ type: NAVIGATE_TO_SOLO_STREAKS });
        } catch (err) {
            dispatch({ type: RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: RESTORE_ARCHIVED_SOLO_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: RESTORE_ARCHIVED_SOLO_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearRestoreArchivedSoloStreakErrorMessage = (): AppActions => ({
        type: CLEAR_RESTORE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE,
    });

    const deleteArchivedSoloStreak = (soloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING });
            await streakoid.soloStreaks.update({ soloStreakId, updateData: { status: StreakStatus.deleted } });
            dispatch({ type: DELETE_ARCHIVED_SOLO_STREAK, payload: soloStreakId });
            dispatch({ type: DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED });
            dispatch({ type: NAVIGATE_TO_SOLO_STREAKS });
        } catch (err) {
            dispatch({ type: DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: DELETE_ARCHIVED_SOLO_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: DELETE_ARCHIVED_SOLO_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const updateSoloStreakTimezones = (timezone: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            const userId = getState().users.currentUser._id;
            const soloStreaks = await streakoid.soloStreaks.getAll({ userId });
            await Promise.all(
                soloStreaks.map(soloStreak => {
                    return streakoid.soloStreaks.update({ soloStreakId: soloStreak._id, updateData: { timezone } });
                }),
            );
            dispatch({ type: UPDATE_SOLO_STREAK_TIMEZONES, timezone });
        } catch (err) {
            if (err.response) {
                dispatch({ type: UPDATE_SOLO_STREAK_TIMEZONES_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: UPDATE_SOLO_STREAK_TIMEZONES_FAIL, errorMessage: err.message });
            }
        }
    };

    const completeSoloStreakTask = (soloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_COMPLETE_SOLO_STREAK_TASK_LOADING, soloStreakId });
            const userId = getState().users.currentUser._id;
            const completeSoloStreakTask = await streakoid.completeSoloStreakTasks.create({ soloStreakId, userId });
            dispatch({
                type: CREATE_COMPLETE_SOLO_STREAK_TASK,
                payload: completeSoloStreakTask.streakId,
            });
            dispatch({ type: CREATE_COMPLETE_SOLO_STREAK_TASK_LOADED, soloStreakId });
        } catch (err) {
            dispatch({ type: CREATE_COMPLETE_SOLO_STREAK_TASK_LOADED, soloStreakId });
            if (err.response) {
                dispatch({
                    type: CREATE_COMPLETE_SOLO_STREAK_TASK_FAIL,
                    payload: { soloStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: CREATE_COMPLETE_SOLO_STREAK_TASK_FAIL,
                    payload: { soloStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const incompleteSoloStreakTask = (soloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADING, soloStreakId });
            const userId = getState().users.currentUser._id;
            await streakoid.incompleteSoloStreakTasks.create({ userId, soloStreakId });
            dispatch({
                type: CREATE_INCOMPLETE_SOLO_STREAK_TASK,
                payload: soloStreakId,
            });
            dispatch({ type: CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADED, soloStreakId });
        } catch (err) {
            dispatch({ type: CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADED, soloStreakId });
            if (err.response) {
                dispatch({
                    type: CREATE_INCOMPLETE_SOLO_STREAK_TASK_FAIL,
                    payload: { soloStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: CREATE_INCOMPLETE_SOLO_STREAK_TASK_FAIL,
                    payload: { soloStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const clearSelectedSoloStreak = (): AppActions => ({
        type: CLEAR_SELECTED_SOLO_STREAK,
    });

    return {
        getLiveSoloStreaks,
        getArchivedSoloStreaks,
        getSoloStreak,
        createSoloStreak,
        editSoloStreak,
        clearEditSoloStreakErrorMessage,
        archiveSoloStreak,
        clearArchiveSoloStreakErrorMessage,
        restoreArchivedSoloStreak,
        clearRestoreArchivedSoloStreakErrorMessage,
        deleteArchivedSoloStreak,
        updateSoloStreakTimezones,
        completeSoloStreakTask,
        incompleteSoloStreakTask,
        clearSelectedSoloStreak,
    };
};

export { soloStreakActions };
