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
    JOIN_CHALLENGE_STREAK_LOADING,
    JOIN_CHALLENGE_STREAK_LOADED,
    GET_CHALLENGE_STREAKS,
    JOIN_CHALLENGE_STREAK,
    JOIN_CHALLENGE_STREAK_FAIL,
    GET_ONE_CHALLENGE_STREAK,
    GET_CHALLENGE_STREAKS_LOADING,
    GET_CHALLENGE_STREAKS_LOADED,
    GET_CHALLENGE_STREAKS_FAIL,
} from '../actions/types';

export interface ChallengeStreakReducerState {
    challengeStreaks: ChallengeStreakWithClientData[];
    selectedChallengeStreak: ChallengeStreakWithClientData;
    getChallengeStreaksIsLoading: boolean;
    getChallengeStreaksErrorMessage: string;
}

const initialState: ChallengeStreakReducerState = {
    challengeStreaks: [],
    selectedChallengeStreak: {
        _id: '',
        challengeId: '',
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
        joinChallengeStreakTaskIsLoading: false,
        joinChallengeStreakTaskErrorMessage: '',
        completeChallengeStreakTaskIsLoading: false,
        completeChallengeStreakTaskErrorMessage: '',
        incompleteChallengeStreakTaskIsLoading: false,
        incompleteChallengeStreakTaskErrorMessage: '',
    },
    getChallengeStreaksIsLoading: false,
    getChallengeStreaksErrorMessage: '',
};

export interface ChallengeStreakWithClientData extends ChallengeStreak {
    challengeName: string;
    challengeDescription: string;
    joinChallengeStreakTaskIsLoading: boolean;
    joinChallengeStreakTaskErrorMessage: string;
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
        case GET_CHALLENGE_STREAKS:
            return {
                ...state,
                challengeStreaks: action.payload,
            };

        case GET_CHALLENGE_STREAKS_LOADING:
            return {
                ...state,
                getChallengeStreaksIsLoading: true,
            };

        case GET_CHALLENGE_STREAKS_LOADED:
            return {
                ...state,
                getChallengeStreaksIsLoading: false,
            };

        case GET_CHALLENGE_STREAKS_FAIL:
            return {
                ...state,
                getChallengeStreaksErrorMessage: action.payload,
            };

        case GET_ONE_CHALLENGE_STREAK:
            return {
                ...state,
                selectedChallengeStreak: action.payload,
            };

        case JOIN_CHALLENGE_STREAK:
            return {
                ...state,
                challengeStreaks: [...state.challengeStreaks, action.payload],
            };

        case CREATE_COMPLETE_CHALLENGE_STREAK_TASK:
            return {
                ...state,
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
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
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
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
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
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
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
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
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
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
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
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
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
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
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
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

        case JOIN_CHALLENGE_STREAK_LOADING:
            return {
                ...state,
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload) {
                        const challengeStreakWithClientData: ChallengeStreakWithClientData = {
                            ...challengeStreak,
                            joinChallengeStreakTaskIsLoading: true,
                        };
                        return challengeStreakWithClientData;
                    }
                    return challengeStreak;
                }),
            };

        case JOIN_CHALLENGE_STREAK_LOADED:
            return {
                ...state,
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
                    if (challengeStreak._id === action.payload) {
                        const challengeStreakWithClientData: ChallengeStreakWithClientData = {
                            ...challengeStreak,
                            joinChallengeStreakTaskIsLoading: false,
                        };
                        return challengeStreakWithClientData;
                    }
                    return challengeStreak;
                }),
            };

        case JOIN_CHALLENGE_STREAK_FAIL:
            return {
                ...state,
                challengeStreaks: state.challengeStreaks.map(challengeStreak => {
                    if (challengeStreak.challengeId === action.payload.challengeId) {
                        const challengeStreakWithClientData: ChallengeStreakWithClientData = {
                            ...challengeStreak,
                            joinChallengeStreakTaskErrorMessage: action.payload.errorMessage,
                        };
                        return challengeStreakWithClientData;
                    }
                    return challengeStreak;
                }),
            };

        default:
            return state;
    }
};

export { challengeStreakReducer };
