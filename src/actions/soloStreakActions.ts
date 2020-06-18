import { Dispatch } from 'redux';

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
    CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADING,
    CREATE_COMPLETE_SOLO_STREAK_LIST_TASK,
    CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED,
    CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_FAIL,
    CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADING,
    CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_FAIL,
    CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADED,
    CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK,
    DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING,
    DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED,
    DELETE_ARCHIVED_SOLO_STREAK,
    DELETE_ARCHIVED_SOLO_STREAK_FAIL,
    NAVIGATE_TO_SPECIFIC_SOLO_STREAK,
    CLEAR_SELECTED_SOLO_STREAK,
    COMPLETE_SELECTED_SOLO_STREAK_IS_LOADING,
    COMPLETE_SELECTED_SOLO_STREAK,
    COMPLETE_SELECTED_SOLO_STREAK_IS_LOADED,
    COMPLETE_SELECTED_SOLO_STREAK_FAIL,
    INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADING,
    INCOMPLETE_SELECTED_SOLO_STREAK,
    INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADED,
    INCOMPLETE_SELECTED_SOLO_STREAK_FAIL,
    UPDATE_SOLO_STREAK_REMINDER_INFO_LOADING,
    UPDATE_SOLO_STREAK_REMINDER_INFO_LOADED,
    UPDATE_SOLO_STREAK_REMINDER_INFO_FAIL,
    UPDATE_SOLO_STREAK_REMINDER_INFO,
} from './types';
import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { sortSoloStreaks } from '../helpers/sorters/sortStreaks';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';
import { getDaysSinceStreakCreation } from '../helpers/streakCalculations/getDaysSinceStreakCreation';
import { getPopulatedActivityFeedItem } from '../helpers/activityFeed/getPopulatedActivityFeedItem';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import { CustomSoloStreakReminder } from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import StreakReminderTypes from '@streakoid/streakoid-models/lib/Types/StreakReminderTypes';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

