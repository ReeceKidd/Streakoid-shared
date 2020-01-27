import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import {
    GET_ACTIVITY_FEED_ITEMS,
    GET_ACTIVITY_FEED_ITEMS_FAIL,
    GET_ACTIVITY_FEED_ITEMS_LOADED,
    GET_ACTIVITY_FEED_ITEMS_LOADING,
} from './types';
import { AppActions } from '..';

const activityFeedItemActions = (streakoid: typeof streakoidSDK) => {
    const getActivityFeedItems = ({ userId, streakId }: { userId?: string; streakId?: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_ACTIVITY_FEED_ITEMS_LOADING });
            let query: { userId?: string; streakId?: string } = {};
            if (userId) {
                query = { userId };
            }
            if (streakId) {
                query = { streakId };
            }
            const activityFeedItems = await streakoid.activityFeedItems.getAll(query);
            dispatch({ type: GET_ACTIVITY_FEED_ITEMS, payload: activityFeedItems });
            dispatch({ type: GET_ACTIVITY_FEED_ITEMS_LOADED });
        } catch (err) {
            dispatch({ type: GET_ACTIVITY_FEED_ITEMS_LOADED });
            if (err.response) {
                dispatch({ type: GET_ACTIVITY_FEED_ITEMS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_ACTIVITY_FEED_ITEMS_FAIL, payload: err.message });
            }
        }
    };

    return {
        getActivityFeedItems,
    };
};

export { activityFeedItemActions };
