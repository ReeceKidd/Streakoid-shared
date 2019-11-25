import { ChallengeStreak } from '@streakoid/streakoid-sdk/lib';

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
} from '../actions/types';

export interface ChallengeStreakReducerState {
    challengeStreaks: ChallengeStreakWithClientData[];
    getChallengeStreaksIsLoading: boolean;
}

const initialState: ChallengeStreakReducerState = {
    challengeStreaks: [],
    getChallengeStreaksIsLoading: false,
};

export interface ChallengeStreakWithClientData extends ChallengeStreak {
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
