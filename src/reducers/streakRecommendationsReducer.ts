import { StreakRecommendation } from '@streakoid/streakoid-sdk/lib';

import {
    StreakRecommendationsActionTypes,
    GET_STREAK_RECOMMENDATIONS,
    GET_STREAK_RECOMMENDATIONS_FAIL,
    GET_STREAK_RECOMMENDATIONS_IS_LOADING,
    GET_STREAK_RECOMMENDATIONS_IS_LOADED,
    CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE,
} from '../actions/types';

export interface StreakRecommendationReducerState {
    streakRecommendations: StreakRecommendation[];
    getStreakRecommendationsErrorMessage: string;
    getStreakRecommendationsIsLoading: boolean;
}

const initialState: StreakRecommendationReducerState = {
    streakRecommendations: [],
    getStreakRecommendationsErrorMessage: '',
    getStreakRecommendationsIsLoading: false,
};

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

        case CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE: {
            return {
                ...state,
                getStreakRecommendationsErrorMessage: '',
            };
        }

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

        default:
            return state;
    }
};

export { streakRecommendationReducer };
