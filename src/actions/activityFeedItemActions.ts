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
                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak) {
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

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const text = ` completed Solo Streak: ${soloStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const text = ` incompleted Solo Streak: ${soloStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const text = ` archived Solo Streak: ${soloStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const text = ` deleted Solo Streak: ${soloStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const text = ` restored Solo Streak: ${soloStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakName) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const text = ` changed Solo Streak name to: ${soloStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakDescription) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const text = ` changed Solo Streak description to: ${soloStreak.streakDescription}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` created Team Streak: ${teamStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` joined Team Streak: ${teamStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedTeamMemberStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` completed Team Member streak: ${teamStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedTeamMemberStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` incompleted Team Member streak: ${teamStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` archived team streak: ${teamStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` restored team streak: ${teamStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` deleted team streak: ${teamStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakName) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` changed team streak name to: ${teamStreak.streakName}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakDescription) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const text = ` changed team streak description to: ${teamStreak.streakDescription}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedChallenge) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const text = ` joined challenge: ${challenge.name}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const text = ` completed challenge streak: ${challenge.name}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const text = ` incompleted challenge streak: ${challenge.name}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const text = ` archived challenge streak: ${challenge.name}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const text = ` restored challenge streak: ${challenge.name}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const text = ` deleted challenge streak: ${challenge.name}`;
                        return {
                            ...activityFeedItem,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            text,
                        };
                    }

                    return {
                        ...activityFeedItem,
                        text: `Unknown activity feed item: ${activityFeedItem.activityFeedItemType}`,
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
