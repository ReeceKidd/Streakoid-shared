import {
    GET_CHALLENGES,
    GET_CHALLENGES_FAIL,
    GET_CHALLENGES_IS_LOADING,
    GET_CHALLENGES_IS_LOADED,
    ChallengeActionTypes,
    GET_CHALLENGE,
    GET_CHALLENGE_FAIL,
    JOIN_CHALLENGE_LOADING,
    JOIN_CHALLENGE_LOADED,
    JOIN_CHALLENGE_FAIL,
} from '../actions/types';
import { Challenge } from '@streakoid/streakoid-sdk/lib';

export interface ChallengeReducerState {
    challengeList: Challenge[];
    getAllChallengesIsLoading: boolean;
    getAllChallengesErrorMessage: string;
    selectedChallenge: Challenge;
    getSelectedChallengeIsLoading: boolean;
    getSelectedChallengesErrorMessage: string;
    joinChallengeIsLoading: boolean;
    joinChallengeErrorMessage: string;
}

const initialState: ChallengeReducerState = {
    challengeList: [],
    getAllChallengesIsLoading: false,
    getAllChallengesErrorMessage: '',
    selectedChallenge: {
        _id: '',
        name: '',
        description: '',
        icon: '',
        color: '',
        badgeId: '',
        members: [],
        levels: [],
        createdAt: '',
        updatedAt: '',
    },
    getSelectedChallengeIsLoading: false,
    getSelectedChallengesErrorMessage: '',
    joinChallengeIsLoading: false,
    joinChallengeErrorMessage: '',
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

        case GET_CHALLENGE:
            return {
                ...state,
                selectedChallenge: action.payload,
            };

        case GET_CHALLENGE_FAIL:
            return {
                ...state,
                getSelectedChallengesErrorMessage: action.payload,
            };

        case GET_CHALLENGES_IS_LOADING: {
            return {
                ...state,
                getSelectedChallengeIsLoading: true,
            };
        }

        case GET_CHALLENGES_IS_LOADING: {
            return {
                ...state,
                getSelectedChallengeIsLoading: false,
            };
        }

        case JOIN_CHALLENGE_LOADING:
            return {
                ...state,
                joinChallengeIsLoading: true,
            };

        case JOIN_CHALLENGE_LOADED:
            return {
                ...state,
                joinChallengeIsLoading: false,
            };

        case JOIN_CHALLENGE_FAIL:
            return {
                ...state,
                joinChallengeErrorMessage: action.payload,
            };

        default:
            return state;
    }
};

export { challengeReducer };
