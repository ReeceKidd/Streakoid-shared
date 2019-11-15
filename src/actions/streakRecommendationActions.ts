import { Dispatch } from 'redux';

import {
    GET_STREAK_RECOMMENDATIONS_IS_LOADING,
    GET_STREAK_RECOMMENDATIONS,
    GET_STREAK_RECOMMENDATIONS_IS_LOADED,
    GET_STREAK_RECOMMENDATIONS_FAIL,
    CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE,
} from './types';
import { AppActions } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

const streakRecommendationActions = (streakoid: typeof streakoidSDK) => {
    const getStreakRecommendations = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_STREAK_RECOMMENDATIONS_IS_LOADING });
            const streakRecommendations = await streakoid.streakRecommendations.getAll({});
            dispatch({ type: GET_STREAK_RECOMMENDATIONS, payload: streakRecommendations });
            dispatch({ type: GET_STREAK_RECOMMENDATIONS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_STREAK_RECOMMENDATIONS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_STREAK_RECOMMENDATIONS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_STREAK_RECOMMENDATIONS_FAIL, payload: err.message });
            }
        }
    };

    const clearGetStreakRecommendationsErrorMessage = (): AppActions => ({
        type: CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE,
    });

    return {
        getStreakRecommendations,
        clearGetStreakRecommendationsErrorMessage,
    };
};

export { streakRecommendationActions };
