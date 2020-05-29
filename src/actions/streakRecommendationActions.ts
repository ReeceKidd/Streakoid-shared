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
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { StreakRecommendationWithClientData } from '../reducers/streakRecommendationsReducer';

const streakRecommendationActions = (streakoid: StreakoidSDK) => {
    const getStreakRecommendations = ({
        limit,
        random,
        sortedByNumberOfMembers,
    }: {
        limit: number;
        random: boolean;
        sortedByNumberOfMembers: boolean;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_STREAK_RECOMMENDATIONS_IS_LOADING });
            const streakRecommendations = await streakoid.streakRecommendations.getAll({
                limit,
                random,
                sortedByNumberOfMembers,
            });
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

    const selectStreakRecommendation = ({ challengeId }: { challengeId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            const userId = getState().users.currentUser._id;
            dispatch({ type: SELECT_STREAK_RECOMMENDATION_IS_LOADING, payload: { challengeId } });
            dispatch({ type: SELECT_STREAK_RECOMMENDATION, payload: challengeId });
            await streakoid.challengeStreaks.create({ userId, challengeId });
            dispatch({ type: SELECT_STREAK_RECOMMENDATION_IS_LOADED, payload: { challengeId } });
        } catch (err) {
            dispatch({ type: SELECT_STREAK_RECOMMENDATION_IS_LOADED, payload: { challengeId } });
            if (err.response) {
                dispatch({
                    type: SELECT_STREAK_RECOMMENDATION_FAIL,
                    payload: { challengeId, errorMessage: err.response.message },
                });
            } else {
                dispatch({
                    type: SELECT_STREAK_RECOMMENDATION_FAIL,
                    payload: { challengeId, errorMessage: err.message },
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
