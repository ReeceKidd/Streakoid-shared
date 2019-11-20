import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import { GET_BADGES, GET_BADGES_FAIL, GET_BADGES_IS_LOADING, GET_BADGES_IS_LOADED } from './types';
import { AppActions } from '..';

const friendActions = (streakoid: typeof streakoidSDK) => {
    const getBadges = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_BADGES_IS_LOADING });
            const badges = await streakoid.badges.getAll({});
            dispatch({ type: GET_BADGES, payload: badges });
            dispatch({ type: GET_BADGES_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_BADGES_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_BADGES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_BADGES_FAIL, payload: err.message });
            }
        }
    };

    return {
        getBadges,
    };
};

export { friendActions };
