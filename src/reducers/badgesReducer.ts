import {
    GET_BADGES,
    GET_BADGES_FAIL,
    GET_BADGES_IS_LOADING,
    GET_BADGES_IS_LOADED,
    BadgesActionTypes,
    GET_USER_BADGES,
    GET_USER_BADGES_FAIL,
} from '../actions/types';
import { Badge } from '@streakoid/streakoid-sdk/lib';

export interface BadgeReducerState {
    badgeList: Badge[];
    getAllBadgesIsLoading: boolean;
    getAllBadgesErrorMessage: string;
    userBadges: UserBadge[];
    getUserBadgesIsLoading: boolean;
    getUserBadgesErrorMessage: string;
}

const initialState: BadgeReducerState = {
    badgeList: [],
    getAllBadgesIsLoading: false,
    getAllBadgesErrorMessage: '',
    userBadges: [],
    getUserBadgesIsLoading: false,
    getUserBadgesErrorMessage: '',
};

export interface UserBadge extends Badge {
    longestStreak: number;
}

const badgeReducer = (state = initialState, action: BadgesActionTypes): BadgeReducerState => {
    switch (action.type) {
        case GET_BADGES:
            return {
                ...state,
                badgeList: action.payload,
            };

        case GET_BADGES_FAIL:
            return {
                ...state,
                getAllBadgesErrorMessage: action.payload,
            };

        case GET_BADGES_IS_LOADING:
            return {
                ...state,
                getAllBadgesIsLoading: true,
            };

        case GET_BADGES_IS_LOADED:
            return {
                ...state,
                getAllBadgesIsLoading: false,
            };

        case GET_USER_BADGES:
            return {
                ...state,
                userBadges: action.payload,
            };

        case GET_USER_BADGES_FAIL:
            return {
                ...state,
                getUserBadgesErrorMessage: action.payload,
            };

        case GET_BADGES_IS_LOADING:
            return {
                ...state,
                getUserBadgesIsLoading: true,
            };

        case GET_BADGES_IS_LOADED:
            return {
                ...state,
                getUserBadgesIsLoading: false,
            };

        default:
            return state;
    }
};

export { badgeReducer };
