import { Dispatch } from 'redux';

import {
    GET_USERS,
    GET_USERS_FAIL,
    GET_CURRENT_USER,
    GET_CURRENT_USER_FAIL,
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
    UPDATE_CURRENT_USER,
    FOLLOW_SELECTED_USER_IS_LOADING,
    FOLLOW_SELECTED_USER_IS_LOADED,
    FOLLOW_SELECTED_USER,
    FOLLOW_SELECTED_USER_FAIL,
    UNFOLLOW_SELECTED_USER_IS_LOADING,
    UNFOLLOW_SELECTED_USER,
    UNFOLLOW_SELECTED_USER_IS_LOADED,
    UNFOLLOW_SELECTED_USER_FAIL,
    FOLLOW_USERS_LIST_USER_IS_LOADING,
    FOLLOW_USERS_LIST_USER,
    FOLLOW_USERS_LIST_USER_IS_LOADED,
    FOLLOW_USERS_LIST_USER_FAIL,
    UNFOLLOW_USERS_LIST_USER_IS_LOADING,
    UNFOLLOW_USERS_LIST_USER_FAIL,
    UNFOLLOW_USERS_LIST_USER_IS_LOADED,
    UNFOLLOW_USERS_LIST_USER,
    UPDATE_PUSH_NOTIFICATIONS_IS_LOADING,
    UPDATE_PUSH_NOTIFICATIONS,
    UPDATE_PUSH_NOTIFICATIONS_IS_LOADED,
    UPDATE_PUSH_NOTIFICATIONS_FAIL,
    CLEAR_UPDATE_PUSH_NOTIFICATION_ERROR_MESSAGE,
    CLEAR_UPDATE_CURRENT_USER_ERROR_MESSAGE,
} from './types';
import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { FollowingWithClientData, SelectedUser } from '../reducers/userReducer';
import { getPopulatedActivityFeedItem } from '../helpers/activityFeed/getPopulatedActivityFeedItem';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import {
    CustomStreakReminder,
    CompleteAllStreaksReminder,
} from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { BasicUser } from '@streakoid/streakoid-models/lib/Models/BasicUser';
import { Onboarding } from '@streakoid/streakoid-models/lib/Models/Onboarding';
import UserTypes from '@streakoid/streakoid-models/lib/Types/UserTypes';

