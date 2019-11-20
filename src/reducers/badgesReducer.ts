import {
    GET_BADGES,
    GET_BADGES_FAIL,
    GET_BADGES_IS_LOADING,
    GET_BADGES_IS_LOADED,
    BadgesActionTypes,
} from '../actions/types';
import { Badge } from '@streakoid/streakoid-sdk/lib';

export interface BadgeReducerState {
    badgeList: Badge[];
    getAllBadgesIsLoading: boolean;
    getAllBadgesErrorMessage: string;
}

const initialState: BadgeReducerState = {
    badgeList: [],
    getAllBadgesIsLoading: false,
    getAllBadgesErrorMessage: '',
};

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

        default:
            return state;
    }
};

export { badgeReducer };
