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
    GET_SELECTED_LIVE_CHALLENGE_STREAK,
    GET_SELECTED_LIVE_CHALLENGE_STREAK_FAIL,
    GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADING,
    GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADED,
    GET_SELECTED_ARCHIVED_CHALLENGE_STREAK,
    GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_FAIL,
    GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADING,
    GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADED,
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
} from '../actions/types';

export interface ChallengeStreakReducerState {
    liveChallengeStreaks: ChallengeStreakWithClientData[];
    getLiveChallengeStreaksIsLoading: boolean;
    getLiveChallengeStreaksErrorMessage: string;
    selectedLiveChallengeStreak: ChallengeStreakWithClientData;
    getSelectedLiveChallengeStreakIsLoading: boolean;
    getSelectedLiveChallengeStreakErrorMessage: string;
    archivedChallengeStreaks: ChallengeStreakWithClientData[];
    getArchivedChallengeStreaksIsLoading: boolean;
    getArchivedChallengeStreaksErrorMessage: string;
    selectedArchivedChallengeStreak: ChallengeStreakWithClientData;
    getSelectedArchivedChallengeStreakIsLoading: boolean;
    getSelectedArchivedChallengeStreakErrorMessage: string;
    archiveChallengeStreakIsLoading: boolean;
    archiveChallengeStreakErrorMessage: string;
    createChallengeStreakErrorMessge: string;
    restoreArchivedChallengeStreakIsLoading: boolean;
    deleteArchivedChallengeStreakIsLoading: boolean;
}

const initialState: ChallengeStreakReducerState = {
    liveChallengeStreaks: [],
    getLiveChallengeStreaksIsLoading: false,
    getLiveChallengeStreaksErrorMessage: '',
    selectedLiveChallengeStreak: {
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
        timezone: '',
        updatedAt: '',
        createdAt: '',
        challengeName: '',
        challengeDescription: '',
        completeChallengeStreakTaskIsLoading: false,
        completeChallengeStreakTaskErrorMessage: '',
        incompleteChallengeStreakTaskIsLoading: false,
        incompleteChallengeStreakTaskErrorMessage: '',
    },
    getSelectedLiveChallengeStreakIsLoading: false,
    getSelectedLiveChallengeStreakErrorMessage: '',
    archivedChallengeStreaks: [],
    getArchivedChallengeStreaksIsLoading: false,
    getArchivedChallengeStreaksErrorMessage: '',
    selectedArchivedChallengeStreak: {
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
        timezone: '',
        updatedAt: '',
        createdAt: '',
        challengeName: '',
        challengeDescription: '',
        completeChallengeStreakTaskIsLoading: false,
        completeChallengeStreakTaskErrorMessage: '',
        incompleteChallengeStreakTaskIsLoading: false,
        incompleteChallengeStreakTaskErrorMessage: '',
    },
    getSelectedArchivedChallengeStreakIsLoading: false,
    getSelectedArchivedChallengeStreakErrorMessage: '',
    archiveChallengeStreakIsLoading: false,
    archiveChallengeStreakErrorMessage: '',
    createChallengeStreakErrorMessge: '',
    restoreArchivedChallengeStreakIsLoading: false,
    deleteArchivedChallengeStreakIsLoading: false,
};

export interface ChallengeStreakWithClientData extends ChallengeStreak {
    challengeName: string;
    challengeDescription: string;
    completeChallengeStreakTaskIsLoading: boolean;
    completeChallengeStreakTaskErrorMessage: string;
    incompleteChallengeStreakTaskIsLoading: boolean;
    incompleteChallengeStreakTaskErrorMessage: string;
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

        case GET_SELECTED_LIVE_CHALLENGE_STREAK:
            return {
                ...state,
                selectedLiveChallengeStreak: action.payload,
            };

        case GET_SELECTED_LIVE_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                getSelectedLiveChallengeStreakErrorMessage: action.payload,
            };

        case GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                getSelectedLiveChallengeStreakIsLoading: true,
            };

        case GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                getSelectedLiveChallengeStreakIsLoading: false,
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

        case GET_SELECTED_ARCHIVED_CHALLENGE_STREAK:
            return {
                ...state,
                selectedArchivedChallengeStreak: action.payload,
            };

        case GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                getSelectedArchivedChallengeStreakErrorMessage: action.payload,
            };

        case GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                getSelectedArchivedChallengeStreakIsLoading: true,
            };

        case GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                getSelectedArchivedChallengeStreakIsLoading: false,
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
                        const challengeStreakWithClientData: ChallengeStreakWithClientData = {
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
                        const challengeStreakWithClientData: ChallengeStreakWithClientData = {
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
                        const challengeStreakWithClientData: ChallengeStreakWithClientData = {
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
                        const challengeStreakWithClientData: ChallengeStreakWithClientData = {
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

        default:
            return state;
    }
};

export { challengeStreakReducer };
