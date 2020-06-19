import { Dispatch } from 'redux';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import {
    GET_LIVE_CHALLENGE_STREAKS_LOADING,
    GET_LIVE_CHALLENGE_STREAKS_LOADED,
    GET_LIVE_CHALLENGE_STREAKS,
    GET_LIVE_CHALLENGE_STREAKS_FAIL,
    GET_ARCHIVED_CHALLENGE_STREAKS_LOADING,
    GET_ARCHIVED_CHALLENGE_STREAKS_LOADED,
    GET_ARCHIVED_CHALLENGE_STREAKS,
    GET_ARCHIVED_CHALLENGE_STREAKS_FAIL,
    COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING,
    COMPLETE_CHALLENGE_STREAK_LIST_TASK,
    COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED,
    COMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL,
    INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING,
    INCOMPLETE_CHALLENGE_STREAK_LIST_TASK,
    INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED,
    INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL,
    GET_CHALLENGE_STREAK_LOADED,
    GET_CHALLENGE_STREAK,
    GET_CHALLENGE_STREAK_LOADING,
    GET_CHALLENGE_STREAK_FAIL,
    UPDATE_CHALLENGE_STREAK_TIMEZONES,
    UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL,
    ARCHIVE_CHALLENGE_STREAK_LOADING,
    ARCHIVE_CHALLENGE_STREAK,
    ARCHIVE_CHALLENGE_STREAK_LOADED,
    ARCHIVE_CHALLENGE_STREAK_FAIL,
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
    COMPLETE_SELECTED_CHALLENGE_STREAK,
    COMPLETE_SELECTED_CHALLENGE_STREAK_LOADING,
    COMPLETE_SELECTED_CHALLENGE_STREAK_LOADED,
    COMPLETE_SELECTED_CHALLENGE_STREAK_FAIL,
    INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADING,
    INCOMPLETE_SELECTED_CHALLENGE_STREAK,
    INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADED,
    INCOMPLETE_SELECTED_CHALLENGE_STREAK_FAIL,
    UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADED,
    UPDATE_CHALLENGE_STREAK_REMINDER_INFO,
    UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADING,
    UPDATE_CHALLENGE_STREAK_REMINDER_INFO_FAIL,
    GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS_LOADING,
    GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS_FAIL,
    GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS_LOADED,
    GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS,
} from './types';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';
import { getDaysSinceStreakCreation } from '../helpers/streakCalculations/getDaysSinceStreakCreation';
import { getPopulatedActivityFeedItem } from '../helpers/activityFeed/getPopulatedActivityFeedItem';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import { SelectedChallengeStreak } from '../reducers/challengeStreakReducer';
import { CustomChallengeStreakReminder } from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import StreakReminderTypes from '@streakoid/streakoid-models/lib/Types/StreakReminderTypes';

