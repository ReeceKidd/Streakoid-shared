import {
    ActivityFeedItemsActionTypes,
    GET_FOLLOWING_ACTIVITY_FEED,
    GET_FOLLOWING_ACTIVITY_FEED_FAIL,
    GET_FOLLOWING_ACTIVITY_FEED_LOADING,
    GET_FOLLOWING_ACTIVITY_FEED_LOADED,
    CLEAR_FOLLOWING_ACTIVITY_FEED,
    GET_GLOBAL_ACTIVITY_FEED,
    GET_GLOBAL_ACTIVITY_FEED_FAIL,
    GET_GLOBAL_ACTIVITY_FEED_LOADING,
    GET_GLOBAL_ACTIVITY_FEED_LOADED,
    CLEAR_GLOBAL_ACTIVITY_FEED,
} from '../actions/types';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';

export interface ActivityFeedItemReducerState {
    followingActivityFeed: ClientActivityFeedItemType[];
    totalFollowingActivityFeedItems: number;
    getFollowingActivityFeedLoading: boolean;
    getFollowingActivityFeedErrorMessage: string;
    clearFollowingActivityFeedErrorMessage: string;
    globalActivityFeed: ClientActivityFeedItemType[];
    totalGlobalActivityFeedItems: number;
    getGlobalActivityFeedLoading: boolean;
    getGlobalActivityFeedErrorMessage: string;
    clearGlobalActivityFeedErrorMessage: string;
}

const initialState: ActivityFeedItemReducerState = {
    followingActivityFeed: [],
    totalFollowingActivityFeedItems: 0,
    getFollowingActivityFeedLoading: false,
    getFollowingActivityFeedErrorMessage: '',
    clearFollowingActivityFeedErrorMessage: '',
    globalActivityFeed: [],
    totalGlobalActivityFeedItems: 0,
    getGlobalActivityFeedLoading: false,
    getGlobalActivityFeedErrorMessage: '',
    clearGlobalActivityFeedErrorMessage: '',
};

const activityFeedReducer = (
    state = initialState,
    action: ActivityFeedItemsActionTypes,
): ActivityFeedItemReducerState => {
    switch (action.type) {
        case GET_FOLLOWING_ACTIVITY_FEED:
            return {
                ...state,
                followingActivityFeed: action.payload.activityFeedItems,
                totalFollowingActivityFeedItems: action.payload.totalCountOfActivityFeedItems,
            };

        case GET_FOLLOWING_ACTIVITY_FEED_FAIL:
            return {
                ...state,
                getFollowingActivityFeedErrorMessage: action.payload,
            };

        case GET_FOLLOWING_ACTIVITY_FEED_LOADING:
            return {
                ...state,
                getFollowingActivityFeedLoading: true,
            };

        case GET_FOLLOWING_ACTIVITY_FEED_LOADED:
            return {
                ...state,
                getFollowingActivityFeedLoading: false,
            };

        case CLEAR_FOLLOWING_ACTIVITY_FEED:
            return {
                ...state,
                followingActivityFeed: [],
                totalFollowingActivityFeedItems: 0,
            };

        case GET_GLOBAL_ACTIVITY_FEED:
            return {
                ...state,
                globalActivityFeed: action.payload.activityFeedItems,
                totalGlobalActivityFeedItems: action.payload.totalCountOfActivityFeedItems,
            };

        case GET_GLOBAL_ACTIVITY_FEED_FAIL:
            return {
                ...state,
                getGlobalActivityFeedErrorMessage: action.payload,
            };

        case GET_GLOBAL_ACTIVITY_FEED_LOADING:
            return {
                ...state,
                getGlobalActivityFeedLoading: true,
            };

        case GET_GLOBAL_ACTIVITY_FEED_LOADED:
            return {
                ...state,
                getGlobalActivityFeedLoading: false,
            };

        case CLEAR_GLOBAL_ACTIVITY_FEED:
            return {
                ...state,
                globalActivityFeed: [],
                totalGlobalActivityFeedItems: 0,
            };

        default:
            return state;
    }
};

export { activityFeedReducer };
