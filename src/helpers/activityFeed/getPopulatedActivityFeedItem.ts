/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ActivityFeedItemTypes, ActivityFeedItem } from '@streakoid/streakoid-sdk/lib';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserActivityFeedItem } from '../../actions/activityFeedItemActions';

export const getPopulatedActivityFeedItem = async (
    streakoid: typeof streakoidSDK,
    activityFeedItem: ActivityFeedItem,
) => {
    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` created solo streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` completed solo streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` incompleted solo streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` archived solo streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` deleted solo streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredSoloStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` restored solo streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakName) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` changed solo streak name to: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakDescription) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const soloStreak = await streakoid.soloStreaks.getOne(subjectId);
        const title = ` changed solo streak description of: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            description: soloStreak && soloStreak.streakDescription,
            subjectId: soloStreak && soloStreak._id,
            subjectName: soloStreak && soloStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` created team streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` joined team streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedTeamMemberStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` completed team member streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedTeamMemberStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` incompleted team member streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` archived team streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` restored team streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedTeamStreak) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` deleted team streak: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakName) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` changed team streak name to: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakDescription) {
        const { userId, subjectId } = activityFeedItem;
        const user = await streakoid.users.getOne(userId!);
        const teamStreak = await streakoid.teamStreaks.getOne(subjectId);
        const title = ` changed team streak description of: `;
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            description: teamStreak && teamStreak.streakDescription,
            subjectId: teamStreak && teamStreak._id,
            subjectName: teamStreak && teamStreak.streakName,
        };
        return UserActivityFeedItem;
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
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return UserActivityFeedItem;
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
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return UserActivityFeedItem;
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
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return UserActivityFeedItem;
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
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return UserActivityFeedItem;
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
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return UserActivityFeedItem;
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
        const UserActivityFeedItem: UserActivityFeedItem = {
            ...activityFeedItem,
            userId: user && user._id,
            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
            username: user && user.username,
            title,
            subjectId: challengeStreak && challengeStreak._id,
            subjectName: challenge && challenge.name,
        };
        return UserActivityFeedItem;
    }

    const UserActivityFeedItem: UserActivityFeedItem = {
        ...activityFeedItem,
        userId: 'unknown',
        userProfileImage: 'unknown',
        username: 'Oid',
        title: `Unknown activity feed item: ${activityFeedItem.activityFeedItemType}`,
    };
    return UserActivityFeedItem;
};
