import { SoloStreak, StreakStatus } from '@streakoid/streakoid-sdk/lib';

import {
    GET_LIVE_SOLO_STREAKS,
    CREATE_SOLO_STREAK,
    CREATE_COMPLETE_SOLO_STREAK_TASK,
    SoloStreakActionTypes,
    EDIT_SOLO_STREAK,
    CREATE_COMPLETE_SOLO_STREAK_TASK_LOADING,
    CREATE_COMPLETE_SOLO_STREAK_TASK_LOADED,
    UPDATE_SOLO_STREAK_TIMEZONES,
    CREATE_COMPLETE_SOLO_STREAK_TASK_FAIL,
    RESTORE_ARCHIVED_SOLO_STREAK,
    CREATE_INCOMPLETE_SOLO_STREAK_TASK,
    CREATE_INCOMPLETE_SOLO_STREAK_TASK_FAIL,
    CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADING,
    CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADED,
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
} from '../actions/types';

export interface SoloStreakReducerState {
    liveSoloStreaks: LiveSoloStreakWithClientData[];
    selectedSoloStreak: SoloStreakWithTaskCompletedDates;
    archivedSoloStreaks: ArchivedSoloStreakWithClientData[];
    getMultipleLiveSoloStreaksIsLoading: boolean;
    getLiveSoloStreakIsLoading: boolean;
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

const initialState: SoloStreakReducerState = {
    liveSoloStreaks: [],
    selectedSoloStreak: {
        _id: '',
        currentStreak: {
            numberOfDaysInARow: 0,
        },
        status: StreakStatus.live,
        active: false,
        completedToday: false,
        pastStreaks: [],
        streakName: '',
        userId: '',
        timezone: '',
        createdAt: '',
        updatedAt: '',
        completedSoloStreakTaskDates: [],
    },
    archivedSoloStreaks: [],
    getMultipleLiveSoloStreaksIsLoading: false,
    getLiveSoloStreakIsLoading: false,
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

export interface SoloStreakWithTaskCompletedDates extends SoloStreak {
    completedSoloStreakTaskDates: Date[];
}

export interface LiveSoloStreakWithClientData extends SoloStreak {
    completeSoloStreakTaskIsLoading: boolean;
    completeSoloStreakTaskErrorMessage: string;
    incompleteSoloStreakTaskIsLoading: boolean;
    incompleteSoloStreakTaskErrorMessage: string;
}

export interface ArchivedSoloStreakWithClientData extends SoloStreak {
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

        case CREATE_COMPLETE_SOLO_STREAK_TASK:
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

        case CREATE_COMPLETE_SOLO_STREAK_TASK_FAIL:
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

        case CREATE_COMPLETE_SOLO_STREAK_TASK_LOADING:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const liveSoloStreakWithClientData: LiveSoloStreakWithClientData = {
                            ...soloStreak,
                            completeSoloStreakTaskIsLoading: true,
                        };
                        return liveSoloStreakWithClientData;
                    }
                    return soloStreak;
                }),
            };

        case CREATE_COMPLETE_SOLO_STREAK_TASK_LOADED:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const liveSoloStreakWithClientData: LiveSoloStreakWithClientData = {
                            ...soloStreak,
                            completeSoloStreakTaskIsLoading: false,
                        };
                        return liveSoloStreakWithClientData;
                    }
                    return soloStreak;
                }),
            };

        case CREATE_INCOMPLETE_SOLO_STREAK_TASK:
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

        case CREATE_INCOMPLETE_SOLO_STREAK_TASK_FAIL:
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

        case CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADING:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const liveSoloStreakWithClientData: LiveSoloStreakWithClientData = {
                            ...soloStreak,
                            incompleteSoloStreakTaskIsLoading: true,
                        };
                        return liveSoloStreakWithClientData;
                    }
                    return soloStreak;
                }),
            };

        case CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADED:
            return {
                ...state,
                liveSoloStreaks: state.liveSoloStreaks.map(soloStreak => {
                    if (soloStreak._id === action.soloStreakId) {
                        const liveSoloStreakWithClientData: LiveSoloStreakWithClientData = {
                            ...soloStreak,
                            incompleteSoloStreakTaskIsLoading: false,
                        };
                        return liveSoloStreakWithClientData;
                    }
                    return soloStreak;
                }),
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
                getLiveSoloStreakIsLoading: false,
            };

        case GET_SOLO_STREAK_IS_LOADING:
            return {
                ...state,
                getLiveSoloStreakIsLoading: true,
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

        case CLEAR_DELETE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE:
            return {
                ...state,
                deleteArchivedSoloStreakErrorMessage: '',
            };

        default:
            return state;
    }
};

export { soloStreakReducer };
