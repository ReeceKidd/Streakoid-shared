import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import { GET_ACTIVITIES, GET_ACTIVITIES_FAIL, GET_ACTIVITIES_LOADED, GET_ACTIVITIES_LOADING } from './types';
import { AppActions } from '..';

const activityActions = (streakoid: typeof streakoidSDK) => {
    const getActivities = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_ACTIVITIES_LOADING });
            const activitys = await streakoid.activities.getAll({});
            dispatch({ type: GET_ACTIVITIES, payload: activitys });
            dispatch({ type: GET_ACTIVITIES_LOADED });
        } catch (err) {
            dispatch({ type: GET_ACTIVITIES_LOADED });
            if (err.response) {
                dispatch({ type: GET_ACTIVITIES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_ACTIVITIES_FAIL, payload: err.message });
            }
        }
    };

    return {
        getActivities,
    };
};

export { activityActions };
