import {
    GET_LIVE_SOLO_STREAKS,
    CREATE_SOLO_STREAK,
    CREATE_COMPLETE_SOLO_STREAK_LIST_TASK,
    SoloStreakActionTypes,
    EDIT_SOLO_STREAK,
    CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADING,
    CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED,
    UPDATE_SOLO_STREAK_TIMEZONES,
    CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_FAIL,
    RESTORE_ARCHIVED_SOLO_STREAK,
    CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK,
    CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_FAIL,
    CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADING,
    CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADED,
    GET_ARCHIVED_SOLO_STREAKS,
    ARCHIVE_SOLO_STREAK,
    DELETE_ARCHIVED_SOLO_STREAK,
    GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING,
    GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADED,
    GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING,
    GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED,
    GET_SOLO_STREAK_IS_LOADED,
    GET_SOLO_STREAK_IS_LOADING,
    GET_SOLO_STREAK,
    ARCHIVE_SOLO_STREAK_IS_LOADING,
    ARCHIVE_SOLO_STREAK_IS_LOADED,
    RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING,
    RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED,
    DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING,
    DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED,
    CREATE_SOLO_STREAK_IS_LOADING,
    CREATE_SOLO_STREAK_IS_LOADED,
    EDIT_SOLO_STREAK_IS_LOADING,
    EDIT_SOLO_STREAK_IS_LOADED,
    CREATE_SOLO_STREAK_ERROR,
    CLEAR_CREATE_SOLO_STREAK_ERROR,
    EDIT_SOLO_STREAK_FAIL,
    CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE,
    ARCHIVE_SOLO_STREAK_FAIL,
    CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE,
    RESTORE_ARCHIVED_SOLO_STREAK_FAIL,
    CLEAR_RESTORE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE,
    DELETE_ARCHIVED_SOLO_STREAK_FAIL,
    CLEAR_DELETE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE,
    CLEAR_SELECTED_SOLO_STREAK,
    COMPLETE_SELECTED_SOLO_STREAK,
    COMPLETE_SELECTED_SOLO_STREAK_IS_LOADING,
    COMPLETE_SELECTED_SOLO_STREAK_IS_LOADED,
    COMPLETE_SELECTED_SOLO_STREAK_FAIL,
    INCOMPLETE_SELECTED_SOLO_STREAK,
    INCOMPLETE_SELECTED_SOLO_STREAK_FAIL,
    INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADING,
    INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADED,
    UPDATE_SOLO_STREAK_REMINDER_INFO,
    UPDATE_SOLO_STREAK_REMINDER_INFO_FAIL,
    UPDATE_SOLO_STREAK_REMINDER_INFO_LOADING,
    UPDATE_SOLO_STREAK_REMINDER_INFO_LOADED,
    REORDER_LIVE_SOLO_STREAKS,
    RECOVER_SOLO_STREAK,
    RECOVER_SOLO_STREAK_FAIL,
    RECOVER_SOLO_STREAK_LOADING,
} from '../actions/types';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import { CustomSoloStreakReminder } from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { SoloStreak } from '@streakoid/streakoid-models/lib/Models/SoloStreak';
import StreakTypes from '@streakoid/streakoid-models/lib/Types/StreakTypes';
import VisibilityTypes from '@streakoid/streakoid-models/lib/Types/VisibilityTypes';

export interface SoloStreakReducerState {
    liveSoloStreaks: SoloStreakListItem[];
    selectedSoloStreak: SelectedSoloStreak;
    archivedSoloStreaks: ArchivedSoloStreakListItem[];
    getMultipleLiveSoloStreaksIsLoading: boolean;
    getSoloStreakIsLoading: boolean;
    getMultipleArchivedSoloStreaksIsLoading: boolean;
    getArchivedSoloStreakIsLoading: boolean;
    archiveSoloStreakIsLoading: boolean;
    restoreArchivedSoloStreakIsLoading: boolean;
    deleteArchivedSoloStreakIsLoading: boolean;
    createSoloStreakIsLoading: boolean;
    editSoloStreakIsLoading: boolean;
    createSoloStreakErrorMessage: string;
    editSoloStreakErrorMessage: string;
    archiveSoloStreakErrorMessage: string;
    restoreArchivedSoloStreakErrorMessage: string;
    deleteArchivedSoloStreakErrorMessage: string;
}

