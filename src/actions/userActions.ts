import { Dispatch } from 'redux';
import { StreakStatus, BadgeTypes } from '@streakoid/streakoid-sdk/lib';

import {
    GET_USERS,
    GET_USERS_FAIL,
    GET_CURRENT_USER,
    GET_CURRENT_USER_FAIL,
    UPDATE_CURRENT_USER,
    UPDATE_CURRENT_USER_FAIL,
    GET_USERS_IS_LOADING,
    GET_USERS_IS_LOADED,
    GET_USER_IS_LOADING,
    GET_USER,
    GET_USER_IS_LOADED,
    GET_USER_FAIL,
    GET_CURRENT_USER_IS_LOADING,
    GET_CURRENT_USER_IS_LOADED,
    UPDATE_CURRENT_USER_IS_LOADING,
    UPDATE_CURRENT_USER_IS_LOADED,
    CLEAR_SELECTED_USER,
    UNFOLLOW_USER,
    UNFOLLOW_USER_IS_LOADING,
    UNFOLLOW_USER_IS_LOADED,
    UNFOLLOW_USER_FAIL,
    CLEAR_SELECTED_FOLLOWERS,
    UNSELECT_FOLLOWER,
    SELECT_FOLLOWER,
    FOLLOW_USER_IS_LOADING,
    FOLLOW_USER,
    FOLLOW_USER_IS_LOADED,
    FOLLOW_USER_FAIL,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import Notifications from '@streakoid/streakoid-sdk/lib/models/Notifications';
import { sortBadgesByLongestStreak } from './badgeActions';
import { sortSoloStreaks, sortTeamStreaks, sortChallengeStreaks } from '../helpers/sorters/sortStreaks';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';

const userActions = (streakoid: typeof streakoidSDK) => {
    const getUsers = ({ limit, searchQuery }: { limit?: number; searchQuery?: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_USERS_IS_LOADING });
            const query: { limit?: number; searchQuery?: string } = {};
            if (limit) {
                query.limit = limit;
            }
            if (searchQuery) {
                query.searchQuery = searchQuery;
            }
            const users = await streakoid.users.getAll(query);

            dispatch({ type: GET_USERS, payload: users });
            dispatch({ type: GET_USERS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_USERS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_USERS_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_USERS_FAIL, errorMessage: err.message });
            }
        }
    };

    const getUserStreakCompleteInfo = async ({
        userId,
    }: {
        userId: string;
    }): Promise<{ date: Date; count: number }[]> => {
        const completeSoloStreakTasks = await streakoid.completeSoloStreakTasks.getAll({ userId });
        const completeSoloStreakTaskDates = completeSoloStreakTasks.map(
            completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
        );
        const completeChallengeStreakTasks = await streakoid.completeChallengeStreakTasks.getAll({ userId });
        const completeChallengeStreakTaskDates = completeChallengeStreakTasks.map(
            completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
        );
        const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({ userId });
        const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(
            completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
        );
        const combinedCompletedTasks = [
            ...completeSoloStreakTaskDates,
            ...completeChallengeStreakTaskDates,
            ...completedTeamMemberStreakTaskDates,
        ];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const counts: any = {};
        for (let i = 0; i < combinedCompletedTasks.length; i++) {
            const key = combinedCompletedTasks[i];
            counts[key] = counts[key] ? counts[key] + 1 : 1;
        }
        const completedStreakTaskDatesWithCounts = Object.keys(counts).map(taskDate => ({
            date: new Date(taskDate),
            count: counts[taskDate],
        }));
        return completedStreakTaskDatesWithCounts;
    };

    const getUser = ({ username }: { username: string }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_USER_IS_LOADING });
            const users = await streakoid.users.getAll({ username });
            const user = await streakoid.users.getOne(users[0]._id);
            const { badges } = user;
            const activeSoloStreaks = await streakoid.soloStreaks.getAll({
                userId: user._id,
                status: StreakStatus.live,
            });
            const sortedSoloStreaks = sortSoloStreaks(activeSoloStreaks);
            const activeTeamStreaks = await streakoid.teamStreaks.getAll({
                memberId: user._id,
                status: StreakStatus.live,
            });
            const sortedTeamStreaks = await sortTeamStreaks(activeTeamStreaks);
            const activeChallengeStreaks = await streakoid.challengeStreaks.getAll({
                userId: user._id,
                status: StreakStatus.live,
            });
            const sortedChallengeStreaks = sortChallengeStreaks(activeChallengeStreaks);
            const challengeStreaksWithClientData = await Promise.all(
                sortedChallengeStreaks.map(async challengeStreak => {
                    const challenge = await streakoid.challenges.getOne({ challengeId: challengeStreak.challengeId });
                    return {
                        ...challengeStreak,
                        challengeName: challenge.name,
                        challengeDescription: challenge.description,
                        joinChallengeStreakTaskIsLoading: false,
                        joinChallengeStreakTaskErrorMessage: '',
                        completeChallengeStreakTaskIsLoading: false,
                        completeChallengeStreakTaskErrorMessage: '',
                        incompleteChallengeStreakTaskIsLoading: false,
                        incompleteChallengeStreakTaskErrorMessage: '',
                        completedChallengeStreakTaskDates: [],
                        username: user.username,
                        userProfileImage: user.profileImages.originalImageUrl,
                    };
                }),
            );
            const userBadges = await Promise.all(
                badges.map(badge => {
                    if (badge.badgeType === BadgeTypes.challenge) {
                        const associatedChallengeStreak = sortedChallengeStreaks.find(
                            challengeStreak => challengeStreak.badgeId === badge._id,
                        );
                        if (!associatedChallengeStreak) {
                            return {
                                ...badge,
                                longestStreak: 0,
                            };
                        }
                        const { pastStreaks, currentStreak } = associatedChallengeStreak;
                        const pastStreakLengths = pastStreaks.map(pastStreak => pastStreak.numberOfDaysInARow);
                        const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
                        const longestStreak =
                            currentStreak.numberOfDaysInARow >= longestPastStreakNumberOfDays
                                ? currentStreak.numberOfDaysInARow
                                : longestPastStreakNumberOfDays;

                        return {
                            ...badge,
                            longestStreak,
                        };
                    }
                    return {
                        ...badge,
                        longestStreak: 0,
                    };
                }),
            );
            const userStreakCompleteInfo = await getUserStreakCompleteInfo({ userId: user._id });
            const numberOfStreaks = activeSoloStreaks.length + activeChallengeStreaks.length + activeTeamStreaks.length;
            const longestCurrentSoloStreak = Math.max(
                ...activeSoloStreaks.map(soloStreak => {
                    return getLongestStreak(soloStreak.currentStreak, soloStreak.pastStreaks);
                }),
            );
            const longestCurrentChallengeStreak = Math.max(
                ...activeChallengeStreaks.map(challengeStreak => {
                    return getLongestStreak(challengeStreak.currentStreak, challengeStreak.pastStreaks);
                }),
            );
            const longestCurrentTeamStreak = Math.max(
                ...activeTeamStreaks.map(teamStreak => {
                    return getLongestStreak(teamStreak.currentStreak, teamStreak.pastStreaks);
                }),
            );
            const longestCurrentStreak = Math.max(
                longestCurrentSoloStreak,
                longestCurrentChallengeStreak,
                longestCurrentTeamStreak,
            );
            const allSoloStreaks = await streakoid.soloStreaks.getAll({ userId: user._id });
            const allChallengeStreaks = await streakoid.challengeStreaks.getAll({ userId: user._id });
            const allTeamStreaks = await streakoid.teamStreaks.getAll({ memberId: user._id });
            const longestEverSoloStreak = Math.max(
                ...allSoloStreaks.map(soloStreak => {
                    return getLongestStreak(soloStreak.currentStreak, soloStreak.pastStreaks);
                }),
            );
            const longestEverChallengeStreak = Math.max(
                ...allChallengeStreaks.map(challengeStreak => {
                    return getLongestStreak(challengeStreak.currentStreak, challengeStreak.pastStreaks);
                }),
            );
            const longestEverTeamStreak = Math.max(
                ...allTeamStreaks.map(teamStreak => {
                    return getLongestStreak(teamStreak.currentStreak, teamStreak.pastStreaks);
                }),
            );
            const longestEverStreak = Math.max(
                longestEverSoloStreak,
                longestEverChallengeStreak,
                longestEverTeamStreak,
            );
            const selectedUser = {
                ...user,
                userBadges: userBadges.sort(sortBadgesByLongestStreak),
                soloStreaks: sortedSoloStreaks,
                teamStreaks: sortedTeamStreaks,
                challengeStreaks: challengeStreaksWithClientData,
                userStreakCompleteInfo,
                longestEverStreak,
                longestCurrentStreak,
                numberOfStreaks,
                totalTimesTracked: userStreakCompleteInfo.length,
            };
            dispatch({ type: GET_USER, payload: selectedUser });
            dispatch({ type: GET_USER_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_USER_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_USER_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_USER_FAIL, payload: err.message });
            }
        }
    };

    const getCurrentUser = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_CURRENT_USER_IS_LOADING });
            const user = await streakoid.user.getCurrentUser();
            const userStreakCompleteInfo = await getUserStreakCompleteInfo({ userId: user._id });
            dispatch({
                type: GET_CURRENT_USER,
                payload: { ...user, userStreakCompleteInfo },
            });
            dispatch({ type: GET_CURRENT_USER_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CURRENT_USER_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_CURRENT_USER_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_CURRENT_USER_FAIL, errorMessage: err.message });
            }
        }
    };

    const updateCurrentUser = (updateData: {
        email?: string;
        notifications?: Notifications;
        timezone?: string;
        pushNotificationToken?: string;
        hasCompletedIntroduction?: boolean;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: UPDATE_CURRENT_USER_IS_LOADING });
            const updatedUser = await streakoid.user.updateCurrentUser({ updateData });
            const userId = getState().users.currentUser._id;
            const userStreakCompleteInfo = await getUserStreakCompleteInfo({ userId });
            dispatch({
                type: UPDATE_CURRENT_USER,
                user: { ...updatedUser, userStreakCompleteInfo },
            });
            dispatch({ type: UPDATE_CURRENT_USER_IS_LOADED });
        } catch (err) {
            if (err.response) {
                dispatch({ type: UPDATE_CURRENT_USER_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: UPDATE_CURRENT_USER_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearSelectedUser = (): AppActions => ({
        type: CLEAR_SELECTED_USER,
    });

    const followUser = (userToFollowId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: FOLLOW_USER_IS_LOADING, payload: userToFollowId });
            const userId = getState().users.currentUser._id;
            const folllowing = await streakoid.users.following.followUser({ userId, userToFollowId });

            dispatch({ type: FOLLOW_USER, payload: folllowing });
            dispatch({ type: FOLLOW_USER_IS_LOADED, payload: userToFollowId });
        } catch (err) {
            dispatch({ type: FOLLOW_USER_IS_LOADED, payload: userToFollowId });
            if (err.response) {
                dispatch({
                    type: FOLLOW_USER_FAIL,
                    payload: { userToFollowId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({ type: FOLLOW_USER_FAIL, payload: { userToFollowId, errorMessage: err.message } });
            }
        }
    };

    const unfollowUser = (userToUnfollowId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: UNFOLLOW_USER_IS_LOADING, payload: userToUnfollowId });
            const userId = getState().users.currentUser._id;
            const folllowing = await streakoid.users.following.unfollowUser({ userId, userToUnfollowId });

            dispatch({ type: UNFOLLOW_USER, payload: folllowing });
            dispatch({ type: UNFOLLOW_USER_IS_LOADED, payload: userToUnfollowId });
        } catch (err) {
            dispatch({ type: UNFOLLOW_USER_IS_LOADED, payload: userToUnfollowId });
            if (err.response) {
                dispatch({
                    type: UNFOLLOW_USER_FAIL,
                    payload: { userToUnfollowId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({ type: UNFOLLOW_USER_FAIL, payload: { userToUnfollowId, errorMessage: err.message } });
            }
        }
    };

    const selectFollower = (followerId: string): AppActions => ({
        type: SELECT_FOLLOWER,
        payload: followerId,
    });

    const unselectFollower = (followerId: string): AppActions => ({
        type: UNSELECT_FOLLOWER,
        payload: followerId,
    });

    const clearSelectedFollowers = (): AppActions => ({
        type: CLEAR_SELECTED_FOLLOWERS,
    });

    return {
        getUsers,
        getUser,
        getCurrentUser,
        getUserStreakCompleteInfo,
        updateCurrentUser,
        followUser,
        unfollowUser,
        clearSelectedUser,
        selectFollower,
        unselectFollower,
        clearSelectedFollowers,
    };
};

export { userActions };