const userActions = (streakoid: StreakoidSDK) => {
    const getUsers = ({ limit, searchQuery }: { limit?: number; searchQuery?: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
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
            const currentUser = getState().users.currentUser;
            const users = await streakoid.users.getAll(query);
            const usersWithClientData = users.map(user => {
                const isCurrentUserFollowing = currentUser.following.find(following => following.userId == user._id);
                return {
                    ...user,
                    followUserIsLoading: false,
                    followUserErrorMessage: '',
                    unfollowUserIsLoading: false,
                    unfollowUserErrorMessage: '',
                    isCurrentUserFollowing: Boolean(isCurrentUserFollowing),
                };
            });
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
        const completeChallengeStreakListTasks = await streakoid.completeChallengeStreakTasks.getAll({ userId });
        const completeChallengeStreakListTaskDates = completeChallengeStreakListTasks.map(
            completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
        );
        const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({ userId });
        const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(
            completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
        );
        const combinedCompletedTasks = [
            ...completeSoloStreakTaskDates,
            ...completeChallengeStreakListTaskDates,
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

    const getUser = ({ username }: { username: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_USER_IS_LOADING });
            const users = await streakoid.users.getAll({ username });
            const user = await streakoid.users.getOne(users[0]._id);
            const activeSoloStreaks = await streakoid.soloStreaks.getAll({
                userId: user._id,
                status: StreakStatus.live,
            });
            const activeTeamStreaks = await streakoid.teamStreaks.getAll({
                memberId: user._id,
                status: StreakStatus.live,
            });
            const activeTeamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
                userId: user._id,
                active: true,
            });
            const activeChallengeStreaks = await streakoid.challengeStreaks.getAll({
                userId: user._id,
                status: StreakStatus.live,
            });

            const challengeStreaksWithClientData = await Promise.all(
                activeChallengeStreaks.map(async challengeStreak => {
                    const challenge = await streakoid.challenges.getOne({ challengeId: challengeStreak.challengeId });
                    return {
                        ...challengeStreak,
                        challengeName: challenge.name,
                        challengeDescription: challenge.description,
                        joinChallengeStreakTaskIsLoading: false,
                        joinChallengeStreakTaskErrorMessage: '',
                        completeChallengeStreakListTaskIsLoading: false,
                        completeChallengeStreakListTaskErrorMessage: '',
                        incompleteChallengeStreakListTaskIsLoading: false,
                        incompleteChallengeStreakListTaskErrorMessage: '',
                        recoverChallengeStreakIsLoading: false,
                        recoverChallengeStreakErrorMessage: '',
                        completedChallengeStreakTaskDates: [],
                        username: user.username,
                        userProfileImage: user.profileImages.originalImageUrl,
                    };
                }),
            );
            const userStreakCompleteInfo = await getUserStreakCompleteInfo({ userId: user._id });
            const numberOfStreaks = activeSoloStreaks.length + activeChallengeStreaks.length + activeTeamStreaks.length;

            const isCurrentUserFollowing = getState().users.currentUser.following.find(
                selectedUser => selectedUser.userId == user._id,
            );
            const activityFeed = await streakoid.activityFeedItems.getAll({ userIds: [user._id] });
            const populatedActivityFeedItems: (ClientActivityFeedItemType | undefined)[] = await Promise.all(
                activityFeed.activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            const supportedPopulatedActivityFeedItems = populatedActivityFeedItems.filter(
                (activityFeedItem): activityFeedItem is ClientActivityFeedItemType => activityFeedItem !== undefined,
            );
            const selectedUser: SelectedUser = {
                ...user,
                soloStreaks: activeSoloStreaks,
                teamStreaks: activeTeamStreaks,
                teamMemberStreaks: activeTeamMemberStreaks,
                challengeStreaks: challengeStreaksWithClientData,
                userStreakCompleteInfo,
                numberOfStreaks,
                totalTimesTracked: user.totalStreakCompletes,
                isCurrentUserFollowing: Boolean(isCurrentUserFollowing),
                followUserIsLoading: false,
                followUserErrorMessage: '',
                unfollowUserIsLoading: false,
                unfollowUserErrorMessage: '',
                activityFeed: {
                    totalActivityFeedCount: activityFeed.totalCountOfActivityFeedItems,
                    activityFeedItems: supportedPopulatedActivityFeedItems,
                },
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
            const followingWithClientData: FollowingWithClientData[] = user.following.map(following => ({
                ...following,
                unfollowUserIsLoading: false,
                unfollowUserErrorMessage: '',
            }));

            const activityFeed = await streakoid.activityFeedItems.getAll({ userIds: [user._id] });
            const populatedActivityFeedItems: (ClientActivityFeedItemType | undefined)[] = await Promise.all(
                activityFeed.activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            const supportedPopulatedActivityFeedItems = populatedActivityFeedItems.filter(
                (activityFeedItem): activityFeedItem is ClientActivityFeedItemType => activityFeedItem !== undefined,
            );
            const soloStreaks = await streakoid.user.soloStreaks({ status: StreakStatus.live });
            const challengeStreaks = await streakoid.user.challengeStreaks({ status: StreakStatus.live });
            const challengeStreaksWithClientData = await Promise.all(
                challengeStreaks.map(async challengeStreak => {
                    const challenge = await streakoid.challenges.getOne({ challengeId: challengeStreak.challengeId });
                    return {
                        ...challengeStreak,
                        challengeName: challenge.name,
                        challengeDescription: challenge.description,
                        joinChallengeStreakTaskIsLoading: false,
                        joinChallengeStreakTaskErrorMessage: '',
                        completeChallengeStreakListTaskIsLoading: false,
                        completeChallengeStreakListTaskErrorMessage: '',
                        incompleteChallengeStreakListTaskIsLoading: false,
                        incompleteChallengeStreakListTaskErrorMessage: '',
                        recoverChallengeStreakIsLoading: false,
                        recoverChallengeStreakErrorMessage: '',
                        completedChallengeStreakTaskDates: [],
                        username: user.username,
                        userProfileImage: user.profileImages.originalImageUrl,
                    };
                }),
            );
            const teamStreaks = await streakoid.user.teamStreaks({ status: StreakStatus.live });
            const teamMemberStreaks = await streakoid.user.teamMemberStreaks({ active: true });
            dispatch({
                type: GET_CURRENT_USER,
                payload: {
                    ...user,
                    soloStreaks,
                    challengeStreaks: challengeStreaksWithClientData,
                    teamStreaks,
                    teamMemberStreaks,
                    userStreakCompleteInfo,
                    following: followingWithClientData,
                    activityFeed: {
                        totalActivityFeedCount: activityFeed.totalCountOfActivityFeedItems,
                        activityFeedItems: supportedPopulatedActivityFeedItems,
                    },
                    updatePushNotificationsIsLoading: false,
                    updatePushNotificationsErrorMessage: '',
                },
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

    const updateCurrentUser = ({
        updateData,
    }: {
        updateData: {
            email?: string;
            username?: string;
            firstName?: string;
            lastName?: string;
            hasUsernameBeenCustomized?: boolean;
            timezone?: string;
            pushNotification?: {
                androidToken?: string;
                iosToken?: string;
            };
            hasProfileImageBeenCustomized?: boolean;
            hasCompletedTutorial?: boolean;
            hasCompletedIntroduction?: boolean;
            hasCustomPassword?: boolean;
            hasVerifiedEmail?: boolean;
            onboarding?: Onboarding;
            hasCompletedOnboarding?: boolean;
            userType?: UserTypes;
        };
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: CLEAR_UPDATE_CURRENT_USER_ERROR_MESSAGE });
            dispatch({ type: UPDATE_CURRENT_USER_IS_LOADING });
            await streakoid.user.updateCurrentUser({ updateData });
            dispatch({
                type: UPDATE_CURRENT_USER,
                payload: {
                    ...getState().users.currentUser,
                    ...updateData,
                },
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

    const clearUpdateCurrentUserErrorMessage = (): AppActions => ({
        type: CLEAR_UPDATE_CURRENT_USER_ERROR_MESSAGE,
    });

    const clearSelectedUser = (): AppActions => ({
        type: CLEAR_SELECTED_USER,
    });

    const followUsersListUser = (userToFollow: BasicUser) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: FOLLOW_USERS_LIST_USER_IS_LOADING, payload: userToFollow.userId });
            const currentUserId = getState().users.currentUser._id;
            await streakoid.users.following.followUser({ userId: currentUserId, userToFollowId: userToFollow.userId });
            const user: FollowingWithClientData = {
                userId: userToFollow.userId,
                username: userToFollow.username,
                profileImage: userToFollow.profileImage,
                unfollowUserErrorMessage: '',
                unfollowUserIsLoading: false,
            };
            dispatch({ type: FOLLOW_USERS_LIST_USER, payload: { userToFollow: user, currentUserId } });
            dispatch({ type: FOLLOW_USERS_LIST_USER_IS_LOADED, payload: userToFollow.userId });
        } catch (err) {
            dispatch({ type: FOLLOW_USERS_LIST_USER_IS_LOADED, payload: userToFollow.userId });
            if (err.response) {
                dispatch({
                    type: FOLLOW_USERS_LIST_USER_FAIL,
                    payload: { userToFollowId: userToFollow.userId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: FOLLOW_USERS_LIST_USER_FAIL,
                    payload: { userToFollowId: userToFollow.userId, errorMessage: err.message },
                });
            }
        }
    };

    const unfollowUsersListUser = (userToUnfollow: BasicUser) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: UNFOLLOW_USERS_LIST_USER_IS_LOADING, payload: userToUnfollow.userId });
            const currentUserId = getState().users.currentUser._id;
            await streakoid.users.following.unfollowUser({
                userId: currentUserId,
                userToUnfollowId: userToUnfollow.userId,
            });
            dispatch({
                type: UNFOLLOW_USERS_LIST_USER,
                payload: { userToUnfollowId: userToUnfollow.userId, currentUserId },
            });

            dispatch({ type: UNFOLLOW_USERS_LIST_USER_IS_LOADED, payload: userToUnfollow.userId });
        } catch (err) {
            dispatch({ type: UNFOLLOW_USERS_LIST_USER_IS_LOADED, payload: userToUnfollow.userId });
            if (err.response) {
                dispatch({
                    type: UNFOLLOW_USERS_LIST_USER_FAIL,
                    payload: { userToUnfollowId: userToUnfollow.userId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: UNFOLLOW_USERS_LIST_USER_FAIL,
                    payload: { userToUnfollowId: userToUnfollow.userId, errorMessage: err.message },
                });
            }
        }
    };

    const followSelectedUser = (userToFollow: BasicUser) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: FOLLOW_SELECTED_USER_IS_LOADING });
            const currentUser = getState().users.currentUser;
            await streakoid.users.following.followUser({
                userId: currentUser._id,
                userToFollowId: userToFollow.userId,
            });
            dispatch({
                type: FOLLOW_SELECTED_USER,
                payload: {
                    currentUser: {
                        userId: currentUser._id,
                        username: currentUser.username,
                        profileImage: currentUser.profileImages.originalImageUrl,
                    },
                    userToFollow,
                },
            });
            dispatch({ type: FOLLOW_SELECTED_USER_IS_LOADED, payload: userToFollow.userId });
        } catch (err) {
            dispatch({ type: FOLLOW_SELECTED_USER_IS_LOADED, payload: userToFollow.userId });
            if (err.response) {
                dispatch({
                    type: FOLLOW_SELECTED_USER_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: FOLLOW_SELECTED_USER_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    const unfollowSelectedUser = (userToUnfollowId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            const currentUser = getState().users.currentUser;
            dispatch({ type: UNFOLLOW_SELECTED_USER_IS_LOADING });
            await streakoid.users.following.unfollowUser({
                userId: currentUser._id,
                userToUnfollowId,
            });
            dispatch({ type: UNFOLLOW_SELECTED_USER, payload: { userToUnfollowId, currentUserId: currentUser._id } });
            dispatch({ type: UNFOLLOW_SELECTED_USER_IS_LOADED, payload: userToUnfollowId });
        } catch (err) {
            dispatch({ type: UNFOLLOW_SELECTED_USER_IS_LOADED, payload: userToUnfollowId });
            if (err.response) {
                dispatch({
                    type: UNFOLLOW_SELECTED_USER_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: UNFOLLOW_SELECTED_USER_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    const updateCurrentUserPushNotifications = (updateData: {
        teamStreakUpdates?: { enabled: boolean };
        newFollowerUpdates?: { enabled: boolean };
        achievementUpdates?: { enabled: boolean };
        customStreakReminders?: CustomStreakReminder[];
        completeAllStreaksReminder?: CompleteAllStreaksReminder;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: CLEAR_UPDATE_PUSH_NOTIFICATION_ERROR_MESSAGE });
            dispatch({ type: UPDATE_PUSH_NOTIFICATIONS_IS_LOADING });

            await streakoid.user.pushNotifications.updatePushNotifications({
                ...updateData,
            });

            dispatch({
                type: UPDATE_PUSH_NOTIFICATIONS,
                payload: {
                    ...updateData,
                },
            });
            dispatch({ type: UPDATE_PUSH_NOTIFICATIONS_IS_LOADED });
        } catch (err) {
            dispatch({ type: UPDATE_PUSH_NOTIFICATIONS_IS_LOADED });
            if (err.response) {
                dispatch({
                    type: UPDATE_PUSH_NOTIFICATIONS_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: UPDATE_PUSH_NOTIFICATIONS_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    return {
        getUsers,
        getUser,
        getCurrentUser,
        getUserStreakCompleteInfo,
        updateCurrentUser,
        clearUpdateCurrentUserErrorMessage,
        followUsersListUser,
        unfollowUsersListUser,
        clearSelectedUser,
        followSelectedUser,
        unfollowSelectedUser,
        updateCurrentUserPushNotifications,
    };
};

export { userActions };
