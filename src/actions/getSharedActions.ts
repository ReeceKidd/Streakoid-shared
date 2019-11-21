import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { emailActions } from './emailActions';
import { friendActions } from './friendActions';
import { friendRequestActions } from './friendRequestActions';
import { soloStreakActions } from './soloStreakActions';
import { stripeActions } from './stripeActions';
import { teamMemberStreakTaskActions } from './teamMemberStreakTaskActions';
import { teamStreakActions } from './teamStreakActions';
import { userActions } from './userActions';
import { profilePictureActions } from './profilePictureActions';
import { authActions } from './authActions';
import { streakRecommendationActions } from './streakRecommendationActions';
import { badgeActions } from './badgeActions';
import { challengeActions } from './challengeActions';

export const getSharedActions = (streakoid: typeof streakoidSDK) => {
    return {
        authActions,
        profilePictureActions,
        emailActions: emailActions(streakoid),
        friendActions: friendActions(streakoid),
        friendRequestActions: friendRequestActions(streakoid),
        soloStreakActions: soloStreakActions(streakoid),
        stripeActions: stripeActions(streakoid),
        teamMemberStreakTaskActions: teamMemberStreakTaskActions(streakoid),
        teamStreakActions: teamStreakActions(streakoid),
        userActions: userActions(streakoid),
        streakRecommendationActions: streakRecommendationActions(streakoid),
        badgeActions: badgeActions(streakoid),
        challengeActions: challengeActions(streakoid),
    };
};
