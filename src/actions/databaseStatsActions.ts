import { Dispatch } from 'redux';

import {
    GET_DATABASE_STATS,
    GET_DATABASE_STATS_FAIL,
    GET_DATABASE_STATS_LOADING,
    GET_DATABASE_STATS_LOADED,
} from './types';
import { AppActions } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';

const databaseStatsActions = (streakoid: StreakoidSDK) => {
    const getStats = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_DATABASE_STATS_LOADING });
            const databaseStats = await streakoid.databaseStats.get();
            dispatch({ type: GET_DATABASE_STATS, payload: databaseStats });
            dispatch({ type: GET_DATABASE_STATS_LOADED });
        } catch (err) {
            dispatch({ type: GET_DATABASE_STATS_LOADED });
            if (err.response) {
                dispatch({ type: GET_DATABASE_STATS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_DATABASE_STATS_FAIL, payload: err.message });
            }
        }
    };

    return {
        getStats,
    };
};

export { databaseStatsActions };
