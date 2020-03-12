import { ChallengeStreak, StreakStatus } from '@streakoid/streakoid-sdk/lib';

import {
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK,
    ChallengeStreakActionTypes,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED,
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
} from '../actions/types';

export interface ChallengeStreakReducerState {
    liveChallengeStreaks: ChallengeStreakListItem[];
    getLiveChallengeStreaksIsLoading: boolean;
    getLiveChallengeStreaksErrorMessage: string;
    selectedChallengeStreak: ChallengeStreakWithClientData;
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
    completeChallengeStreakTaskIsLoading: false,
    completeChallengeStreakTaskErrorMessage: '',
    incompleteChallengeStreakTaskIsLoading: false,
    incompleteChallengeStreakTaskErrorMessage: '',
    completedChallengeStreakTaskDates: [],
    username: '',
    userProfileImage: '',
    longestStreak: 0,
    averageStreak: 0,
    totalTimesTracked: 0,
    daysSinceStreakCreation: 0,
    numberOfRestarts: 0,
};

const initialState: ChallengeStreakReducerState = {
    liveChallengeStreaks: [],
    getLiveChallengeStreaksIsLoading: false,
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
    completeChallengeStreakTaskIsLoading: boolean;
    completeChallengeStreakTaskErrorMessage: string;
    incompleteChallengeStreakTaskIsLoading: boolean;
    incompleteChallengeStreakTaskErrorMessage: string;
}

export interface ArchivedChallengeStreakListItem extends ChallengeStreak {
    challengeName: string;
    challengeDescription: string;
}

export interface ChallengeStreakWithClientData extends ChallengeStreak {
    challengeName: string;
    challengeDescription: string;
    completeChallengeStreakTaskIsLoading: boolean;
    completeChallengeStreakTaskErrorMessage: string;
    incompleteChallengeStreakTaskIsLoading: boolean;
    incompleteChallengeStreakTaskErrorMessage: string;
    completedChallengeStreakTaskDates: Date[];
    username: string;
    userProfileImage: string;
    longestStreak: number;
    averageStreak: number;
    totalTimesTracked: number;
    daysSinceStreakCreation: number;
    numberOfRestarts: number;
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
                getLiveChallengeStreaksIsLoading: true,
            };

        case GET_LIVE_CHALLENGE_STREAKS_LOADED:
            return {
                ...state,
                getLiveChallengeStreaksIsLoading: false,
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

        case CREATE_COMPLETE_CHALLENGE_STREAK_TASK:
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

        case CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload.challengeStreakId) {
                        return {
                            ...challengeStreak,
                            createCompleteChallengeStreakTaskErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return challengeStreak;
                }),
            };

        case CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.challengeStreakId) {
                        const challengeStreakWithClientData = {
                            ...challengeStreak,
                            completeChallengeStreakTaskIsLoading: true,
                        };
                        return challengeStreakWithClientData;
                    }
                    return challengeStreak;
                }),
            };

        case CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.challengeStreakId) {
                        const challengeStreakWithClientData = {
                            ...challengeStreak,
                            completeChallengeStreakTaskIsLoading: false,
                        };
                        return challengeStreakWithClientData;
                    }
                    return challengeStreak;
                }),
            };

        case CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK:
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

        case CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload.challengeStreakId) {
                        return {
                            ...challengeStreak,
                            createCompleteChallengeStreakTaskErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return challengeStreak;
                }),
            };

        case CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.challengeStreakId) {
                        const challengeStreakWithClientData = {
                            ...challengeStreak,
                            incompleteChallengeStreakTaskIsLoading: true,
                        };
                        return challengeStreakWithClientData;
                    }
                    return challengeStreak;
                }),
            };

        case CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED:
            return {
                ...state,
                liveChallengeStreaks: state.liveChallengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.challengeStreakId) {
                        const challengeStreakWithClientData = {
                            ...challengeStreak,
                            incompleteChallengeStreakTaskIsLoading: false,
                        };
                        return challengeStreakWithClientData;
                    }
                    return challengeStreak;
                }),
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
