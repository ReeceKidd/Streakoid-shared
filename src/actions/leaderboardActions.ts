/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';

import {
    GET_SOLO_STREAK_LEADERBOARD,
    GET_SOLO_STREAK_LEADERBOARD_LOADING,
    GET_SOLO_STREAK_LEADERBOARD_LOADED,
    GET_SOLO_STREAK_LEADERBOARD_FAIL,
    GET_TEAM_STREAK_LEADERBOARD_LOADING,
    GET_TEAM_STREAK_LEADERBOARD,
    GET_TEAM_STREAK_LEADERBOARD_LOADED,
    GET_TEAM_STREAK_LEADERBOARD_FAIL,
    GET_CHALLENGE_STREAK_LEADERBOARD_LOADING,
    GET_CHALLENGE_STREAK_LEADERBOARD,
    GET_CHALLENGE_STREAK_LEADERBOARD_LOADED,
    GET_CHALLENGE_STREAK_LEADERBOARD_FAIL,
    GET_GLOBAL_USER_LEADERBOARD_LOADING,
    GET_GLOBAL_USER_LEADERBOARD,
    GET_GLOBAL_USER_LEADERBOARD_LOADED,
    GET_GLOBAL_USER_LEADERBOARD_FAIL,
    GET_FOLLOWING_LEADERBOARD_LOADING,
    GET_FOLLOWING_LEADERBOARD,
    GET_FOLLOWING_LEADERBOARD_LOADED,
    GET_FOLLOWING_LEADERBOARD_FAIL,
    GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADING,
    GET_TEAM_MEMBER_STREAK_LEADERBOARD,
    GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADED,
    GET_TEAM_MEMBER_STREAK_LEADERBOARD_FAIL,
} from './types';
import { AppActions } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { GetAllSoloStreaksSortFields } from '@streakoid/streakoid-sdk/lib/soloStreaks';
import { GetAllTeamStreaksSortFields } from '@streakoid/streakoid-sdk/lib/teamStreaks';
import {
    TeamStreakLeaderboardItem,
    SoloStreakLeaderboardItem,
    ChallengeStreakLeaderboardItem,
    TeamMemberStreakLeaderboardItem,
} from '../reducers/leaderboardReducer';
import { GetAllChallengeStreaksSortFields } from '@streakoid/streakoid-sdk/lib/challengeStreaks';
import { GetAllTeamMemberStreaksSortFields } from '@streakoid/streakoid-sdk/lib/teamMemberStreaks';

