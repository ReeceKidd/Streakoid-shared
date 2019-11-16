import { Dispatch } from 'redux';

import {
    GET_STREAK_RECOMMENDATIONS_IS_LOADING,
    GET_STREAK_RECOMMENDATIONS,
    GET_STREAK_RECOMMENDATIONS_IS_LOADED,
    GET_STREAK_RECOMMENDATIONS_FAIL,
    CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE,
    SELECT_STREAK_RECOMMENDATION,
    SELECT_STREAK_RECOMMENDATION_FAIL,
    SELECT_STREAK_RECOMMENDATION_IS_LOADING,
    SELECT_STREAK_RECOMMENDATION_IS_LOADED,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { StreakRecommendationWithClientData } from '../reducers/streakRecommendationsReducer';

const streakRecommendationActions = (streakoid: typeof streakoidSDK) => {
    const getStreakRecommendations = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_STREAK_RECOMMENDATIONS_IS_LOADING });
            const streakRecommendations = await streakoid.streakRecommendations.getAll({});
            const streakRecommendationsWithClientData: StreakRecommendationWithClientData[] = streakRecommendations.map(
                streakRecommendation => ({
                    ...streakRecommendation,
                    apiErrorMessage: '',
                    hasBeenSelected: false,
                    isLoading: false,
                }),
            );
            dispatch({ type: GET_STREAK_RECOMMENDATIONS, payload: streakRecommendationsWithClientData });
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

    const selectStreakRecommendation = ({
        streakRecommendationId,
        streakName,
        streakDescription,
        numberOfMinutes,
    }: {
        streakRecommendationId: string;
        streakName: string;
        streakDescription?: string;
        numberOfMinutes?: number;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            const userId = getState().users.currentUser._id;
            dispatch({ type: SELECT_STREAK_RECOMMENDATION_IS_LOADING, payload: { streakRecommendationId } });
            dispatch({ type: SELECT_STREAK_RECOMMENDATION, payload: streakRecommendationId });
            await streakoid.soloStreaks.create({ userId, streakName, streakDescription, numberOfMinutes });
            dispatch({ type: SELECT_STREAK_RECOMMENDATION_IS_LOADED, payload: { streakRecommendationId } });
        } catch (err) {
            dispatch({ type: SELECT_STREAK_RECOMMENDATION_IS_LOADED, payload: { streakRecommendationId } });
            if (err.response) {
                dispatch({
                    type: SELECT_STREAK_RECOMMENDATION_FAIL,
                    payload: { streakRecommendationId, errorMessage: err.response.message },
                });
            } else {
                dispatch({
                    type: SELECT_STREAK_RECOMMENDATION_FAIL,
                    payload: { streakRecommendationId, errorMessage: err.message },
                });
            }
        }
    };

    const clearGetStreakRecommendationsErrorMessage = (): AppActions => ({
        type: CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE,
    });

    return {
        getStreakRecommendations,
        selectStreakRecommendation,
        clearGetStreakRecommendationsErrorMessage,
    };
};

export { streakRecommendationActions };
