import { Dispatch } from 'redux';

import {
    GET_TEAM_MEMBER_STREAK_IS_LOADING,
    GET_TEAM_MEMBER_STREAK,
    GET_TEAM_MEMBER_STREAK_IS_LOADED,
    GET_TEAM_MEMBER_STREAK_FAIL,
    CLEAR_SELECTED_TEAM_MEMBER_STREAK,
} from './types';
import { AppActions } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';
import { getDaysSinceStreakCreation } from '../helpers/streakCalculations/getDaysSinceStreakCreation';
import { getPopulatedActivityFeedItem } from '../helpers/activityFeed/getPopulatedActivityFeedItem';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';

const teamMemberStreakActions = (streakoid: StreakoidSDK) => {
    const getTeamMemberStreak = (teamMemberStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_TEAM_MEMBER_STREAK_IS_LOADING });
            const teamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreakId);
            const teamStreak = await streakoid.teamStreaks.getOne(teamMemberStreak.teamStreakId);
            const teamMemberStreakOwner = await streakoid.users.getOne(teamMemberStreak.userId);
            const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamMemberStreakId,
            });
            const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(
                completeTask => new Date(completeTask.createdAt),
            );
            const activityFeed = await streakoid.activityFeedItems.getAll({
                teamStreakId: teamMemberStreak.teamStreakId,
                userIds: [teamMemberStreak.userId],
            });
            const populatedActivityFeedItems: (ClientActivityFeedItemType | undefined)[] = await Promise.all(
                activityFeed.activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            const supportedPopulatedActivityFeedItems = populatedActivityFeedItems.filter(
                (activityFeedItem): activityFeedItem is ClientActivityFeedItemType => activityFeedItem !== undefined,
            );
            dispatch({
                type: GET_TEAM_MEMBER_STREAK,
                payload: {
                    ...teamMemberStreak,
                    username: teamMemberStreakOwner.username,
                    userProfileImage: teamMemberStreakOwner.profileImages.originalImageUrl,
                    completedTeamMemberStreakTaskDates,
                    teamStreakName: teamStreak.streakName,
                    teamStreakDescription: teamStreak.streakDescription,
                    longestStreak: getLongestStreak(teamMemberStreak.currentStreak, teamMemberStreak.pastStreaks),
                    daysSinceStreakCreation: getDaysSinceStreakCreation({
                        createdAt: new Date(teamMemberStreak.createdAt),
                        timezone: teamMemberStreak.timezone,
                    }),
                    numberOfRestarts: teamMemberStreak.pastStreaks.length,
                    activityFeed: {
                        totalActivityFeedCount: activityFeed.totalCountOfActivityFeedItems,
                        activityFeedItems: supportedPopulatedActivityFeedItems,
                    },
                    completeSelectedTeamMemberStreakIsLoading: false,
                    completeSelectedTeamMemberStreakErrorMessage: '',
                    incompleteSelectedTeamMemberStreakIsLoading: false,
                    incompleteSelectedTeamMemberStreakErrorMessage: '',
                },
            });
            dispatch({ type: GET_TEAM_MEMBER_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_TEAM_MEMBER_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_TEAM_MEMBER_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_TEAM_MEMBER_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };
    const clearSelectedTeamMemberStreak = (): AppActions => ({
        type: CLEAR_SELECTED_TEAM_MEMBER_STREAK,
    });

    return {
        getTeamMemberStreak,
        clearSelectedTeamMemberStreak,
    };
};

export { teamMemberStreakActions };
