import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { Reducer } from 'redux';
import { emailActions } from './emailActions';
import { feedbackActions } from './feedbackActions';
import { friendActions } from './friendActions';
import { friendRequestActions } from './friendRequestActions';
import { soloStreakActions } from './soloStreakActions';
import { stripeActions } from './stripeActions';
import { teamMemberStreakTaskActions } from './teamMemberStreakTaskActions';
import { teamStreakActions } from './teamStreakActions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getSharedActions = (streakoid: typeof streakoidSDK, rootReducer: Reducer) => {
    return {
        emailActions: emailActions(streakoid, rootReducer),
        feedbackActions: feedbackActions(streakoid),
        friendActions: friendActions(streakoid, rootReducer),
        friendRequestActions: friendRequestActions(streakoid, rootReducer),
        soloStreakActions: soloStreakActions(streakoid, rootReducer),
        stripeActions: stripeActions(streakoid, rootReducer),
        teamMemberStreakTaskActions: teamMemberStreakTaskActions(streakoid, rootReducer),
        teamStreakActions: teamStreakActions(streakoid, rootReducer),
    };
};
