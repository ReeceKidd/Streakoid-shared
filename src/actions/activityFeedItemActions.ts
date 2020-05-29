/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch } from 'redux';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';

import { AppActions } from '..';
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
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import ActivityFeedItemType from '@streakoid/streakoid-models/lib/Types/ActivityFeedItemTypes';

export interface GetAllPopulatedActivityFeedItemsActionResponse {
    activityFeedItems: ActivityFeedItemType[];
    totalCountOfActivityFeedItems: number;
}

const activityFeedItemActions = (streakoid: StreakoidSDK) => {
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
            const populatedActivityFeedItems: (ClientActivityFeedItemType | undefined)[] = await Promise.all(
                activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            const supportedPopulatedActivityFeedItems = populatedActivityFeedItems.filter(
                (activityFeedItem): activityFeedItem is ClientActivityFeedItemType => activityFeedItem !== undefined,
            );
            dispatch({
                type: GET_FOLLOWING_ACTIVITY_FEED,
                payload: { activityFeedItems: supportedPopulatedActivityFeedItems, totalCountOfActivityFeedItems },
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
            const populatedActivityFeedItems: (ClientActivityFeedItemType | undefined)[] = await Promise.all(
                activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            const supportedPopulatedActivityFeedItems = populatedActivityFeedItems.filter(
                (activityFeedItem): activityFeedItem is ClientActivityFeedItemType => activityFeedItem !== undefined,
            );
            dispatch({
                type: GET_GLOBAL_ACTIVITY_FEED,
                payload: { activityFeedItems: supportedPopulatedActivityFeedItems, totalCountOfActivityFeedItems },
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
