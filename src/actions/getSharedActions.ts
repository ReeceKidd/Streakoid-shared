import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { emailActions } from './emailActions';
import { soloStreakActions } from './soloStreakActions';
import { stripeActions } from './stripeActions';
import { teamMemberStreakTaskActions } from './teamMemberStreakTaskActions';
import { teamStreakActions } from './teamStreakActions';
import { userActions } from './userActions';
import { profilePictureActions } from './profilePictureActions';
import { authActions } from './authActions';
import { streakRecommendationActions } from './streakRecommendationActions';
import { challengeActions } from './challengeActions';
import { challengeStreakActions } from './challengeStreakActions';
import { noteActions } from './noteActions';
import { activityFeedItemActions } from './activityFeedItemActions';
import { teamMemberStreakActions } from './teamMemberStreakActions';
import { leaderboardActions } from './leaderboardActions';
import { databaseStatsActions } from './databaseStatsActions';

export const getSharedActions = (streakoid: typeof streakoidSDK) => {
    return {
        authActions,
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
        databaseStatsActions: databaseStatsActions(streakoid),
    };
};
