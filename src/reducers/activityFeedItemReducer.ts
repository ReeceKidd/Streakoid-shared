import {
    GET_ACTIVITY_FEED_ITEMS,
    GET_ACTIVITY_FEED_ITEMS_FAIL,
    GET_ACTIVITY_FEED_ITEMS_LOADED,
    GET_ACTIVITY_FEED_ITEMS_LOADING,
    ActivityFeedItemsActionTypes,
} from '../actions/types';
import { UserActivityFeedActionItem } from '../actions/activityFeedItemActions';

export interface ActivityFeedItemReducerState {
    activityFeedItems: UserActivityFeedActionItem[];
    getAllActivityFeedItemsLoading: boolean;
    getAllActivityFeedItemsErrorMessage: string;
}

const initialState: ActivityFeedItemReducerState = {
    activityFeedItems: [],
    getAllActivityFeedItemsLoading: false,
    getAllActivityFeedItemsErrorMessage: '',
};

const activityFeedItemReducer = (
    state = initialState,
    action: ActivityFeedItemsActionTypes,
): ActivityFeedItemReducerState => {
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
