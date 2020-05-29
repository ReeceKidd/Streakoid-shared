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
} from './types';
import { AppActions } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { GetAllSoloStreaksSortFields } from '@streakoid/streakoid-sdk/lib/soloStreaks';
import { GetAllTeamStreaksSortFields } from '@streakoid/streakoid-sdk/lib/teamStreaks';
import {
    TeamStreakLeaderboardItem,
    SoloStreakLeaderboardItem,
    ChallengeStreakLeaderboardItem,
} from '../reducers/leaderboardReducer';
import { GetAllChallengeStreaksSortFields } from '@streakoid/streakoid-sdk/lib/challengeStreak';

const leaderboardActions = (streakoid: StreakoidSDK) => {
    const getSoloStreakLeaderboard = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD_LOADING });
            const soloStreaks = await streakoid.soloStreaks.getAll({
                sortField: GetAllSoloStreaksSortFields.currentStreak,
                active: true,
            });
            const leaderboardItems: SoloStreakLeaderboardItem[] = await Promise.all(
                soloStreaks.map(async soloStreak => {
                    try {
                        const user = await streakoid.users.getOne(soloStreak.userId);
                        return {
                            streakId: soloStreak._id,
                            streakName: soloStreak.streakName,
                            username: user.username,
                            userProfileImage: user.profileImages.originalImageUrl,
                            currentStreakNumberOfDaysInARow: soloStreak.currentStreak.numberOfDaysInARow,
                            streakCreatedAt: new Date(soloStreak.createdAt),
                        };
                    } catch (err) {
                        return {
                            streakId: soloStreak._id,
                            streakName: soloStreak.streakName,
                            username: '',
                            userProfileImage: '',
                            currentStreakNumberOfDaysInARow: soloStreak.currentStreak.numberOfDaysInARow,
                            streakCreatedAt: new Date(soloStreak.createdAt),
                        };
                    }
                }),
            );
            dispatch({ type: GET_SOLO_STREAK_LEADERBOARD, payload: leaderboardItems });
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
                sortField: GetAllTeamStreaksSortFields.currentStreak,
                active: true,
            });
            const leaderboardItems: TeamStreakLeaderboardItem[] = await Promise.all(
                teamStreaks.map(async teamStreak => {
                    try {
                        return {
                            streakId: teamStreak._id,
                            streakName: teamStreak.streakName,
                            currentStreakNumberOfDaysInARow: teamStreak.currentStreak.numberOfDaysInARow,
                            streakCreatedAt: new Date(teamStreak.createdAt),
                            members: teamStreak.members,
                        };
                    } catch (err) {
                        return {
                            streakId: teamStreak._id,
                            streakName: teamStreak.streakName,
                            username: '',
                            userProfileImage: '',
                            currentStreakNumberOfDaysInARow: teamStreak.currentStreak.numberOfDaysInARow,
                            streakCreatedAt: new Date(teamStreak.createdAt),
                            members: teamStreak.members,
                        };
                    }
                }),
            );
            dispatch({ type: GET_TEAM_STREAK_LEADERBOARD, payload: leaderboardItems });
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
    const getChallengeStreakLeaderboard = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGE_STREAK_LEADERBOARD_LOADING });
            const challengeStreaks = await streakoid.challengeStreaks.getAll({
                sortField: GetAllChallengeStreaksSortFields.currentStreak,
                active: true,
            });
            const leaderboardItems: ChallengeStreakLeaderboardItem[] = await Promise.all(
                challengeStreaks.map(async challengeStreak => {
                    try {
                        return {
                            streakId: challengeStreak._id,
                            challengeName: challengeStreak.challengeName,
                            username: challengeStreak.username,
                            userProfileImage: challengeStreak.userProfileImage,
                            currentStreakNumberOfDaysInARow: challengeStreak.currentStreak.numberOfDaysInARow,
                            streakCreatedAt: new Date(challengeStreak.createdAt),
                        };
                    } catch (err) {
                        return {
                            streakId: '',
                            challengeName: '',
                            username: '',
                            userProfileImage: '',
                            currentStreakNumberOfDaysInARow: 0,
                            streakCreatedAt: new Date(),
                        };
                    }
                }),
            );
            dispatch({ type: GET_CHALLENGE_STREAK_LEADERBOARD, payload: leaderboardItems });
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
        getSoloStreakLeaderboard,
        getTeamStreakLeaderboard,
        getChallengeStreakLeaderboard,
        getGlobalUserLeaderboard,
        getFollowingLeaderboard,
    };
};

export { leaderboardActions };
