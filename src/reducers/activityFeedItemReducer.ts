import {
    GET_ACTIVITY_FEED_ITEMS,
    GET_ACTIVITY_FEED_ITEMS_FAIL,
    GET_ACTIVITY_FEED_ITEMS_LOADED,
    GET_ACTIVITY_FEED_ITEMS_LOADING,
    ActivityFeedItemsActionTypes,
    CLEAR_ACTIVITY_FEED_ITEMS,
} from '../actions/types';
import { UserActivityFeedActionItem } from '../actions/activityFeedItemActions';

export interface ActivityFeedItemReducerState {
    activityFeedItems: UserActivityFeedActionItem[];
    totalCountOfActivityFeedItems: number;
    getAllActivityFeedItemsLoading: boolean;
    getAllActivityFeedItemsErrorMessage: string;
    clearActivityFeedItemsErrorMessage: string;
}

const initialState: ActivityFeedItemReducerState = {
    activityFeedItems: [],
    totalCountOfActivityFeedItems: 0,
    getAllActivityFeedItemsLoading: false,
    getAllActivityFeedItemsErrorMessage: '',
    clearActivityFeedItemsErrorMessage: '',
};

const activityFeedItemReducer = (
    state = initialState,
    action: ActivityFeedItemsActionTypes,
): ActivityFeedItemReducerState => {
    switch (action.type) {
        case GET_ACTIVITY_FEED_ITEMS:
            return {
                ...state,
                activityFeedItems: action.payload.activityFeedItems,
                totalCountOfActivityFeedItems: action.payload.totalCountOfActivityFeedItems,
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

        case CLEAR_ACTIVITY_FEED_ITEMS:
            return {
                ...state,
                activityFeedItems: [],
                totalCountOfActivityFeedItems: 0,
            };

        default:
            return state;
    }
};

export { activityFeedItemReducer };