const leaderboardActions = (streakoid: StreakoidSDK) => {
    const getChallengeStreakLeaderboard = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGE_STREAK_LEADERBOARD_LOADING });
            const challengeStreaks = await streakoid.challengeStreaks.getAll({
                sortField: GetAllChallengeStreaksSortFields.longestChallengeStreak,
            });
            const leaderboardItems: (ChallengeStreakLeaderboardItem | null)[] = await Promise.all(
                challengeStreaks.map(async challengeStreak => {
                    try {
                        const challengeStreakLeaderboardItem: ChallengeStreakLeaderboardItem = {
                            streakId: challengeStreak._id,
                            challengeName: challengeStreak.challengeName,
                            username: challengeStreak.username,
                            userProfileImage: challengeStreak.userProfileImage,
                            currentStreakNumberOfDaysInARow: challengeStreak.currentStreak.numberOfDaysInARow,
                            longestChallengeStreakNumberOfDays: challengeStreak.longestChallengeStreak.numberOfDays,
                            totalTimesTracked: challengeStreak.totalTimesTracked,
                            streakCreatedAt: new Date(challengeStreak.createdAt),
                        };
                        return challengeStreakLeaderboardItem;
                    } catch (err) {
                        return null;
                    }
                }),
            );
            dispatch({
                type: GET_CHALLENGE_STREAK_LEADERBOARD,
                payload: leaderboardItems.filter(item => item !== null) as any,
            });
            dispatch({ type: GET_CHALLENGE_STREAK_LEADERBOARD_LOADED });
        } catch (err) {
            dispatch({ type: GET_CHALLENGE_STREAK_LEADERBOARD_LOADED });
            if (err.response) {
                dispatch({ type: GET_CHALLENGE_STREAK_LEADERBOARD_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_CHALLENGE_STREAK_LEADERBOARD_FAIL, payload: err.message });
            }
        }
    };
    const getSoloStreakLeaderboard = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_LOADING });
            const soloStreaks = await streakoid.soloStreaks.getAll({
                sortField: GetAllSoloStreaksSortFields.longestSoloStreak,
            });
            const leaderboardItems: (SoloStreakLeaderboardItem | null)[] = await Promise.all(
                soloStreaks.map(async soloStreak => {
                    try {
                        const user = await streakoid.users.getOne(soloStreak.userId);
                        const soloStreakLeaderboardItem: SoloStreakLeaderboardItem = {
                            streakId: soloStreak._id,
                            streakName: soloStreak.streakName,
                            username: user.username,
                            userProfileImage: user.profileImages.originalImageUrl,
                            currentStreakNumberOfDaysInARow: soloStreak.currentStreak.numberOfDaysInARow,
                            longestSoloStreakNumberOfDays: soloStreak.longestSoloStreak.numberOfDays,
                            totalTimesTracked: soloStreak.totalTimesTracked,
                            streakCreatedAt: new Date(soloStreak.createdAt),
                        };
                        return soloStreakLeaderboardItem;
                    } catch (err) {
                        return null;
                    }
                }),
            );
            dispatch({
                type: GET_SOLO_STREAK_LEADERBOARD,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                payload: leaderboardItems.filter(item => item !== null) as any,
            });
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_LOADED });
        } catch (err) {
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_LOADED });
            if (err.response) {
                dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_FAIL, payload: err.message });
            }
        }
    };

    const getTeamStreakLeaderboard = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_TEAM_STREAK_LEADERBOARD_LOADING });
            const teamStreaks = await streakoid.teamStreaks.getAll({
                sortField: GetAllTeamStreaksSortFields.longestTeamStreak,
            });
            const leaderboardItems: (TeamStreakLeaderboardItem | null)[] = await Promise.all(
                teamStreaks.map(async teamStreak => {
                    try {
                        const teamStreakLeaderboardItem: TeamStreakLeaderboardItem = {
                            streakId: teamStreak._id,
                            streakName: teamStreak.streakName,
                            currentStreakNumberOfDaysInARow: teamStreak.currentStreak.numberOfDaysInARow,
                            longestTeamStreakNumberOfDays: teamStreak.longestTeamStreak.numberOfDays,
                            totalTimesTracked: teamStreak.totalTimesTracked,
                            streakCreatedAt: new Date(teamStreak.createdAt),
                            members: teamStreak.members,
                        };
                        return teamStreakLeaderboardItem;
                    } catch (err) {
                        return null;
                    }
                }),
            );
            dispatch({
                type: GET_TEAM_STREAK_LEADERBOARD,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                payload: leaderboardItems.filter(item => item !== null) as any,
            });
            dispatch({ type: GET_TEAM_STREAK_LEADERBOARD_LOADED });
        } catch (err) {
            dispatch({ type: GET_TEAM_STREAK_LEADERBOARD_LOADED });
            if (err.response) {
                dispatch({ type: GET_TEAM_STREAK_LEADERBOARD_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_TEAM_STREAK_LEADERBOARD_FAIL, payload: err.message });
            }
        }
    };

    const getTeamMemberStreakLeaderboard = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADING });
            const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
                sortField: GetAllTeamMemberStreaksSortFields.longestTeamMemberStreak,
            });
            const leaderboardItems: (TeamMemberStreakLeaderboardItem | null)[] = await Promise.all(
                teamMemberStreaks.map(async teamMemberStreak => {
                    try {
                        const user = await streakoid.users.getOne(teamMemberStreak.userId);
                        const teamStreak = await streakoid.teamStreaks.getOne(teamMemberStreak.teamStreakId);
                        const teamMemberStreakLeaderboardItem: TeamMemberStreakLeaderboardItem = {
                            streakId: teamMemberStreak._id,
                            streakName: teamStreak.streakName,
                            currentStreakNumberOfDaysInARow: teamMemberStreak.currentStreak.numberOfDaysInARow,
                            longestTeamMemberStreakNumberOfDays: teamMemberStreak.longestTeamMemberStreak.numberOfDays,
                            totalTimesTracked: teamMemberStreak.totalTimesTracked,
                            streakCreatedAt: new Date(teamMemberStreak.createdAt),
                            username: user && user.username,
                            userProfileImage: user && user.profileImages && user.profileImages.originalImageUrl,
                        };
                        return teamMemberStreakLeaderboardItem;
                    } catch (err) {
                        return null;
                    }
                }),
            );
            dispatch({
                type: GET_TEAM_MEMBER_STREAK_LEADERBOARD,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                payload: leaderboardItems.filter(item => item !== null) as any,
            });
            dispatch({ type: GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADED });
        } catch (err) {
            dispatch({ type: GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADED });
            if (err.response) {
                dispatch({ type: GET_TEAM_MEMBER_STREAK_LEADERBOARD_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_TEAM_MEMBER_STREAK_LEADERBOARD_FAIL, payload: err.message });
            }
        }
    };

    const getGlobalUserLeaderboard = ({ limit }: { limit: number }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_GLOBAL_USER_LEADERBOARD_LOADING });

            const users = await streakoid.users.getAll({ limit });

            dispatch({ type: GET_GLOBAL_USER_LEADERBOARD, payload: users });
            dispatch({ type: GET_GLOBAL_USER_LEADERBOARD_LOADED });
        } catch (err) {
            dispatch({ type: GET_GLOBAL_USER_LEADERBOARD_LOADED });
            if (err.response) {
                dispatch({ type: GET_GLOBAL_USER_LEADERBOARD_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_GLOBAL_USER_LEADERBOARD_FAIL, payload: err.message });
            }
        }
    };

    const getFollowingLeaderboard = ({ userIds }: { userIds: string[] }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_FOLLOWING_LEADERBOARD_LOADING });

            const maximumNumberOfUsersToDisplay = 25;

            const users = await streakoid.users.getAll({ limit: maximumNumberOfUsersToDisplay, userIds });

            dispatch({ type: GET_FOLLOWING_LEADERBOARD, payload: users });
            dispatch({ type: GET_FOLLOWING_LEADERBOARD_LOADED });
        } catch (err) {
            dispatch({ type: GET_FOLLOWING_LEADERBOARD_LOADED });
            if (err.response) {
                dispatch({ type: GET_FOLLOWING_LEADERBOARD_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_FOLLOWING_LEADERBOARD_FAIL, payload: err.message });
            }
        }
    };

    return {
        getChallengeStreakLeaderboard,
        getSoloStreakLeaderboard,
        getTeamStreakLeaderboard,
        getTeamMemberStreakLeaderboard,
        getGlobalUserLeaderboard,
        getFollowingLeaderboard,
    };
};

export { leaderboardActions };
