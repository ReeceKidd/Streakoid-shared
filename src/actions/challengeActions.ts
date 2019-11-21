import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import {
    GET_CHALLENGES,
    GET_CHALLENGES_FAIL,
    GET_CHALLENGES_IS_LOADING,
    GET_CHALLENGES_IS_LOADED,
    GET_CHALLENGE_IS_LOADING,
    GET_CHALLENGE,
    GET_CHALLENGE_IS_LOADED,
    GET_CHALLENGE_FAIL,
} from './types';
import { AppActions } from '..';

const challengeActions = (streakoid: typeof streakoidSDK) => {
    const getChallenges = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGES_IS_LOADING });
            const challenges = await streakoid.challenges.getAll({});
            dispatch({ type: GET_CHALLENGES, payload: challenges });
            dispatch({ type: GET_CHALLENGES_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CHALLENGES_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_CHALLENGES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_CHALLENGES_FAIL, payload: err.message });
            }
        }
    };

    const getChallenge = (challengeId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGE_IS_LOADING });
            const challenge = await streakoid.challenges.getOne(challengeId);
            dispatch({ type: GET_CHALLENGE, payload: challenge });
            dispatch({ type: GET_CHALLENGE_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CHALLENGES_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_CHALLENGE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_CHALLENGE_FAIL, payload: err.message });
            }
        }
    };

    return {
        getChallenges,
        getChallenge,
    };
};

export { challengeActions };
