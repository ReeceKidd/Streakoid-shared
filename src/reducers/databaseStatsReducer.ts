import {
    GET_DATABASE_STATS,
    GET_DATABASE_STATS_FAIL,
    GET_DATABASE_STATS_LOADING,
    GET_DATABASE_STATS_LOADED,
    DatabaseStatsActionTypes,
} from '../actions/types';
import { DatabaseStats } from '@streakoid/streakoid-sdk/lib';

export interface DatabaseStatsReducerState {
    stats: DatabaseStats;
    getStatsIsLoading: boolean;
    getStatsFailMessage: string;
}

const initialState: DatabaseStatsReducerState = {
    stats: {
        totalUsers: 0,
        totalLiveChallengeStreaks: 0,
        totalLiveSoloStreaks: 0,
        totalLiveTeamStreaks: 0,
        totalStreaks: 0,
    },
    getStatsFailMessage: '',
    getStatsIsLoading: false,
};

const databaseStatsReducer = (state = initialState, action: DatabaseStatsActionTypes): DatabaseStatsReducerState => {
    switch (action.type) {
        case GET_DATABASE_STATS:
            return {
                ...state,
                stats: action.payload,
            };

        case GET_DATABASE_STATS_FAIL:
            return {
                ...state,
                getStatsFailMessage: action.payload,
            };

        case GET_DATABASE_STATS_LOADING:
            return {
                ...state,
                getStatsIsLoading: true,
            };

        case GET_DATABASE_STATS_LOADED:
            return {
                ...state,
                getStatsIsLoading: false,
            };

        default:
            return state;
    }
};

export { databaseStatsReducer };
