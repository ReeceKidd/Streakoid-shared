import {
    GET_CHALLENGES,
    GET_CHALLENGES_FAIL,
    GET_CHALLENGES_IS_LOADING,
    GET_CHALLENGES_IS_LOADED,
    ChallengeActionTypes,
    GET_SELECTED_CHALLENGE,
    GET_SELECTED_CHALLENGE_FAIL,
    JOIN_CHALLENGE_LOADING,
    JOIN_CHALLENGE_LOADED,
    JOIN_CHALLENGE_FAIL,
    GET_SELECTED_CHALLENGE_IS_LOADING,
    GET_SELECTED_CHALLENGE_IS_LOADED,
    UPDATE_SELECTED_CHALLENGE,
    UPDATE_SELECTED_CHALLENGE_FAIL,
    UPDATE_SELECTED_CHALLENGE_IS_LOADING,
    UPDATE_SELECTED_CHALLENGE_IS_LOADED,
} from '../actions/types';
import { Challenge, PopulatedChallenge, ChallengeMember, CurrentStreak } from '@streakoid/streakoid-sdk';

export interface ChallengeReducerState {
    challengeList: Challenge[];
    getAllChallengesIsLoading: boolean;
    getAllChallengesErrorMessage: string;
    selectedChallenge: SelectedChallenge;
    getSelectedChallengeIsLoading: boolean;
    getSelectedChallengesErrorMessage: string;
    updateSelectedChallengeIsLoading: boolean;
    updateSelectedChallengeErrorMessage: string;
    joinChallengeIsLoading: boolean;
    joinChallengeErrorMessage: string;
}

export interface SelectedChallenge extends PopulatedChallenge {
    userIsApartOfChallenge: boolean;
    longestCurrentStreakForChallenge: number;
    longestEverStreakForChallenge: number;
    averageStreakForChallenge: number;
    totalTimesTracked: number;
    members: ChallengeMemberWithClientData[];
    usersChallengeStreakId: string;
}

export interface ChallengeMemberWithClientData extends ChallengeMember {
    challengeStreakId: string;
    currentStreak: CurrentStreak;
    longestStreak: number;
    averageStreak: number;
    totalTimesTracked: number;
    joinedChallenge: Date;
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
        members: [],
        createdAt: '',
        updatedAt: '',
        userIsApartOfChallenge: false,
        longestCurrentStreakForChallenge: 0,
        longestEverStreakForChallenge: 0,
        averageStreakForChallenge: 0,
        totalTimesTracked: 0,
        numberOfMembers: 0,
        usersChallengeStreakId: '',
    },
    getSelectedChallengeIsLoading: false,
    getSelectedChallengesErrorMessage: '',
    updateSelectedChallengeIsLoading: false,
    updateSelectedChallengeErrorMessage: '',
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

        case GET_SELECTED_CHALLENGE:
            return {
                ...state,
                selectedChallenge: action.payload,
            };

        case GET_SELECTED_CHALLENGE_FAIL:
            return {
                ...state,
                getSelectedChallengesErrorMessage: action.payload,
            };

        case GET_SELECTED_CHALLENGE_IS_LOADING: {
            return {
                ...state,
                getSelectedChallengeIsLoading: true,
            };
        }

        case GET_SELECTED_CHALLENGE_IS_LOADED: {
            return {
                ...state,
                getSelectedChallengeIsLoading: false,
            };
        }

        case UPDATE_SELECTED_CHALLENGE:
            return {
                ...state,
                selectedChallenge: action.payload,
            };

        case UPDATE_SELECTED_CHALLENGE_FAIL:
            return {
                ...state,
                updateSelectedChallengeErrorMessage: action.payload,
            };

        case UPDATE_SELECTED_CHALLENGE_IS_LOADING: {
            return {
                ...state,
                updateSelectedChallengeIsLoading: true,
            };
        }

        case UPDATE_SELECTED_CHALLENGE_IS_LOADED: {
            return {
                ...state,
                updateSelectedChallengeIsLoading: false,
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
