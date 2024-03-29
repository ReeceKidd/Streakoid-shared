import { Dispatch } from 'redux';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import {
    GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS_LOADING,
    GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS_LOADED,
    GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS,
    GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS_FAIL,
    GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS_LOADING,
    GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS_LOADED,
    GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS,
    GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS_FAIL,
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
    REORDER_LIVE_CHALLENGE_STREAKS_LOADING,
    REORDER_LIVE_CHALLENGE_STREAKS,
    REORDER_LIVE_CHALLENGE_STREAKS_LOADED,
    REORDER_LIVE_CHALLENGE_STREAKS_FAIL,
    RECOVER_CHALLENGE_STREAK_FAIL,
    RECOVER_CHALLENGE_STREAK,
    RECOVER_CHALLENGE_STREAK_LOADED,
    RECOVER_CHALLENGE_STREAK_LOADING,
} from './types';
import { getDaysSinceStreakCreation } from '../helpers/streakCalculations/getDaysSinceStreakCreation';
import { getPopulatedActivityFeedItem } from '../helpers/activityFeed/getPopulatedActivityFeedItem';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import { SelectedChallengeStreak, ChallengeStreakListItem } from '../reducers/challengeStreakReducer';
import { CustomChallengeStreakReminder } from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import StreakReminderTypes from '@streakoid/streakoid-models/lib/Types/StreakReminderTypes';
import arrayMove from 'array-move';

const challengeStreakActions = (streakoid: StreakoidSDK) => {
    const getCurrentUserLiveChallengeStreaks = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS_LOADING });
            const challengeStreaks = await streakoid.user.challengeStreaks({
                status: StreakStatus.live,
            });

            const challengeStreaksWithClientData = await Promise.all(
                challengeStreaks.map(async (challengeStreak, index) => {
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
                        recoverChallengeStreakIsLoading: false,
                        recoverChallengeStreakErrorMessage: '',
                        userDefinedIndex: challengeStreak.userDefinedIndex || index,
                    };
                }),
            );
            const sortedChallengeStreaksWithClientData = challengeStreaksWithClientData.sort(
                (challengeStreakA, challengeStreakB) => {
                    return challengeStreakA.userDefinedIndex - challengeStreakB.userDefinedIndex;
                },
            );
            dispatch({
                type: GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS,
                payload: sortedChallengeStreaksWithClientData,
            });
            dispatch({ type: GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS_LOADED });
            if (err.response) {
                dispatch({ type: GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_CURRENT_USER_LIVE_CHALLENGE_STREAKS_FAIL, payload: err.message });
            }
        }
    };

    const getCurrentUserArchivedChallengeStreaks = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS_LOADING });
            const challengeStreaks = await streakoid.user.challengeStreaks({
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
            dispatch({ type: GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS, payload: challengeStreaksWithLoadingStates });
            dispatch({ type: GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS_LOADED });
            if (err.response) {
                dispatch({
                    type: GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({ type: GET_CURRENT_USER_ARCHIVED_CHALLENGE_STREAKS_FAIL, payload: err.message });
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
            const { pastStreaks, timezone, createdAt } = challengeStreak;
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
                activityFeed &&
                    activityFeed.activityFeedItems &&
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
            const selectedChallengeStreak: SelectedChallengeStreak = {
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
            dispatch({ type: GET_CHALLENGE_STREAK, payload: selectedChallengeStreak });
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
            const { pastStreaks, createdAt, timezone } = updatedChallengeStreak;
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
    ): Promise<void> => {
        try {
            dispatch({ type: RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADING });
            const updatedChallengeStreak = await streakoid.challengeStreaks.update({
                challengeStreakId,
                updateData: { status: StreakStatus.live },
            });
            const challengeStreakWithLoadingState: ChallengeStreakListItem = {
                ...updatedChallengeStreak,
                completeChallengeStreakListTaskIsLoading: false,
                completeChallengeStreakListTaskErrorMessage: '',
                incompleteChallengeStreakListTaskIsLoading: false,
                incompleteChallengeStreakListTaskErrorMessage: '',
                recoverChallengeStreakIsLoading: false,
                recoverChallengeStreakErrorMessage: '',
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

    const reorderLiveChallengeStreaks = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: REORDER_LIVE_CHALLENGE_STREAKS_LOADING });
            const liveChallengeStreaks = getState().challengeStreaks.liveChallengeStreaks;
            const reorderedLiveChallengeStreaks: ChallengeStreakListItem[] =
                liveChallengeStreaks.length > 0 ? arrayMove(liveChallengeStreaks, oldIndex, newIndex) : [];

            dispatch({
                type: REORDER_LIVE_CHALLENGE_STREAKS,
                payload: {
                    liveChallengeStreaks:
                        reorderedLiveChallengeStreaks &&
                        reorderedLiveChallengeStreaks.map((challengeStreak, index) => {
                            return {
                                ...challengeStreak,
                                userDefinedIndex: index,
                            };
                        }),
                },
            });
            await Promise.all(
                reorderedLiveChallengeStreaks &&
                    reorderedLiveChallengeStreaks.map((challengeStreak, index) => {
                        return streakoid.challengeStreaks.update({
                            challengeStreakId: challengeStreak._id,
                            updateData: { userDefinedIndex: index },
                        });
                    }),
            );
            dispatch({ type: REORDER_LIVE_CHALLENGE_STREAKS_LOADED });
        } catch (err) {
            dispatch({ type: REORDER_LIVE_CHALLENGE_STREAKS_LOADED });
            if (err.response) {
                dispatch({
                    type: REORDER_LIVE_CHALLENGE_STREAKS_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: REORDER_LIVE_CHALLENGE_STREAKS_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    const recoverChallengeStreak = ({ challengeStreakId }: { challengeStreakId: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: RECOVER_CHALLENGE_STREAK_LOADING, payload: { challengeStreakId } });

            const recoveredChallengeStreak = await streakoid.challengeStreaks.recover({ challengeStreakId });

            dispatch({ type: RECOVER_CHALLENGE_STREAK, payload: { challengeStreak: recoveredChallengeStreak } });

            dispatch({ type: RECOVER_CHALLENGE_STREAK_LOADED, payload: { challengeStreakId } });
        } catch (err) {
            dispatch({ type: RECOVER_CHALLENGE_STREAK_LOADED, payload: { challengeStreakId } });
            if (err.response) {
                dispatch({
                    type: RECOVER_CHALLENGE_STREAK_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: RECOVER_CHALLENGE_STREAK_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    return {
        getCurrentUserLiveChallengeStreaks,
        getCurrentUserArchivedChallengeStreaks,
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
        reorderLiveChallengeStreaks,
        recoverChallengeStreak,
    };
};

export { challengeStreakActions };
