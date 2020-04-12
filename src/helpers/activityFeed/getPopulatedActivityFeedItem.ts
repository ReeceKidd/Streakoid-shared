/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ActivityFeedItemTypes, ActivityFeedItemType } from '@streakoid/streakoid-sdk/lib';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import {
    CreatedSoloStreakClientActivityFeedItem,
    CompletedSoloStreakClientActivityFeedItem,
    IncompletedSoloStreakClientActivityFeedItem,
    ArchivedSoloStreakClientActivityFeedItem,
    DeletedSoloStreakClientActivityFeedItem,
    RestoredSoloStreakClientActivityFeedItem,
    EditedSoloStreakNameClientActivityFeedItem,
    EditedSoloStreakDescriptionClientActivityFeedItem,
    LostSoloStreakClientActivityFeedItem,
    CompletedChallengeStreakClientActivityFeedItem,
    IncompletedChallengeStreakClientActivityFeedItem,
    JoinedChallengeClientActivityFeedItem,
    ArchivedChallengeStreakClientActivityFeedItem,
    RestoredChallengeStreakClientActivityFeedItem,
    DeletedChallengeStreakClientActivityFeedItem,
    LostChallengeStreakClientActivityFeedItem,
    CreatedTeamStreakClientActivityFeedItem,
    ArchivedTeamStreakClientActivityFeedItem,
    RestoredTeamStreakClientActivityFeedItem,
    DeletedTeamStreakClientActivityFeedItem,
    EditedTeamStreakNameClientActivityFeedItem,
    EditedTeamStreakDescriptionClientActivityFeedItem,
    CompletedTeamMemberStreakClientActivityFeedItem,
    IncompletedTeamMemberStreakClientActivityFeedItem,
    JoinedTeamStreakClientActivityFeedItem,
    LostTeamStreakClientActivityFeedItem,
    CreatedAccountClientActivityFeedItem,
    FollowedUserClientActivityFeedItem,
} from './ClientActivityFeedItem';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const getPopulatedActivityFeedItem = async (
    streakoid: typeof streakoidSDK,
    activityFeedItem: ActivityFeedItemType,
) => {
    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak) {
        const title = ` created solo streak: `;
        const clientActivityFeedItem: CreatedSoloStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedSoloStreak) {
        const title = ` archived solo streak: `;
        const clientActivityFeedItem: ArchivedSoloStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredSoloStreak) {
        const title = ` restored solo streak: `;
        const clientActivityFeedItem: RestoredSoloStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedSoloStreak) {
        const title = ` deleted solo streak: `;
        const clientActivityFeedItem: DeletedSoloStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakName) {
        const title = ` changed solo streak name to: `;
        const clientActivityFeedItem: EditedSoloStreakNameClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakDescription) {
        const title = ` changed solo streak description of: `;
        const clientActivityFeedItem: EditedSoloStreakDescriptionClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedSoloStreak) {
        const title = ` completed solo streak: `;
        const clientActivityFeedItem: CompletedSoloStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedSoloStreak) {
        const title = ` incompleted solo streak: `;
        const clientActivityFeedItem: IncompletedSoloStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.lostSoloStreak) {
        const title = ` lost solo streak of ${
            activityFeedItem.numberOfDaysLost === 1
                ? `${activityFeedItem.numberOfDaysLost} day `
                : `${activityFeedItem.numberOfDaysLost} days `
        }`;
        const clientActivityFeedItem: LostSoloStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedChallengeStreak) {
        const title = ` completed challenge streak: `;
        const clientActivityFeedItem: CompletedChallengeStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedChallengeStreak) {
        const title = ` incompleted challenge streak: `;
        const clientActivityFeedItem: IncompletedChallengeStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedChallenge) {
        const title = ` joined challenge: `;
        const clientActivityFeedItem: JoinedChallengeClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedChallengeStreak) {
        const title = ` archived challenge streak: `;
        const clientActivityFeedItem: ArchivedChallengeStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredChallengeStreak) {
        const title = ` restored challenge streak: `;
        const clientActivityFeedItem: RestoredChallengeStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedChallengeStreak) {
        const title = ` deleted challenge streak: `;
        const clientActivityFeedItem: DeletedChallengeStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.lostChallengeStreak) {
        const title = ` lost challenge streak of ${
            activityFeedItem.numberOfDaysLost === 1
                ? `${activityFeedItem.numberOfDaysLost} day `
                : `${activityFeedItem.numberOfDaysLost} days `
        }`;
        const clientActivityFeedItem: LostChallengeStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdTeamStreak) {
        const title = ` created team streak: `;
        const clientActivityFeedItem: CreatedTeamStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedTeamStreak) {
        const title = ` archived team streak: `;
        const clientActivityFeedItem: ArchivedTeamStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredTeamStreak) {
        const title = ` restored team streak: `;
        const clientActivityFeedItem: RestoredTeamStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedTeamStreak) {
        const title = ` deleted team streak: `;
        const clientActivityFeedItem: DeletedTeamStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakName) {
        const title = ` changed team streak name to: `;
        const clientActivityFeedItem: EditedTeamStreakNameClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakDescription) {
        const title = ` changed team streak description of: `;
        const clientActivityFeedItem: EditedTeamStreakDescriptionClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedTeamMemberStreak) {
        const title = ` completed team member streak: `;
        const clientActivityFeedItem: CompletedTeamMemberStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedTeamMemberStreak) {
        const title = ` incompleted team member streak: `;
        const clientActivityFeedItem: IncompletedTeamMemberStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedTeamStreak) {
        const title = ` joined team streak: `;
        const clientActivityFeedItem: JoinedTeamStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.lostTeamStreak) {
        const title = ` lost team streak of ${
            activityFeedItem.numberOfDaysLost === 1
                ? `${activityFeedItem.numberOfDaysLost} day `
                : `${activityFeedItem.numberOfDaysLost} days `
        }`;
        const clientActivityFeedItem: LostTeamStreakClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdAccount) {
        const title = ` created an account.`;
        const clientActivityFeedItem: CreatedAccountClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }

    if (activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.followedUser) {
        const title = ` followed user `;
        const clientActivityFeedItem: FollowedUserClientActivityFeedItem = {
            ...activityFeedItem,
            title,
        };
        return clientActivityFeedItem;
    }
};