const defaultSelectedSoloStreak: SelectedSoloStreak = {
    _id: '',
    currentStreak: {
        numberOfDaysInARow: 0,
    },
    status: StreakStatus.live,
    visibility: VisibilityTypes.everyone,
    active: false,
    completedToday: false,
    pastStreaks: [],
    streakName: '',
    userId: '',
    timezone: 'Europe/London',
    createdAt: '',
    updatedAt: '',
    completedSoloStreakTaskDates: [],
    username: '',
    userProfileImage: '',

    totalTimesTracked: 0,
    daysSinceStreakCreation: 0,
    numberOfRestarts: 0,
    activityFeed: {
        totalActivityFeedCount: 0,
        activityFeedItems: [],
    },
    longestSoloStreak: {
        soloStreakId: '',
        soloStreakName: '',
        numberOfDays: 0,
        streakType: StreakTypes.solo,
        startDate: new Date().toString(),
    },
    completeSelectedSoloStreakIsLoading: false,
    completeSelectedSoloStreakErrorMessage: '',
    incompleteSelectedSoloStreakIsLoading: false,
    incompleteSelectedSoloStreakErrorMessage: '',
    updateCustomSoloStreakReminderIsLoading: false,
    updateCustomSoloStreakReminderErrorMessage: '',
};

const initialState: SoloStreakReducerState = {
    liveSoloStreaks: [],
    selectedSoloStreak: defaultSelectedSoloStreak,
    archivedSoloStreaks: [],
    getMultipleLiveSoloStreaksIsLoading: false,
    getSoloStreakIsLoading: false,
    getMultipleArchivedSoloStreaksIsLoading: false,
    getArchivedSoloStreakIsLoading: false,
    archiveSoloStreakIsLoading: false,
    restoreArchivedSoloStreakIsLoading: false,
    deleteArchivedSoloStreakIsLoading: false,
    createSoloStreakIsLoading: false,
    editSoloStreakIsLoading: false,
    createSoloStreakErrorMessage: '',
    editSoloStreakErrorMessage: '',
    archiveSoloStreakErrorMessage: '',
    restoreArchivedSoloStreakErrorMessage: '',
    deleteArchivedSoloStreakErrorMessage: '',
};

export interface SelectedSoloStreak extends SoloStreak {
    completedSoloStreakTaskDates: Date[];
    userProfileImage: string;
    totalTimesTracked: number;
    daysSinceStreakCreation: number;
    numberOfRestarts: number;
    activityFeed: {
        totalActivityFeedCount: number;
        activityFeedItems: ClientActivityFeedItemType[];
    };
    completeSelectedSoloStreakIsLoading: boolean;
    completeSelectedSoloStreakErrorMessage: string;
    incompleteSelectedSoloStreakIsLoading: boolean;
    incompleteSelectedSoloStreakErrorMessage: string;
    updateCustomSoloStreakReminderIsLoading: boolean;
    updateCustomSoloStreakReminderErrorMessage: string;
    customSoloStreakReminder?: CustomSoloStreakReminder;
    username: string;
}

export interface SoloStreakListItem extends SoloStreak {
    completeSoloStreakListTaskIsLoading: boolean;
    completeSoloStreakListTaskErrorMessage: string;
    incompleteSoloStreakListTaskIsLoading: boolean;
    incompleteSoloStreakListTaskErrorMessage: string;
    recoverSoloStreakIsLoading: boolean;
    recoverSoloStreakErrorMessage: string;
}

export interface ArchivedSoloStreakListItem extends SoloStreak {
    createSoloStreakTaskIsLoading: boolean;
    createCompleteSoloStreakTaskErrorMessage: string;
}

