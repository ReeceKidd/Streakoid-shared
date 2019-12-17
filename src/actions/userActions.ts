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
    SEND_FRIEND_REQUEST_LOADING,
    SEND_FRIEND_REQUEST,
    SEND_FRIEND_REQUEST_LOADED,
    SEND_FRIEND_REQUEST_FAIL,
    GET_USER_IS_LOADING,
    GET_USER,
    GET_USER_IS_LOADED,
    GET_USER_FAIL,
    GET_CURRENT_USER_IS_LOADING,
    GET_CURRENT_USER_IS_LOADED,
    UPDATE_CURRENT_USER_IS_LOADING,
    UPDATE_CURRENT_USER_IS_LOADED,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import Notifications from '@streakoid/streakoid-sdk/lib/models/Notifications';

const userActions = (streakoid: typeof streakoidSDK) => {
    const getUsers = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_USERS_IS_LOADING });
            const users = await streakoid.users.getAll({});
            const usersWithClientData = users.map(user => ({
                ...user,
                sendFriendRequestIsLoading: false,
                sendFriendRequestErrorMessage: '',
            }));
            dispatch({ type: GET_USERS, payload: usersWithClientData });
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
            const soloStreaks = await streakoid.soloStreaks.getAll({ userId: user._id, status: StreakStatus.live });
            const teamStreaks = await streakoid.teamStreaks.getAll({ memberId: user._id, status: StreakStatus.live });
            const challengeStreaks = await streakoid.challengeStreaks.getAll({ userId: user._id });
            const challengeStreaksWithClientData = await Promise.all(
                challengeStreaks.map(async challengeStreak => {
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
                    };
                }),
            );
            const userBadges = await Promise.all(
                badges.map(badge => {
                    if (badge.badgeType === BadgeTypes.challenge) {
                        const associatedChallengeStreak = challengeStreaks.find(
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
            const selectedUser = {
                ...user,
                userBadges,
                soloStreaks,
                teamStreaks,
                challengeStreaks: challengeStreaksWithClientData,
                userStreakCompleteInfo,
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
            dispatch({ type: GET_CURRENT_USER, payload: { ...user, userStreakCompleteInfo } });
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
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: UPDATE_CURRENT_USER_IS_LOADING });
            const updatedUser = await streakoid.user.updateCurrentUser({ updateData });
            const userStreakCompleteInfo = await getUserStreakCompleteInfo({ userId: updatedUser._id });
            dispatch({ type: UPDATE_CURRENT_USER, user: { ...updatedUser, userStreakCompleteInfo } });
            dispatch({ type: UPDATE_CURRENT_USER_IS_LOADED });
        } catch (err) {
            if (err.response) {
                dispatch({ type: UPDATE_CURRENT_USER_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: UPDATE_CURRENT_USER_FAIL, errorMessage: err.message });
            }
        }
    };

    const sendFriendRequest = (friendId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: SEND_FRIEND_REQUEST_LOADING, friendId });
            const userId = getState().users.currentUser._id;
            const friendRequest = await streakoid.friendRequests.create({ requesterId: userId, requesteeId: friendId });
            dispatch({ type: SEND_FRIEND_REQUEST, friendRequest });
            dispatch({ type: SEND_FRIEND_REQUEST_LOADED, friendId });
        } catch (err) {
            dispatch({ type: SEND_FRIEND_REQUEST_LOADED, friendId });
            if (err.response) {
                dispatch({
                    type: SEND_FRIEND_REQUEST_FAIL,
                    payload: { friendId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({ type: SEND_FRIEND_REQUEST_FAIL, payload: { friendId, errorMessage: err.message } });
            }
        }
    };

    return {
        getUsers,
        getUser,
        getCurrentUser,
        getUserStreakCompleteInfo,
        updateCurrentUser,
        sendFriendRequest,
    };
};

export { userActions };
