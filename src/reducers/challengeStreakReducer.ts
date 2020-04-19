import { ChallengeStreak, StreakStatus } from '@streakoid/streakoid-sdk/lib';

import {
    COMPLETE_CHALLENGE_STREAK_LIST_TASK,
    ChallengeStreakActionTypes,
    COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED,
    COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING,
    COMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL,
    INCOMPLETE_CHALLENGE_STREAK_LIST_TASK,
    INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL,
    INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING,
    INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED,
    GET_LIVE_CHALLENGE_STREAKS,
    GET_LIVE_CHALLENGE_STREAKS_LOADING,
    GET_LIVE_CHALLENGE_STREAKS_LOADED,
    GET_LIVE_CHALLENGE_STREAKS_FAIL,
    GET_ARCHIVED_CHALLENGE_STREAKS,
    GET_ARCHIVED_CHALLENGE_STREAKS_LOADING,
    GET_ARCHIVED_CHALLENGE_STREAKS_LOADED,
    GET_ARCHIVED_CHALLENGE_STREAKS_FAIL,
    CREATE_CHALLENGE_STREAK,
    CREATE_CHALLENGE_STREAK_FAIL,
    UPDATE_CHALLENGE_STREAK_TIMEZONES,
    GET_CHALLENGE_STREAK,
    GET_CHALLENGE_STREAK_FAIL,
    GET_CHALLENGE_STREAK_LOADING,
    GET_CHALLENGE_STREAK_LOADED,
    RESTORE_ARCHIVED_CHALLENGE_STREAK,
    RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADING,
    RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED,
    ARCHIVE_CHALLENGE_STREAK,
    DELETE_ARCHIVED_CHALLENGE_STREAK,
    DELETE_ARCHIVED_CHALLENGE_STREAK_LOADING,
    DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED,
    ARCHIVE_CHALLENGE_STREAK_LOADING,
    ARCHIVE_CHALLENGE_STREAK_LOADED,
    ARCHIVE_CHALLENGE_STREAK_FAIL,
    RESTORE_ARCHIVED_CHALLENGE_STREAK_FAIL,
    DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL,
    CLEAR_SELECTED_CHALLENGE_STREAK,
    COMPLETE_SELECTED_CHALLENGE_STREAK,
    COMPLETE_SELECTED_CHALLENGE_STREAK_FAIL,
    COMPLETE_SELECTED_CHALLENGE_STREAK_LOADING,
    COMPLETE_SELECTED_CHALLENGE_STREAK_LOADED,
    INCOMPLETE_SELECTED_CHALLENGE_STREAK,
    INCOMPLETE_SELECTED_CHALLENGE_STREAK_FAIL,
    INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADING,
    INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADED,
    UPDATE_CHALLENGE_STREAK_REMINDER_INFO,
    UPDATE_CHALLENGE_STREAK_REMINDER_INFO_FAIL,
    UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADING,
    UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADED,
} from '../actions/types';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import { CustomChallengeStreakReminderPushNotification } from '@streakoid/streakoid-sdk/lib/models/PushNotifications';

export interface ChallengeStreakReducerState {
    liveChallengeStreaks: ChallengeStreakListItem[];
    getMultipleLiveChallengeStreaksIsLoading: boolean;
    getLiveChallengeStreaksErrorMessage: string;
    selectedChallengeStreak: SelectedChallengeStreak;
    getSelectedChallengeStreakIsLoading: boolean;
    getSelectedChallengeStreakErrorMessage: string;
    archivedChallengeStreaks: ArchivedChallengeStreakListItem[];
    getArchivedChallengeStreaksIsLoading: boolean;
    getArchivedChallengeStreaksErrorMessage: string;
    archiveChallengeStreakIsLoading: boolean;
    archiveChallengeStreakErrorMessage: string;
    createChallengeStreakErrorMessge: string;
    restoreArchivedChallengeStreakIsLoading: boolean;
    restoreArchivedChallengeStreakErrorMessage: string;
    deleteArchivedChallengeStreakIsLoading: boolean;
    deleteArchivedChallengeStreakErrorMessage: string;
}

