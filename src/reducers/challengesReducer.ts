import {
    GET_CHALLENGES,
    GET_CHALLENGES_FAIL,
    GET_CHALLENGES_IS_LOADING,
    GET_CHALLENGES_IS_LOADED,
    ChallengeActionTypes,
} from '../actions/types';
import { Challenge } from '@streakoid/streakoid-sdk/lib';

export interface ChallengeReducerState {
    challengeList: Challenge[];
    getAllChallengesIsLoading: boolean;
    getAllChallengesErrorMessage: string;
}

const initialState: ChallengeReducerState = {
    challengeList: [],
    getAllChallengesIsLoading: false,
    getAllChallengesErrorMessage: '',
};

const challengeReducer = (state = initialState, action: ChallengeActionTypes): ChallengeReducerState => {
    switch (action.type) {
        case GET_CHALLENGES:
            return {
                ...state,
                challengeList: action.payload,
            };

        case GET_CHALLENGES_FAIL:
            return {
                ...state,
                getAllChallengesErrorMessage: action.payload,
            };

        case GET_CHALLENGES_IS_LOADING:
            return {
                ...state,
                getAllChallengesIsLoading: true,
            };

        case GET_CHALLENGES_IS_LOADED:
            return {
                ...state,
                getAllChallengesIsLoading: false,
            };

        default:
            return state;
    }
};

export { challengeReducer };
