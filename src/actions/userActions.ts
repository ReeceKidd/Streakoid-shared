import { Dispatch } from 'redux';
import { StreakStatus } from '@streakoid/streakoid-sdk/lib';

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

    const getUser = ({ username }: { username: string }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_USER_IS_LOADING });
            const users = await streakoid.users.getAll({ username });
            const user = await streakoid.users.getOne(users[0]._id);
            const soloStreaks = await streakoid.soloStreaks.getAll({ userId: user._id, status: StreakStatus.live });
            const teamStreaks = await streakoid.teamStreaks.getAll({ memberId: user._id, status: StreakStatus.live });
            const challengeStreaks = await streakoid.challengeStreaks.getAll({ userId: user._id });
            const selectedUser = {
                ...user,
                soloStreaks,
                teamStreaks,
                challengeStreaks,
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
            dispatch({ type: GET_CURRENT_USER, payload: user });
            dispatch({ type: GET_CURRENT_USER_IS_LOADED });
        } catch (err) {
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
            dispatch({ type: UPDATE_CURRENT_USER, user: updatedUser });
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
        updateCurrentUser,
        sendFriendRequest,
    };
};

export { userActions };