const defaultSelectedChallengeStreak = {
    _id: '',
    challengeId: '',
    badgeId: '',
    userId: '',
    status: StreakStatus.archived,
    completedToday: false,
    active: false,
    currentStreak: {
        numberOfDaysInARow: 0,
        startDate: new Date().toString(),
    },
    pastStreaks: [],
    timezone: 'Europe/London',
    updatedAt: '',
    createdAt: '',
    challengeName: '',
    challengeDescription: '',
    completeChallengeStreakListTaskIsLoading: false,
    completeChallengeStreakListTaskErrorMessage: '',
    incompleteChallengeStreakListTaskIsLoading: false,
    incompleteChallengeStreakListTaskErrorMessage: '',
    completedChallengeStreakTaskDates: [],
    username: '',
    userProfileImage: '',
    longestStreak: 0,
    averageStreak: 0,
    totalTimesTracked: 0,
    daysSinceStreakCreation: 0,
    numberOfRestarts: 0,
    activityFeed: {
        totalActivityFeedCount: 0,
        activityFeedItems: [],
    },
    completeSelectedChallengeStreakIsLoading: false,
    completeSelectedChallengeStreakErrorMessage: '',
    incompleteSelectedChallengeStreakIsLoading: false,
    incompleteSelectedChallengeStreakErrorMessage: '',
    updateCustomChallengeStreakReminderPushNotificationErrorMessage: '',
    updateCustomChallengeStreakReminderPushNotificationIsLoading: false,
};

const initialState: ChallengeStreakReducerState = {
    liveChallengeStreaks: [],
    getMultipleLiveChallengeStreaksIsLoading: false,
    getLiveChallengeStreaksErrorMessage: '',
    selectedChallengeStreak: defaultSelectedChallengeStreak,
    getSelectedChallengeStreakIsLoading: false,
    getSelectedChallengeStreakErrorMessage: '',
    archivedChallengeStreaks: [],
    getArchivedChallengeStreaksIsLoading: false,
    getArchivedChallengeStreaksErrorMessage: '',
    archiveChallengeStreakIsLoading: false,
    archiveChallengeStreakErrorMessage: '',
    createChallengeStreakErrorMessge: '',
    restoreArchivedChallengeStreakIsLoading: false,
    restoreArchivedChallengeStreakErrorMessage: '',
    deleteArchivedChallengeStreakIsLoading: false,
    deleteArchivedChallengeStreakErrorMessage: '',
};

export interface ChallengeStreakListItem extends ChallengeStreak {
    challengeName: string;
    completeChallengeStreakListTaskIsLoading: boolean;
    completeChallengeStreakListTaskErrorMessage: string;
    incompleteChallengeStreakListTaskIsLoading: boolean;
    incompleteChallengeStreakListTaskErrorMessage: string;
}

export interface ArchivedChallengeStreakListItem extends ChallengeStreak {
    challengeName: string;
    challengeDescription: string;
}

export interface SelectedChallengeStreak extends ChallengeStreak {
    challengeName: string;
    challengeDescription: string;
    completeChallengeStreakListTaskIsLoading: boolean;
    completeChallengeStreakListTaskErrorMessage: string;
    incompleteChallengeStreakListTaskIsLoading: boolean;
    incompleteChallengeStreakListTaskErrorMessage: string;
    completedChallengeStreakTaskDates: Date[];
    username: string;
    userProfileImage: string;
    longestStreak: number;
    averageStreak: number;
    totalTimesTracked: number;
    daysSinceStreakCreation: number;
    numberOfRestarts: number;
    activityFeed: {
        totalActivityFeedCount: number;
        activityFeedItems: ClientActivityFeedItemType[];
    };
    completeSelectedChallengeStreakIsLoading: boolean;
    completeSelectedChallengeStreakErrorMessage: string;
    incompleteSelectedChallengeStreakIsLoading: boolean;
    incompleteSelectedChallengeStreakErrorMessage: string;
    updateCustomChallengeStreakReminderPushNotificationErrorMessage: string;
    updateCustomChallengeStreakReminderPushNotificationIsLoading: boolean;
    customChallengeStreakReminder?: CustomChallengeStreakReminderPushNotification;
}

