/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import { AppActions } from '..';
import ActivityFeedItemTypes from '@streakoid/streakoid-sdk/lib/ActivityFeedItemTypes';
import {
    GET_FOLLOWING_ACTIVITY_FEED_LOADING,
    GET_FOLLOWING_ACTIVITY_FEED,
    GET_FOLLOWING_ACTIVITY_FEED_LOADED,
    GET_FOLLOWING_ACTIVITY_FEED_FAIL,
    CLEAR_FOLLOWING_ACTIVITY_FEED,
    GET_GLOBAL_ACTIVITY_FEED_LOADING,
    GET_GLOBAL_ACTIVITY_FEED,
    GET_GLOBAL_ACTIVITY_FEED_LOADED,
    GET_GLOBAL_ACTIVITY_FEED_FAIL,
    CLEAR_GLOBAL_ACTIVITY_FEED,
} from './types';
import { getPopulatedActivityFeedItem } from '../helpers/activityFeed/getPopulatedActivityFeedItem';

export interface UserActivityFeedItem {
    _id: string;
    activityFeedItemType: ActivityFeedItemTypes;
    userId: string;
    userProfileImage: string;
    username: string;
    title: string;
    createdAt: string;
    description?: string;
    subjectId?: string;
    subjectName?: string;
}

export interface GetAllPopulatedActivityFeedItemsActionResponse {
    activityFeedItems: UserActivityFeedItem[];
    totalCountOfActivityFeedItems: number;
}

const activityFeedItemActions = (streakoid: typeof streakoidSDK) => {
    const getFollowingActivityFeedItems = ({
        limit,
        createdAtBefore,
        userIds,
        subjectId,
    }: {
        limit: number;
        createdAtBefore?: Date;
        userIds?: string[];
        subjectId?: string;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_FOLLOWING_ACTIVITY_FEED_LOADING });
            let query: { limit: number; createdAtBefore?: Date; userIds?: string[]; subjectId?: string } = {
                limit,
            };
            if (createdAtBefore) {
                query = { ...query, createdAtBefore };
            }
            if (userIds) {
                query = { ...query, userIds };
            }
            if (subjectId) {
                query = { ...query, subjectId };
            }
            const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll(
                query,
            );
            const populatedActivityFeedItems: UserActivityFeedItem[] = await Promise.all(
                activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            dispatch({
                type: GET_FOLLOWING_ACTIVITY_FEED,
                payload: { activityFeedItems: populatedActivityFeedItems, totalCountOfActivityFeedItems },
            });
            dispatch({ type: GET_FOLLOWING_ACTIVITY_FEED_LOADED });
        } catch (err) {
            dispatch({ type: GET_FOLLOWING_ACTIVITY_FEED_LOADED });
            if (err.response) {
                dispatch({ type: GET_FOLLOWING_ACTIVITY_FEED_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_FOLLOWING_ACTIVITY_FEED_FAIL, payload: err.message });
            }
        }
    };

    const clearFollowingActivityFeedItems = (): AppActions => ({
        type: CLEAR_FOLLOWING_ACTIVITY_FEED,
    });

    const getGlobalActivityFeedItems = ({
        limit,
        createdAtBefore,
        userIds,
        subjectId,
    }: {
        limit: number;
        createdAtBefore?: Date;
        userIds?: string[];
        subjectId?: string;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_GLOBAL_ACTIVITY_FEED_LOADING });
            let query: { limit: number; createdAtBefore?: Date; userIds?: string[]; subjectId?: string } = {
                limit,
            };
            if (createdAtBefore) {
                query = { ...query, createdAtBefore };
            }
            if (userIds) {
                query = { ...query, userIds };
            }
            if (subjectId) {
                query = { ...query, subjectId };
            }
            const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll(
                query,
            );
            const populatedActivityFeedItems: UserActivityFeedItem[] = await Promise.all(
                activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            dispatch({
                type: GET_GLOBAL_ACTIVITY_FEED,
                payload: { activityFeedItems: populatedActivityFeedItems, totalCountOfActivityFeedItems },
            });
            dispatch({ type: GET_GLOBAL_ACTIVITY_FEED_LOADED });
        } catch (err) {
            dispatch({ type: GET_GLOBAL_ACTIVITY_FEED_LOADED });
            if (err.response) {
                dispatch({ type: GET_GLOBAL_ACTIVITY_FEED_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_GLOBAL_ACTIVITY_FEED_FAIL, payload: err.message });
            }
        }
    };

    const clearGlobalActivityFeedItems = (): AppActions => ({
        type: CLEAR_GLOBAL_ACTIVITY_FEED,
    });
    return {
        getFollowingActivityFeedItems,
        clearFollowingActivityFeedItems,
        getGlobalActivityFeedItems,
        clearGlobalActivityFeedItems,
    };
};

export { activityFeedItemActions };
