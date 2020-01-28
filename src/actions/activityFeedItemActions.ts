/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import {
    GET_ACTIVITY_FEED_ITEMS,
    GET_ACTIVITY_FEED_ITEMS_FAIL,
    GET_ACTIVITY_FEED_ITEMS_LOADED,
    GET_ACTIVITY_FEED_ITEMS_LOADING,
} from './types';
import { AppActions } from '..';
import ActivityFeedItemTypes from '@streakoid/streakoid-sdk/lib/ActivityFeedItemTypes';

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
            const populatedActivityFeedItems = await Promise.all(
                activityFeedItems.map(async activityFeedItem => {
                    if (activityFeedItem.activityType === ActivityFeedItemTypes.createdSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const text = ` created Solo Streak: ${soloStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    return {
                        ...activityFeedItem,
                        text: `Unknown activity feed item: ${activityFeedItem.activityType}`,
                    };
                }),
            );
            dispatch({ type: GET_ACTIVITY_FEED_ITEMS, payload: populatedActivityFeedItems });
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