const challengeStreakReducer = (
    state = initialState,
    action: ChallengeStreakActionTypes,
): ChallengeStreakReducerState => {
    switch (action.type) {
        case GET_LIVE_CHALLENGE_STREAKS:
            return {
                ...state,
                liveChallengeStreaks: action.payload,
            };

        case GET_LIVE_CHALLENGE_STREAKS_LOADING:
            return {
                ...state,
                getMultipleLiveChallengeStreaksIsLoading: true,
            };

        case GET_LIVE_CHALLENGE_STREAKS_LOADED:
            return {
                ...state,
                getMultipleLiveChallengeStreaksIsLoading: false,
            };

        case GET_LIVE_CHALLENGE_STREAKS_FAIL:
            return {
                ...state,
                getLiveChallengeStreaksErrorMessage: action.payload,
            };

        case GET_CHALLENGE_STREAK:
            return {
                ...state,
                selectedChallengeStreak: action.payload,
            };

        case GET_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                getSelectedChallengeStreakErrorMessage: action.payload,
            };

        case GET_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                getSelectedChallengeStreakIsLoading: true,
            };

        case GET_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                getSelectedChallengeStreakIsLoading: false,
            };

        case GET_ARCHIVED_CHALLENGE_STREAKS:
            return {
                ...state,
                archivedChallengeStreaks: action.payload,
            };

        case GET_ARCHIVED_CHALLENGE_STREAKS_FAIL:
            return {
                ...state,
                getArchivedChallengeStreaksErrorMessage: action.payload,
            };

        case GET_ARCHIVED_CHALLENGE_STREAKS_LOADING:
            return {
                ...state,
                getArchivedChallengeStreaksIsLoading: true,
            };

        case GET_ARCHIVED_CHALLENGE_STREAKS_LOADED:
            return {
                ...state,
                getArchivedChallengeStreaksIsLoading: false,
            };

        case CREATE_CHALLENGE_STREAK:
            return {
                ...state,
                liveChallengeStreaks: [...state.liveChallengeStreaks, action.payload],
            };

        case CREATE_CHALLENGE_STREAK_FAIL: {
            return {
                ...state,
                createChallengeStreakErrorMessge: '',
            };
        }

        case ARCHIVE_CHALLENGE_STREAK:
            return {
                ...state,
                liveChallengeStreaks: [
                    ...state.liveChallengeStreaks.filter(challengeStreak => challengeStreak._id !== action.payload._id),
                ],
                archivedChallengeStreaks: [...state.archivedChallengeStreaks, action.payload],
            };

        case ARCHIVE_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                archiveChallengeStreakErrorMessage: action.payload,
            };

        case ARCHIVE_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                archiveChallengeStreakIsLoading: true,
            };

        case ARCHIVE_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                archiveChallengeStreakIsLoading: false,
            };

        case RESTORE_ARCHIVED_CHALLENGE_STREAK:
            return {
                ...state,
                liveChallengeStreaks: [...state.liveChallengeStreaks, action.payload],
                archivedChallengeStreaks: state.archivedChallengeStreaks.filter(
                    challengeStreak => challengeStreak._id !== action.payload._id,
                ),
            };

        case RESTORE_ARCHIVED_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                restoreArchivedChallengeStreakErrorMessage: action.payload,
            };

        case RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                restoreArchivedChallengeStreakIsLoading: true,
            };

        case RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                restoreArchivedChallengeStreakIsLoading: false,
            };

        case DELETE_ARCHIVED_CHALLENGE_STREAK:
            return {
                ...state,
                archivedChallengeStreaks: [
                    ...state.archivedChallengeStreaks.filter(challengeStreak => challengeStreak._id !== action.payload),
                ],
            };

        case DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                deleteArchivedChallengeStreakErrorMessage: action.payload,
            };

        case DELETE_ARCHIVED_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                deleteArchivedChallengeStreakIsLoading: true,
            };

        case DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                deleteArchivedChallengeStreakIsLoading: false,
            };

        case COMPLETE_CHALLENGE_STREAK_LIST_TASK:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload) {
                        return {
                            ...challengeStreak,
                            completedToday: true,
                            currentStreak: {
                                ...challengeStreak.currentStreak,
                                numberOfDaysInARow: challengeStreak.currentStreak.numberOfDaysInARow + 1,
                            },
                        };
                    }
                    return challengeStreak;
                }),
            };

        case COMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload.challengeStreakId) {
                        return {
                            ...challengeStreak,
                            createcompleteChallengeStreakListTaskErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return challengeStreak;
                }),
            };

        case COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.challengeStreakId) {
                        const SelectedChallengeStreak = {
                            ...challengeStreak,
                            completeChallengeStreakListTaskIsLoading: true,
                        };
                        return SelectedChallengeStreak;
                    }
                    return challengeStreak;
                }),
            };

        case COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.challengeStreakId) {
                        const SelectedChallengeStreak = {
                            ...challengeStreak,
                            completeChallengeStreakListTaskIsLoading: false,
                        };
                        return SelectedChallengeStreak;
                    }
                    return challengeStreak;
                }),
            };

        case COMPLETE_SELECTED_CHALLENGE_STREAK:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload) {
                        return {
                            ...challengeStreak,
                            completedToday: true,
                            currentStreak: {
                                ...challengeStreak.currentStreak,
                                numberOfDaysInARow: challengeStreak.currentStreak.numberOfDaysInARow + 1,
                            },
                        };
                    }
                    return challengeStreak;
                }),
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    completedToday: true,
                },
            };

        case COMPLETE_SELECTED_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    completeSelectedChallengeStreakErrorMessage: action.payload,
                },
            };

        case COMPLETE_SELECTED_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    completeSelectedChallengeStreakIsLoading: true,
                },
            };

        case COMPLETE_SELECTED_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    completeSelectedChallengeStreakIsLoading: false,
                },
            };

        case INCOMPLETE_CHALLENGE_STREAK_LIST_TASK:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload) {
                        return {
                            ...challengeStreak,
                            completedToday: false,
                            currentStreak: {
                                ...challengeStreak.currentStreak,
                                numberOfDaysInARow: challengeStreak.currentStreak.numberOfDaysInARow - 1,
                            },
                        };
                    }
                    return challengeStreak;
                }),
            };

        case INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload.challengeStreakId) {
                        return {
                            ...challengeStreak,
                            createcompleteChallengeStreakListTaskErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return challengeStreak;
                }),
            };

        case INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.challengeStreakId) {
                        const SelectedChallengeStreak = {
                            ...challengeStreak,
                            incompleteChallengeStreakListTaskIsLoading: true,
                        };
                        return SelectedChallengeStreak;
                    }
                    return challengeStreak;
                }),
            };

        case INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.challengeStreakId) {
                        const SelectedChallengeStreak = {
                            ...challengeStreak,
                            incompleteChallengeStreakListTaskIsLoading: false,
                        };
                        return SelectedChallengeStreak;
                    }
                    return challengeStreak;
                }),
            };

        case INCOMPLETE_SELECTED_CHALLENGE_STREAK:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload) {
                        return {
                            ...challengeStreak,
                            completedToday: false,
                            currentStreak: {
                                ...challengeStreak.currentStreak,
                                numberOfDaysInARow: challengeStreak.currentStreak.numberOfDaysInARow - 1,
                            },
                        };
                    }
                    return challengeStreak;
                }),
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    completedToday: false,
                },
            };

        case INCOMPLETE_SELECTED_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    incompleteSelectedChallengeStreakErrorMessage: action.payload,
                },
            };

        case INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    incompleteSelectedChallengeStreakIsLoading: true,
                },
            };

        case INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    incompleteSelectedChallengeStreakIsLoading: false,
                },
            };

        case UPDATE_CHALLENGE_STREAK_TIMEZONES:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    return {
                        ...challengeStreak,
                        timezone: action.payload,
                    };
                }),
            };

        case UPDATE_CHALLENGE_STREAK_REMINDER_INFO: {
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    customChallengeStreakReminder: action.payload.customChallengeStreakReminder,
                },
            };
        }

        case UPDATE_CHALLENGE_STREAK_REMINDER_INFO_FAIL: {
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    updateCustomChallengeStreakReminderPushNotificationErrorMessage: action.payload,
                },
            };
        }

        case UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADING: {
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    updateCustomChallengeStreakReminderPushNotificationIsLoading: true,
                },
            };
        }

        case UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADED: {
            return {
                ...state,
                selectedChallengeStreak: {
                    ...state.selectedChallengeStreak,
                    updateCustomChallengeStreakReminderPushNotificationIsLoading: false,
                },
            };
        }

        case CLEAR_SELECTED_CHALLENGE_STREAK:
            return {
                ...state,
                selectedChallengeStreak: defaultSelectedChallengeStreak,
            };

        default:
            return state;
    }
};

export { challengeStreakReducer };
