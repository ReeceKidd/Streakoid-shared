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
    GET_USER_LEADERBOARD_LOADING,
    GET_USER_LEADERBOARD,
    GET_USER_LEADERBOARD_LOADED,
    GET_USER_LEADERBOARD_FAIL,
} from './types';
import { AppActions } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { GetAllSoloStreaksSortFields } from '@streakoid/streakoid-sdk/lib/soloStreaks';
import { GetAllTeamStreaksSortFields } from '@streakoid/streakoid-sdk/lib/teamStreaks';
import {
    TeamStreakLeaderboardItem,
    SoloStreakLeaderboardItem,
    ChallengeStreakLeaderboardItem,
} from '../reducers/leaderboardReducer';
import { GetAllChallengeStreaksSortFields } from '@streakoid/streakoid-sdk/lib/challengeStreak';

const leaderboardActions = (streakoid: typeof streakoidSDK) => {
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
                        const challenge = await streakoid.challenges.getOne({
                            challengeId: challengeStreak.challengeId,
                        });
                        const challengeStreakOwner = await streakoid.users.getOne(challengeStreak.userId);
                        return {
                            streakId: challengeStreak._id,
                            challengeName: challenge.name,
                            username: challengeStreakOwner.username,
                            userProfileImage: challengeStreakOwner.profileImages.originalImageUrl,
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

    const getUserLeaderboard = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_USER_LEADERBOARD_LOADING });
            const users = await streakoid.users.getAll({
                limit: 25,
            });

            dispatch({ type: GET_USER_LEADERBOARD, payload: users });
            dispatch({ type: GET_USER_LEADERBOARD_LOADED });
        } catch (err) {
            dispatch({ type: GET_USER_LEADERBOARD_LOADED });
            if (err.response) {
                dispatch({ type: GET_USER_LEADERBOARD_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_USER_LEADERBOARD_FAIL, payload: err.message });
            }
        }
    };

    return {
        getSoloStreakLeaderboard,
        getTeamStreakLeaderboard,
        getChallengeStreakLeaderboard,
        getUserLeaderboard,
    };
};

export { leaderboardActions };