const soloStreakReducer = (state = initialState, action: SoloStreakActionTypes): SoloStreakReducerState => {
    switch (action.type) {
        case GET_LIVE_SOLO_STREAKS:
            return {
                ...state,
                liveSoloStreaks: action.payload,
            };

        case GET_SOLO_STREAK:
            return {
                ...state,
                selectedSoloStreak: action.payload,
            };

        case CREATE_SOLO_STREAK:
            return {
                ...state,
                liveSoloStreaks: [...state.liveSoloStreaks, action.payload],
            };

        case EDIT_SOLO_STREAK:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreak._id) {
                        return action.soloStreak;
                    }
                    return soloStreak;
                }),
            };

        case RESTORE_ARCHIVED_SOLO_STREAK:
            return {
                ...state,
                liveSoloStreaks: [...state.liveSoloStreaks, action.payload],
                archivedSoloStreaks: state.archivedSoloStreaks.filter(
                    soloStreak => soloStreak._id !== action.payload._id,
                ),
            };

        case RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                restoreArchivedSoloStreakIsLoading: true,
            };

        case RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED:
            return {
                ...state,
                restoreArchivedSoloStreakIsLoading: false,
            };

        case UPDATE_SOLO_STREAK_TIMEZONES:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    return {
                        ...soloStreak,
                        timezone: action.timezone,
                    };
                }),
            };

        case CREATE_COMPLETE_SOLO_STREAK_LIST_TASK:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload) {
                        return {
                            ...soloStreak,
                            completedToday: true,
                            currentStreak: {
                                ...soloStreak.currentStreak,
                                numberOfDaysInARow: soloStreak.currentStreak.numberOfDaysInARow + 1,
                            },
                        };
                    }
                    return soloStreak;
                }),
            };

        case CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_FAIL:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload.soloStreakId) {
                        return {
                            ...soloStreak,
                            createCompleteSoloStreakTaskErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return soloStreak;
                }),
            };

        case CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADING:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const SoloStreakListItem: SoloStreakListItem = {
                            ...soloStreak,
                            completeSoloStreakListTaskIsLoading: true,
                        };
                        return SoloStreakListItem;
                    }
                    return soloStreak;
                }),
            };

        case CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const SoloStreakListItem: SoloStreakListItem = {
                            ...soloStreak,
                            completeSoloStreakListTaskIsLoading: false,
                        };
                        return SoloStreakListItem;
                    }
                    return soloStreak;
                }),
            };

        case COMPLETE_SELECTED_SOLO_STREAK:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload.selectedSoloStreakId) {
                        return {
                            ...soloStreak,
                            completedToday: true,
                            currentStreak: {
                                ...soloStreak.currentStreak,
                                numberOfDaysInARow: soloStreak.currentStreak.numberOfDaysInARow + 1,
                            },
                        };
                    }
                    return soloStreak;
                }),
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    completedToday: true,
                },
            };

        case COMPLETE_SELECTED_SOLO_STREAK_FAIL:
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    completeSelectedSoloStreakErrorMessage: action.payload,
                },
            };

        case COMPLETE_SELECTED_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    completeSelectedSoloStreakIsLoading: true,
                },
            };

        case COMPLETE_SELECTED_SOLO_STREAK_IS_LOADED:
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    completeSelectedSoloStreakIsLoading: false,
                },
            };

        case CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload) {
                        return {
                            ...soloStreak,
                            completedToday: false,
                            currentStreak: {
                                ...soloStreak.currentStreak,
                                numberOfDaysInARow: soloStreak.currentStreak.numberOfDaysInARow - 1,
                            },
                        };
                    }
                    return soloStreak;
                }),
            };

        case CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_FAIL:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload.soloStreakId) {
                        return {
                            ...soloStreak,
                            createCompleteSoloStreakTaskErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return soloStreak;
                }),
            };

        case CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADING:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const SoloStreakListItem: SoloStreakListItem = {
                            ...soloStreak,
                            incompleteSoloStreakListTaskIsLoading: true,
                        };
                        return SoloStreakListItem;
                    }
                    return soloStreak;
                }),
            };

        case CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADED:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const SoloStreakListItem: SoloStreakListItem = {
                            ...soloStreak,
                            incompleteSoloStreakListTaskIsLoading: false,
                        };
                        return SoloStreakListItem;
                    }
                    return soloStreak;
                }),
            };

        case INCOMPLETE_SELECTED_SOLO_STREAK:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload.selectedSoloStreakId) {
                        return {
                            ...soloStreak,
                            completedToday: false,
                            currentStreak: {
                                ...soloStreak.currentStreak,
                                numberOfDaysInARow: soloStreak.currentStreak.numberOfDaysInARow - 1,
                            },
                        };
                    }
                    return soloStreak;
                }),
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    completedToday: false,
                },
            };

        case INCOMPLETE_SELECTED_SOLO_STREAK_FAIL:
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    incompleteSelectedSoloStreakErrorMessage: action.payload,
                },
            };

        case INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    incompleteSelectedSoloStreakIsLoading: true,
                },
            };

        case INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADED:
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    incompleteSelectedSoloStreakIsLoading: false,
                },
            };

        case GET_ARCHIVED_SOLO_STREAKS:
            return {
                ...state,
                archivedSoloStreaks: action.payload,
            };

        case ARCHIVE_SOLO_STREAK:
            return {
                ...state,
                liveSoloStreaks: [...state.liveSoloStreaks.filter(soloStreak => soloStreak._id !== action.payload._id)],
                archivedSoloStreaks: [...state.archivedSoloStreaks, action.payload],
            };

        case DELETE_ARCHIVED_SOLO_STREAK:
            return {
                ...state,
                archivedSoloStreaks: [
                    ...state.archivedSoloStreaks.filter(soloStreak => soloStreak._id !== action.payload),
                ],
            };

        case DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                deleteArchivedSoloStreakIsLoading: true,
            };

        case DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED:
            return {
                ...state,
                deleteArchivedSoloStreakIsLoading: false,
            };

        case GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING:
            return {
                ...state,
                getMultipleLiveSoloStreaksIsLoading: true,
            };

        case GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADED:
            return {
                ...state,
                getMultipleLiveSoloStreaksIsLoading: false,
            };

        case GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING:
            return {
                ...state,
                getMultipleArchivedSoloStreaksIsLoading: true,
            };

        case GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED:
            return {
                ...state,
                getMultipleArchivedSoloStreaksIsLoading: false,
            };

        case GET_SOLO_STREAK_IS_LOADED:
            return {
                ...state,
                getSoloStreakIsLoading: false,
            };

        case GET_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                getSoloStreakIsLoading: true,
            };

        case ARCHIVE_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                archiveSoloStreakIsLoading: true,
            };

        case ARCHIVE_SOLO_STREAK_IS_LOADED:
            return {
                ...state,
                archiveSoloStreakIsLoading: false,
            };

        case CREATE_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                createSoloStreakIsLoading: true,
            };

        case CREATE_SOLO_STREAK_IS_LOADED:
            return {
                ...state,
                createSoloStreakIsLoading: false,
            };

        case EDIT_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                editSoloStreakIsLoading: true,
            };

        case EDIT_SOLO_STREAK_IS_LOADED:
            return {
                ...state,
                editSoloStreakIsLoading: false,
            };

        case CREATE_SOLO_STREAK_ERROR:
            return {
                ...state,
                createSoloStreakErrorMessage: action.errorMessage,
            };

        case CLEAR_CREATE_SOLO_STREAK_ERROR:
            return {
                ...state,
                createSoloStreakErrorMessage: '',
            };

        case EDIT_SOLO_STREAK_FAIL:
            return {
                ...state,
                editSoloStreakErrorMessage: action.errorMessage,
            };

        case CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE:
            return {
                ...state,
                editSoloStreakErrorMessage: '',
            };

        case ARCHIVE_SOLO_STREAK_FAIL:
            return {
                ...state,
                archiveSoloStreakErrorMessage: action.errorMessage,
            };

        case CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE:
            return {
                ...state,
                archiveSoloStreakErrorMessage: '',
            };

        case RESTORE_ARCHIVED_SOLO_STREAK_FAIL:
            return {
                ...state,
                restoreArchivedSoloStreakErrorMessage: action.errorMessage,
            };

        case CLEAR_RESTORE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE:
            return {
                ...state,
                restoreArchivedSoloStreakErrorMessage: '',
            };

        case DELETE_ARCHIVED_SOLO_STREAK_FAIL:
            return {
                ...state,
                deleteArchivedSoloStreakErrorMessage: action.errorMessage,
            };

        case UPDATE_SOLO_STREAK_REMINDER_INFO: {
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    customSoloStreakReminder: action.payload.customSoloStreakReminder,
                },
            };
        }

        case UPDATE_SOLO_STREAK_REMINDER_INFO_FAIL: {
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    updateCustomSoloStreakReminderErrorMessage: action.payload,
                },
            };
        }

        case UPDATE_SOLO_STREAK_REMINDER_INFO_LOADING: {
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    updateCustomSoloStreakReminderIsLoading: true,
                },
            };
        }

        case UPDATE_SOLO_STREAK_REMINDER_INFO_LOADED: {
            return {
                ...state,
                selectedSoloStreak: {
                    ...state.selectedSoloStreak,
                    updateCustomSoloStreakReminderIsLoading: false,
                },
            };
        }

        case CLEAR_DELETE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE:
            return {
                ...state,
                deleteArchivedSoloStreakErrorMessage: '',
            };

        case CLEAR_SELECTED_SOLO_STREAK:
            return {
                ...state,
                selectedSoloStreak: defaultSelectedSoloStreak,
            };

        case REORDER_LIVE_SOLO_STREAKS: {
            return {
                ...state,
                liveSoloStreaks: action.payload.liveSoloStreaks,
            };
        }

        case RECOVER_SOLO_STREAK:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload.soloStreak._id) {
                        return {
                            ...soloStreak,
                            currentStreak: action.payload.soloStreak.currentStreak,
                        };
                    }
                    return soloStreak;
                }),
            };

        case RECOVER_SOLO_STREAK_FAIL:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload.soloStreakId) {
                        return {
                            ...soloStreak,
                            recoverSoloStreakErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return soloStreak;
                }),
            };

        case RECOVER_SOLO_STREAK_LOADING:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.payload.soloStreakId) {
                        const SoloStreakListItem: SoloStreakListItem = {
                            ...soloStreak,
                            recoverSoloStreakIsLoading: true,
                        };
                        return SoloStreakListItem;
                    }
                    return soloStreak;
                }),
            };

        case CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const SoloStreakListItem: SoloStreakListItem = {
                            ...soloStreak,
                            recoverSoloStreakIsLoading: false,
                        };
                        return SoloStreakListItem;
                    }
                    return soloStreak;
                }),
            };

        default:
            return state;
    }
};

export { soloStreakReducer };