const challengeStreakActions = (streakoid: StreakoidSDK) => {
    const getLiveChallengeStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_LIVE_CHALLENGE_STREAKS_LOADING });
            const currentUser = getState().users.currentUser;
            const userId = currentUser._id;
            if (!userId) {
                return;
            }
            const challengeStreaks = await streakoid.challengeStreaks.getAll({
                userId,
                status: StreakStatus.live,
            });
            const challengeStreaksWithClientData = await Promise.all(
                challengeStreaks.map(async challengeStreak => {
                    const challenge = await streakoid.challenges.getOne({
                        challengeId: challengeStreak.challengeId,
                    });
                    return {
                        ...challengeStreak,
                        challengeName: challenge.name,
                        challengeDescription: challenge.description,
                        completeChallengeStreakListTaskIsLoading: false,
                        completeChallengeStreakListTaskErrorMessage: '',
                        incompleteChallengeStreakListTaskIsLoading: false,
                        incompleteChallengeStreakListTaskErrorMessage: '',
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

    const getLiveIncompleteChallengeStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS_LOADING });
            const currentUser = getState().users.currentUser;
            const userId = currentUser._id;
            if (!userId) {
                return;
            }
            const challengeStreaks = await streakoid.challengeStreaks.getAll({
                userId,
                status: StreakStatus.live,
                completedToday: false,
            });
            console.log('challengeStreaks', challengeStreaks);
            const challengeStreaksWithClientData = await Promise.all(
                challengeStreaks.map(async challengeStreak => {
                    const challenge = await streakoid.challenges.getOne({
                        challengeId: challengeStreak.challengeId,
                    });
                    return {
                        ...challengeStreak,
                        challengeName: challenge.name,
                        challengeDescription: challenge.description,
                        completeChallengeStreakListTaskIsLoading: false,
                        completeChallengeStreakListTaskErrorMessage: '',
                        incompleteChallengeStreakListTaskIsLoading: false,
                        incompleteChallengeStreakListTaskErrorMessage: '',
                    };
                }),
            );
            dispatch({
                type: GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS,
                payload: challengeStreaksWithClientData,
            });
            dispatch({ type: GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS_LOADED });
        } catch (err) {
            dispatch({ type: GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS_LOADED });
            if (err.response) {
                dispatch({ type: GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_LIVE_INCOMPLETE_CHALLENGE_STREAKS_FAIL, payload: err.message });
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
                        challengeDescription: challenge.description,
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

    const getChallengeStreak = ({ challengeStreakId }: { challengeStreakId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGE_STREAK_LOADING });
            const challengeStreak = await streakoid.challengeStreaks.getOne({ challengeStreakId });
            const { currentStreak, pastStreaks, timezone, createdAt } = challengeStreak;
            const challengeStreakOwner = await streakoid.users.getOne(challengeStreak.userId);
            const challenge = await streakoid.challenges.getOne({ challengeId: challengeStreak.challengeId });
            const completeChallengeStreakListTasks = await streakoid.completeChallengeStreakTasks.getAll({
                challengeStreakId,
            });
            const completedChallengeStreakTaskDates = completeChallengeStreakListTasks.map(
                completeTask => new Date(completeTask.createdAt),
            );
            const activityFeed = await streakoid.activityFeedItems.getAll({ challengeStreakId: challengeStreak._id });
            const populatedActivityFeedItems: (ClientActivityFeedItemType | undefined)[] = await Promise.all(
                activityFeed.activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            const supportedPopulatedActivityFeedItems = populatedActivityFeedItems.filter(
                (activityFeedItem): activityFeedItem is ClientActivityFeedItemType => activityFeedItem !== undefined,
            );
            const currentUser = getState().users.currentUser;
            const customStreakReminder =
                challengeStreakOwner._id === currentUser._id
                    ? currentUser.pushNotifications.customStreakReminders.find(
                          pushNotification =>
                              pushNotification.streakReminderType ===
                                  StreakReminderTypes.customChallengeStreakReminder &&
                              pushNotification.challengeStreakId === challengeStreak._id,
                      )
                    : undefined;
            const customChallengeStreakReminder =
                customStreakReminder &&
                customStreakReminder.streakReminderType === StreakReminderTypes.customChallengeStreakReminder
                    ? customStreakReminder
                    : undefined;
            const challengeStreakWithLoadingStates: SelectedChallengeStreak = {
                ...challengeStreak,
                challengeName: challenge.name,
                challengeDescription: challenge.description,
                completeChallengeStreakListTaskIsLoading: false,
                completeChallengeStreakListTaskErrorMessage: '',
                incompleteChallengeStreakListTaskIsLoading: false,
                incompleteChallengeStreakListTaskErrorMessage: '',
                completedChallengeStreakTaskDates,
                username: challengeStreakOwner.username,
                userProfileImage: challengeStreakOwner.profileImages.originalImageUrl,
                longestStreak: getLongestStreak(currentStreak, pastStreaks),
                totalTimesTracked: completeChallengeStreakListTasks.length,
                daysSinceStreakCreation: getDaysSinceStreakCreation({
                    createdAt: new Date(createdAt),
                    timezone,
                }),
                numberOfRestarts: pastStreaks.length,
                activityFeed: {
                    totalActivityFeedCount: activityFeed.totalCountOfActivityFeedItems,
                    activityFeedItems: supportedPopulatedActivityFeedItems,
                },
                completeSelectedChallengeStreakIsLoading: false,
                completeSelectedChallengeStreakErrorMessage: '',
                incompleteSelectedChallengeStreakIsLoading: false,
                incompleteSelectedChallengeStreakErrorMessage: '',
                customChallengeStreakReminder,
                updateCustomChallengeStreakReminderPushNotificationIsLoading: false,
                updateCustomChallengeStreakReminderPushNotificationErrorMessage: '',
            };
            dispatch({ type: GET_CHALLENGE_STREAK, payload: challengeStreakWithLoadingStates });
            dispatch({ type: GET_CHALLENGE_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: GET_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: GET_CHALLENGE_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_CHALLENGE_STREAK_FAIL, payload: err.message });
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
            const { currentStreak, pastStreaks, createdAt, timezone } = updatedChallengeStreak;
            const currentUser = getState().users.currentUser;
            const challenge = await streakoid.challenges.getOne({ challengeId: updatedChallengeStreak.challengeId });
            const challengeStreakWithLoadingState: SelectedChallengeStreak = {
                ...updatedChallengeStreak,
                challengeName: challenge.name,
                challengeDescription: challenge.description,
                completeChallengeStreakListTaskIsLoading: false,
                completeChallengeStreakListTaskErrorMessage: '',
                incompleteChallengeStreakListTaskIsLoading: false,
                incompleteChallengeStreakListTaskErrorMessage: '',
                completedChallengeStreakTaskDates: [],
                username: currentUser.username,
                userProfileImage: currentUser.profileImages.originalImageUrl,
                longestStreak: getLongestStreak(currentStreak, pastStreaks),
                totalTimesTracked: 0,
                daysSinceStreakCreation: getDaysSinceStreakCreation({
                    createdAt: new Date(createdAt),
                    timezone,
                }),
                numberOfRestarts: pastStreaks.length,
                activityFeed: {
                    totalActivityFeedCount: 0,
                    activityFeedItems: [],
                },
                completeSelectedChallengeStreakIsLoading: false,
                completeSelectedChallengeStreakErrorMessage: '',
                incompleteSelectedChallengeStreakIsLoading: false,
                incompleteSelectedChallengeStreakErrorMessage: '',
                updateCustomChallengeStreakReminderPushNotificationIsLoading: false,
                updateCustomChallengeStreakReminderPushNotificationErrorMessage: '',
            };
            dispatch({ type: ARCHIVE_CHALLENGE_STREAK, payload: challengeStreakWithLoadingState });
            dispatch({ type: ARCHIVE_CHALLENGE_STREAK_LOADED });
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
            const { currentStreak, pastStreaks, createdAt, timezone } = updatedChallengeStreak;
            const currentUser = getState().users.currentUser;
            const challenge = await streakoid.challenges.getOne({ challengeId: updatedChallengeStreak.challengeId });
            const completeChallengeStreakListTasks = await streakoid.completeChallengeStreakTasks.getAll({
                challengeStreakId: updatedChallengeStreak._id,
            });
            const challengeStreakWithLoadingState: SelectedChallengeStreak = {
                ...updatedChallengeStreak,
                challengeName: challenge.name,
                challengeDescription: challenge.description,
                completeChallengeStreakListTaskIsLoading: false,
                completeChallengeStreakListTaskErrorMessage: '',
                incompleteChallengeStreakListTaskIsLoading: false,
                incompleteChallengeStreakListTaskErrorMessage: '',
                completedChallengeStreakTaskDates: [],
                username: currentUser.username,
                userProfileImage: currentUser.profileImages.originalImageUrl,
                longestStreak: getLongestStreak(currentStreak, pastStreaks),
                totalTimesTracked: completeChallengeStreakListTasks.length,
                daysSinceStreakCreation: getDaysSinceStreakCreation({
                    createdAt: new Date(createdAt),
                    timezone,
                }),
                numberOfRestarts: pastStreaks.length,
                activityFeed: {
                    totalActivityFeedCount: 0,
                    activityFeedItems: [],
                },
                completeSelectedChallengeStreakIsLoading: false,
                completeSelectedChallengeStreakErrorMessage: '',
                incompleteSelectedChallengeStreakIsLoading: false,
                incompleteSelectedChallengeStreakErrorMessage: '',
                updateCustomChallengeStreakReminderPushNotificationIsLoading: false,
                updateCustomChallengeStreakReminderPushNotificationErrorMessage: '',
            };
            dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK, payload: challengeStreakWithLoadingState });
            dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED });
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
        } catch (err) {
            dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const completeChallengeStreakListTask = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING, challengeStreakId });
            const userId = getState().users.currentUser._id;
            const completeChallengeStreakListTask = await streakoid.completeChallengeStreakTasks.create({
                challengeStreakId,
                userId,
            });
            dispatch({
                type: COMPLETE_CHALLENGE_STREAK_LIST_TASK,
                payload: completeChallengeStreakListTask.challengeStreakId,
            });
            dispatch({ type: COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED, challengeStreakId });
        } catch (err) {
            dispatch({ type: COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED, challengeStreakId });
            if (err.response) {
                dispatch({
                    type: COMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: COMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const completeSelectedChallengeStreakTask = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: COMPLETE_SELECTED_CHALLENGE_STREAK_LOADING });
            const userId = getState().users.currentUser._id;
            const completeChallengeStreakListTask = await streakoid.completeChallengeStreakTasks.create({
                challengeStreakId,
                userId,
            });
            dispatch({
                type: COMPLETE_SELECTED_CHALLENGE_STREAK,
                payload: completeChallengeStreakListTask.challengeStreakId,
            });
            dispatch({ type: COMPLETE_SELECTED_CHALLENGE_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: COMPLETE_SELECTED_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({
                    type: COMPLETE_SELECTED_CHALLENGE_STREAK_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: COMPLETE_SELECTED_CHALLENGE_STREAK_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    const incompleteChallengeStreakListTask = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING, challengeStreakId });
            const userId = getState().users.currentUser._id;
            await streakoid.incompleteChallengeStreakTasks.create({ userId, challengeStreakId });
            dispatch({
                type: INCOMPLETE_CHALLENGE_STREAK_LIST_TASK,
                payload: challengeStreakId,
            });
            getLiveIncompleteChallengeStreaks();
            dispatch({ type: INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED, challengeStreakId });
        } catch (err) {
            dispatch({ type: INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED, challengeStreakId });
            if (err.response) {
                dispatch({
                    type: INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const incompleteSelectedChallengeStreakTask = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADING });
            const userId = getState().users.currentUser._id;
            const completeChallengeStreakListTask = await streakoid.incompleteChallengeStreakTasks.create({
                challengeStreakId,
                userId,
            });
            dispatch({
                type: INCOMPLETE_SELECTED_CHALLENGE_STREAK,
                payload: completeChallengeStreakListTask.challengeStreakId,
            });
            dispatch({ type: INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({
                    type: INCOMPLETE_SELECTED_CHALLENGE_STREAK_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: INCOMPLETE_SELECTED_CHALLENGE_STREAK_FAIL,
                    payload: err.message,
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
            if (!userId) {
                return;
            }
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

    const updateCustomChallengeStreakReminderPushNotification = ({
        customChallengeStreakReminder,
    }: {
        customChallengeStreakReminder: CustomChallengeStreakReminder;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADING });

            dispatch({
                type: UPDATE_CHALLENGE_STREAK_REMINDER_INFO,
                payload: { customChallengeStreakReminder },
            });

            dispatch({ type: UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADED });
        } catch (err) {
            dispatch({ type: UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADED });
            if (err.response) {
                dispatch({
                    type: UPDATE_CHALLENGE_STREAK_REMINDER_INFO_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: UPDATE_CHALLENGE_STREAK_REMINDER_INFO_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    const clearSelectedChallengeStreak = (): AppActions => ({
        type: CLEAR_SELECTED_CHALLENGE_STREAK,
    });

    return {
        getLiveChallengeStreaks,
        getLiveIncompleteChallengeStreaks,
        getArchivedChallengeStreaks,
        getChallengeStreak,
        archiveChallengeStreak,
        clearArchiveChallengeStreakErrorMessage,
        restoreArchivedChallengeStreak,
        clearRestoreArchivedChallengeStreakErrorMessage,
        deleteArchivedChallengeStreak,
        completeChallengeStreakListTask,
        completeSelectedChallengeStreakTask,
        incompleteChallengeStreakListTask,
        incompleteSelectedChallengeStreakTask,
        updateChallengeStreakTimezones,
        updateCustomChallengeStreakReminderPushNotification,
        clearSelectedChallengeStreak,
    };
};

export { challengeStreakActions };
