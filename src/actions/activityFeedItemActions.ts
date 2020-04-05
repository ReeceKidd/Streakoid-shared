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
import { ActivityFeedItem } from '@streakoid/streakoid-sdk/lib';

export interface UserActivityFeedActionItem {
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
    activityFeedItems: UserActivityFeedActionItem[];
    totalCountOfActivityFeedItems: number;
}

const getPopulatedActivityFeedItems = async (streakoid: typeof streakoidSDK, activityFeedItem: ActivityFeedItem) => {
    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` created solo streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` completed solo streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` incompleted solo streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` archived solo streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` deleted solo streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` restored solo streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakName) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` changed solo streak name to: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakDescription) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` changed solo streak description of: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            description: soloStreak && soloStreak.streakDescription,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` created team streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` joined team streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedTeamMemberStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` completed team member streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedTeamMemberStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` incompleted team member streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` archived team streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` restored team streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` deleted team streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakName) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` changed team streak name to: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakDescription) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` changed team streak description of: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            description: teamStreak && teamStreak.streakDescription,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedChallenge) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const challengeStreak = await streakoid.challengeStreaks.getOne({
            challengeStreakId: subjectId,
        });
        const challenge = await streakoid.challenges.getOne({
            challengeId: challengeStreak.challengeId,
        });
        const title = ` joined challenge: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedChallengeStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const challengeStreak = await streakoid.challengeStreaks.getOne({
            challengeStreakId: subjectId,
        });
        const challenge = await streakoid.challenges.getOne({
            challengeId: challengeStreak.challengeId,
        });
        const title = ` completed challenge streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedChallengeStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const challengeStreak = await streakoid.challengeStreaks.getOne({
            challengeStreakId: subjectId,
        });
        const challenge = await streakoid.challenges.getOne({
            challengeId: challengeStreak.challengeId,
        });
        const title = ` incompleted challenge streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedChallengeStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const challengeStreak = await streakoid.challengeStreaks.getOne({
            challengeStreakId: subjectId,
        });
        const challenge = await streakoid.challenges.getOne({
            challengeId: challengeStreak.challengeId,
        });
        const title = ` archived challenge streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredChallengeStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const challengeStreak = await streakoid.challengeStreaks.getOne({
            challengeStreakId: subjectId,
        });
        const challenge = await streakoid.challenges.getOne({
            challengeId: challengeStreak.challengeId,
        });
        const title = ` restored challenge streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return userActivityFeedActionItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedChallengeStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const challengeStreak = await streakoid.challengeStreaks.getOne({
            challengeStreakId: subjectId,
        });
        const challenge = await streakoid.challenges.getOne({
            challengeId: challengeStreak.challengeId,
        });
        const title = ` deleted challenge streak: `;
        const userActivityFeedActionItem: UserActivityFeedActionItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return userActivityFeedActionItem;
    }

    const userActivityFeedActionItem: UserActivityFeedActionItem = {
        ...activityFeedItem,
        userId: 'unknown',
        userProfileImage: 'unknown',
        username: 'Oid',
        title: `Unknown activity feed item: ${activityFeedItem.activityFeedItemType}`,
    };
    return userActivityFeedActionItem;
};

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
            const populatedActivityFeedItems: UserActivityFeedActionItem[] = await Promise.all(
                activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItems(streakoid, activityFeedItem);
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
            const populatedActivityFeedItems: UserActivityFeedActionItem[] = await Promise.all(
                activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItems(streakoid, activityFeedItem);
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
