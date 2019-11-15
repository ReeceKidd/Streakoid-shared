import { StreakRecommendation } from '@streakoid/streakoid-sdk/lib';

import {
    StreakRecommendationsActionTypes,
    GET_STREAK_RECOMMENDATIONS,
    GET_STREAK_RECOMMENDATIONS_FAIL,
    GET_STREAK_RECOMMENDATIONS_IS_LOADING,
    GET_STREAK_RECOMMENDATIONS_IS_LOADED,
    CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE,
    SELECT_STREAK_RECOMMENDATION,
    UNSELECT_STREAK_RECOMMENDATION,
} from '../actions/types';

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

export interface StreakRecommendationWithClientData extends StreakRecommendation {
    hasBeenSelected: boolean;
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

        case CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE: {
            return {
                ...state,
                getStreakRecommendationsErrorMessage: '',
            };
        }

        case SELECT_STREAK_RECOMMENDATION:
            return {
                ...state,
                streakRecommendations: state.streakRecommendations.map(streakRecommendation => ({
                    ...streakRecommendation,
                    hasBeenSelected: true,
                })),
            };

        case UNSELECT_STREAK_RECOMMENDATION:
            return {
                ...state,
                streakRecommendations: state.streakRecommendations.map(streakRecommendation => ({
                    ...streakRecommendation,
                    hasBeenSelected: false,
                })),
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

        default:
            return state;
    }
};

export { streakRecommendationReducer };
