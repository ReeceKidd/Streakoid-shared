import {
    StreakRecommendationsActionTypes,
    GET_STREAK_RECOMMENDATIONS,
    GET_STREAK_RECOMMENDATIONS_FAIL,
    GET_STREAK_RECOMMENDATIONS_IS_LOADING,
    GET_STREAK_RECOMMENDATIONS_IS_LOADED,
    CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE,
    SELECT_STREAK_RECOMMENDATION,
    SELECT_STREAK_RECOMMENDATION_FAIL,
    SELECT_STREAK_RECOMMENDATION_IS_LOADING,
    SELECT_STREAK_RECOMMENDATION_IS_LOADED,
} from '../actions/types';
import { Challenge } from '@streakoid/streakoid-models/lib/Models/Challenge';

export interface StreakRecommendationReducerState {
    streakRecommendations: StreakRecommendationWithClientData[];
    getStreakRecommendationsErrorMessage: string;
    getStreakRecommendationsIsLoading: boolean;
}

const initialState: StreakRecommendationReducerState = {
    streakRecommendations: [],
    getStreakRecommendationsErrorMessage: '',
    getStreakRecommendationsIsLoading: false,
};

export interface StreakRecommendationWithClientData extends Challenge {
    apiErrorMessage: string;
    hasBeenSelected: boolean;
    isLoading: boolean;
}

const streakRecommendationReducer = (
    state = initialState,
    action: StreakRecommendationsActionTypes,
): StreakRecommendationReducerState => {
    switch (action.type) {
        case GET_STREAK_RECOMMENDATIONS:
            return {
                ...state,
                streakRecommendations: action.payload,
            };

        case GET_STREAK_RECOMMENDATIONS_FAIL:
            return {
                ...state,
                getStreakRecommendationsErrorMessage: action.payload,
            };

        case GET_STREAK_RECOMMENDATIONS_IS_LOADING: {
            return {
                ...state,
                getStreakRecommendationsIsLoading: true,
            };
        }

        case GET_STREAK_RECOMMENDATIONS_IS_LOADED: {
            return {
                ...state,
                getStreakRecommendationsIsLoading: false,
            };
        }

        case CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE: {
            return {
                ...state,
                getStreakRecommendationsErrorMessage: '',
            };
        }

        case SELECT_STREAK_RECOMMENDATION:
            return {
                ...state,
                streakRecommendations: state.streakRecommendations.map(streakRecommendation => {
                    if (streakRecommendation._id === action.payload) {
                        return {
                            ...streakRecommendation,
                            hasBeenSelected: true,
                        };
                    }
                    return streakRecommendation;
                }),
            };

        case SELECT_STREAK_RECOMMENDATION_FAIL:
            return {
                ...state,
                streakRecommendations: state.streakRecommendations.map(streakRecommendation => {
                    if (streakRecommendation._id === action.payload.challengeId) {
                        return {
                            ...streakRecommendation,
                            apiError: action.payload.errorMessage,
                        };
                    }
                    return streakRecommendation;
                }),
            };

        case SELECT_STREAK_RECOMMENDATION_IS_LOADING:
            return {
                ...state,
                streakRecommendations: state.streakRecommendations.map(streakRecommendation => {
                    if (streakRecommendation._id === action.payload.challengeId) {
                        return {
                            ...streakRecommendation,
                            isLoading: true,
                        };
                    }
                    return streakRecommendation;
                }),
            };

        case SELECT_STREAK_RECOMMENDATION_IS_LOADED:
            return {
                ...state,
                streakRecommendations: state.streakRecommendations.map(streakRecommendation => {
                    if (streakRecommendation._id === action.payload.challengeId) {
                        return {
                            ...streakRecommendation,
                            isLoading: false,
                        };
                    }
                    return streakRecommendation;
                }),
            };

        default:
            return state;
    }
};

export { streakRecommendationReducer };