const soloStreakActions = (streakoid: StreakoidSDK) => {
    const getLiveSoloStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            if (!userId) {
                return;
            }
            const soloStreaks = await streakoid.soloStreaks.getAll({
                userId,
                status: StreakStatus.live,
            });
            const sortedSoloStreaks = sortSoloStreaks(soloStreaks);
            const soloStreaksWithLoadingStates = sortedSoloStreaks.map(soloStreak => {
                return {
                    ...soloStreak,
                    completeSoloStreakListTaskIsLoading: false,
                    completeSoloStreakListTaskErrorMessage: '',
                    incompleteSoloStreakListTaskIsLoading: false,
                    incompleteSoloStreakListTaskErrorMessage: '',
                };
            });
            dispatch({ type: GET_LIVE_SOLO_STREAKS, payload: soloStreaksWithLoadingStates });
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

    const getSoloStreak = (soloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_SOLO_STREAK_IS_LOADING });
            const soloStreak = await streakoid.soloStreaks.getOne(soloStreakId);
            const soloStreakOwner = await streakoid.users.getOne(soloStreak.userId);
            const completeSoloStreakTasks = await streakoid.completeSoloStreakTasks.getAll({ streakId: soloStreakId });
            const completedSoloStreakTaskDates = completeSoloStreakTasks.map(
                completeTask => new Date(completeTask.createdAt),
            );
            const activityFeed = await streakoid.activityFeedItems.getAll({ soloStreakId: soloStreak._id });
            const populatedActivityFeedItems: (ClientActivityFeedItemType | undefined)[] = await Promise.all(
                activityFeed.activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            const supportedPopulatedActivityFeedItems = populatedActivityFeedItems.filter(
                (activityFeedItem): activityFeedItem is ClientActivityFeedItemType => activityFeedItem !== undefined,
            );
            const numberOfRestarts = soloStreak.pastStreaks.length;
            const currentUser = getState().users.currentUser;
            const customStreakReminder =
                soloStreakOwner._id === currentUser._id
                    ? currentUser.pushNotifications.customStreakReminders.find(
                          pushNotification =>
                              pushNotification.streakReminderType === StreakReminderTypes.customSoloStreakReminder &&
                              pushNotification.soloStreakId === soloStreak._id,
                      )
                    : undefined;
            const customSoloStreakReminder =
                customStreakReminder &&
                customStreakReminder.streakReminderType === StreakReminderTypes.customSoloStreakReminder
                    ? customStreakReminder
                    : undefined;
            dispatch({
                type: GET_SOLO_STREAK,
                payload: {
                    ...soloStreak,
                    username: soloStreakOwner.username,
                    userProfileImage: soloStreakOwner.profileImages.originalImageUrl,
                    completedSoloStreakTaskDates,
                    longestStreak: getLongestStreak(soloStreak.currentStreak, soloStreak.pastStreaks),
                    totalTimesTracked: completeSoloStreakTasks.length,
                    daysSinceStreakCreation: getDaysSinceStreakCreation({
                        createdAt: new Date(soloStreak.createdAt),
                        timezone: soloStreak.timezone,
                    }),
                    numberOfRestarts,
                    activityFeed: {
                        totalActivityFeedCount: activityFeed.totalCountOfActivityFeedItems,
                        activityFeedItems: supportedPopulatedActivityFeedItems,
                    },
                    completeSelectedSoloStreakIsLoading: false,
                    completeSelectedSoloStreakErrorMessage: '',
                    incompleteSelectedSoloStreakIsLoading: false,
                    incompleteSelectedSoloStreakErrorMessage: '',
                    customSoloStreakReminder,
                    updateCustomSoloStreakReminderErrorMessage: '',
                    updateCustomSoloStreakReminderIsLoading: false,
                },
            });
            dispatch({ type: GET_SOLO_STREAK_IS_LOADED });
        } catch (err) {
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
            const soloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
                streakDescription,
                numberOfMinutes,
            });
            const soloStreakWithLoadingState = {
                ...soloStreak,
                completeSoloStreakListTaskIsLoading: false,
                completeSoloStreakListTaskErrorMessage: '',
                incompleteSoloStreakListTaskIsLoading: false,
                incompleteSoloStreakListTaskErrorMessage: '',
            };
            dispatch({ type: CREATE_SOLO_STREAK_IS_LOADED });
            dispatch({ type: CREATE_SOLO_STREAK, payload: soloStreakWithLoadingState });
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
                completeSoloStreakListTaskIsLoading: false,
                completeSoloStreakListTaskErrorMessage: '',
                incompleteSoloStreakListTaskIsLoading: false,
                incompleteSoloStreakListTaskErrorMessage: '',
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
                completeSoloStreakListTaskIsLoading: false,
                completeSoloStreakListTaskErrorMessage: '',
                incompleteSoloStreakListTaskIsLoading: false,
                incompleteSoloStreakListTaskErrorMessage: '',
            };
            dispatch({ type: RESTORE_ARCHIVED_SOLO_STREAK, payload: soloStreakWithLoadingState });
            dispatch({ type: RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED });
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
            if (!userId) {
                return;
            }
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

    const completeSoloStreakListTask = (soloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADING, soloStreakId });
            const userId = getState().users.currentUser._id;
            const completeSoloStreakTask = await streakoid.completeSoloStreakTasks.create({ soloStreakId, userId });
            dispatch({
                type: CREATE_COMPLETE_SOLO_STREAK_LIST_TASK,
                payload: completeSoloStreakTask.streakId,
            });
            dispatch({ type: CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED, soloStreakId });
        } catch (err) {
            dispatch({ type: CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED, soloStreakId });
            if (err.response) {
                dispatch({
                    type: CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_FAIL,
                    payload: { soloStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_FAIL,
                    payload: { soloStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const incompleteSoloStreakListTask = (soloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADING, soloStreakId });
            const userId = getState().users.currentUser._id;
            await streakoid.incompleteSoloStreakTasks.create({ userId, soloStreakId });
            dispatch({
                type: CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK,
                payload: soloStreakId,
            });
            dispatch({ type: CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADED, soloStreakId });
        } catch (err) {
            dispatch({ type: CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADED, soloStreakId });
            if (err.response) {
                dispatch({
                    type: CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_FAIL,
                    payload: { soloStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_FAIL,
                    payload: { soloStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const completeSelectedSoloStreakTask = (selectedSoloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: COMPLETE_SELECTED_SOLO_STREAK_IS_LOADING });
            const userId = getState().users.currentUser._id;
            await streakoid.completeSoloStreakTasks.create({ soloStreakId: selectedSoloStreakId, userId });
            dispatch({
                type: COMPLETE_SELECTED_SOLO_STREAK,
                payload: { selectedSoloStreakId },
            });
            dispatch({ type: COMPLETE_SELECTED_SOLO_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: COMPLETE_SELECTED_SOLO_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({
                    type: COMPLETE_SELECTED_SOLO_STREAK_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: COMPLETE_SELECTED_SOLO_STREAK_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    const incompleteSelectedSoloStreakTask = (selectedSoloStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADING });
            const userId = getState().users.currentUser._id;
            await streakoid.incompleteSoloStreakTasks.create({ soloStreakId: selectedSoloStreakId, userId });
            dispatch({
                type: INCOMPLETE_SELECTED_SOLO_STREAK,
                payload: { selectedSoloStreakId },
            });
            dispatch({ type: INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({
                    type: INCOMPLETE_SELECTED_SOLO_STREAK_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: INCOMPLETE_SELECTED_SOLO_STREAK_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    const updateCustomSoloStreakReminder = ({
        customSoloStreakReminder,
    }: {
        customSoloStreakReminder: CustomSoloStreakReminder;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: UPDATE_SOLO_STREAK_REMINDER_INFO_LOADING });

            dispatch({
                type: UPDATE_SOLO_STREAK_REMINDER_INFO,
                payload: { customSoloStreakReminder },
            });

            dispatch({ type: UPDATE_SOLO_STREAK_REMINDER_INFO_LOADED });
        } catch (err) {
            dispatch({ type: UPDATE_SOLO_STREAK_REMINDER_INFO_LOADED });
            if (err.response) {
                dispatch({
                    type: UPDATE_SOLO_STREAK_REMINDER_INFO_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: UPDATE_SOLO_STREAK_REMINDER_INFO_FAIL,
                    payload: err.message,
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
        completeSoloStreakListTask,
        incompleteSoloStreakListTask,
        clearSelectedSoloStreak,
        completeSelectedSoloStreakTask,
        incompleteSelectedSoloStreakTask,
        updateCustomSoloStreakReminder,
    };
};

export { soloStreakActions };
