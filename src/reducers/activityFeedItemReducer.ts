import {
    GET_ACTIVITY_FEED_ITEMS,
    GET_ACTIVITY_FEED_ITEMS_FAIL,
    GET_ACTIVITY_FEED_ITEMS_LOADED,
    GET_ACTIVITY_FEED_ITEMS_LOADING,
    ActivityFeedItemsActionTypes,
} from '../actions/types';
import { ActivityFeedItem } from '@streakoid/streakoid-sdk/lib';

export interface ActivityReducerState {
    activityFeedItems: ActivityFeedItem[];
    getAllActivityFeedItemsLoading: boolean;
    getAllActivityFeedItemsErrorMessage: string;
}

const initialState: ActivityReducerState = {
    activityFeedItems: [],
    getAllActivityFeedItemsLoading: false,
    getAllActivityFeedItemsErrorMessage: '',
};

const activityFeedItemReducer = (state = initialState, action: ActivityFeedItemsActionTypes): ActivityReducerState => {
    switch (action.type) {
        case GET_ACTIVITY_FEED_ITEMS:
            return {
                ...state,
                activityFeedItems: action.payload,
            };

        case GET_ACTIVITY_FEED_ITEMS_FAIL:
            return {
                ...state,
                getAllActivityFeedItemsErrorMessage: action.payload,
            };

        case GET_ACTIVITY_FEED_ITEMS_LOADING:
            return {
                ...state,
                getAllActivityFeedItemsLoading: true,
            };

        case GET_ACTIVITY_FEED_ITEMS_LOADED:
            return {
                ...state,
                getAllActivityFeedItemsLoading: false,
            };

        default:
            return state;
    }
};

export { activityFeedItemReducer };
