import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { emailActions } from './emailActions';
import { soloStreakActions } from './soloStreakActions';
import { stripeActions } from './stripeActions';
import { teamMemberStreakTaskActions } from './teamMemberStreakTaskActions';
import { teamStreakActions } from './teamStreakActions';
import { userActions } from './userActions';
import { streakRecommendationActions } from './streakRecommendationActions';
import { challengeActions } from './challengeActions';
import { challengeStreakActions } from './challengeStreakActions';
import { noteActions } from './noteActions';
import { activityFeedItemActions } from './activityFeedItemActions';
import { teamMemberStreakActions } from './teamMemberStreakActions';
import { leaderboardActions } from './leaderboardActions';
import { contentActions } from './contentActions';
import { databaseStatsActions } from './databaseStatsActions';
import { profilePictureActions } from './profilePictureActions';

export const getSharedActions = ({ streakoid }: { streakoid: StreakoidSDK }) => {
    return {
        profilePictureActions,
        emailActions: emailActions(streakoid),
        soloStreakActions: soloStreakActions(streakoid),
        stripeActions: stripeActions(streakoid),
        teamMemberStreakTaskActions: teamMemberStreakTaskActions(streakoid),
        teamStreakActions: teamStreakActions(streakoid),
        teamMemberStreakActions: teamMemberStreakActions(streakoid),
        userActions: userActions(streakoid),
        streakRecommendationActions: streakRecommendationActions(streakoid),
        challengeActions: challengeActions(streakoid),
        challengeStreakActions: challengeStreakActions(streakoid),
        noteActions: noteActions(streakoid),
        activityFeedItemActions: activityFeedItemActions(streakoid),
        leaderboardActions: leaderboardActions(streakoid),
        contentActions: contentActions(),
        databaseStatsActions: databaseStatsActions(streakoid),
    };
};
