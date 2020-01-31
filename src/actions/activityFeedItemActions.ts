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

export interface UserActivityFeedActionItem {
    userId: string;
    userProfileImage: string;
    username: string;
    title: string;
    description?: string;
    subjectId?: string;
    subjectName?: string;
}

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
            const populatedActivityFeedItems: UserActivityFeedActionItem[] = await Promise.all(
                activityFeedItems.map(async activityFeedItem => {
                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const title = ` created Solo Streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: soloStreak._id,
                            subjectName: soloStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const title = ` completed Solo Streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: soloStreak._id,
                            subjectName: soloStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const title = ` incompleted Solo Streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: soloStreak._id,
                            subjectName: soloStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const title = ` archived Solo Streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: soloStreak._id,
                            subjectName: soloStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const title = ` deleted Solo Streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: soloStreak._id,
                            subjectName: soloStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredSoloStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const title = ` restored Solo Streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: soloStreak._id,
                            subjectName: soloStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakName) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const title = ` changed Solo Streak name to: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: soloStreak._id,
                            subjectName: soloStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakDescription) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const soloStreak = await streakoid.soloStreaks.getOne(streakId!);
                        const title = ` changed Solo Streak description of: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            description: soloStreak.streakDescription,
                            subjectId: soloStreak._id,
                            subjectName: soloStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` created Team Streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` joined Team Streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedTeamMemberStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` completed Team Member streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedTeamMemberStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` incompleted Team Member streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` archived team streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` restored team streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedTeamStreak) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` deleted team streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakName) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` changed team streak name to: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakDescription) {
                        const { userId, streakId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const teamStreak = await streakoid.teamStreaks.getOne(streakId!);
                        const title = ` changed team streak description of: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            description: teamStreak.streakDescription,
                            subjectId: teamStreak._id,
                            subjectName: teamStreak.streakName,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedChallenge) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const title = ` joined challenge: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: challenge._id,
                            subjectName: challenge.name,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const title = ` completed challenge streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: challenge._id,
                            subjectName: challenge.name,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const title = ` incompleted challenge streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: challenge._id,
                            subjectName: challenge.name,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const title = ` archived challenge streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: challenge._id,
                            subjectName: challenge.name,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const title = ` restored challenge streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: challenge._id,
                            subjectName: challenge.name,
                        };
                        return userActivityFeedActionItem;
                    }

                    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedChallengeStreak) {
                        const { userId, challengeId } = activityFeedItem;
                        const user = await streakoid.users.getOne(userId!);
                        const challenge = await streakoid.challenges.getOne({ challengeId: challengeId! });
                        const title = ` deleted challenge streak: `;
                        const userActivityFeedActionItem: UserActivityFeedActionItem = {
                            userId: user._id,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                            username: user && user.username,
                            title,
                            subjectId: challenge._id,
                            subjectName: challenge.name,
                        };
                        return userActivityFeedActionItem;
                    }

                    const userActivityFeedActionItem: UserActivityFeedActionItem = {
                        userId: userId!,
                        userProfileImage: 'unknown',
                        username: 'Oid',
                        title: `Unknown activity feed item: ${activityFeedItem.activityFeedItemType}`,
                    };
                    return userActivityFeedActionItem;
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
