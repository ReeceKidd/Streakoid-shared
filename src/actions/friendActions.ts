import { Dispatch } from 'react';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import {
    GET_FRIENDS,
    DELETE_FRIEND,
    GET_FRIENDS_FAIL,
    DELETE_FRIEND_FAIL,
    GET_FRIENDS_IS_LOADING,
    GET_FRIENDS_IS_LOADED,
    DELETE_FRIEND_IS_LOADING,
    DELETE_FRIEND_IS_LOADED,
} from './types';
import { Reducer } from 'redux';
import { AppActions } from '..';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const friendActions = (streakoid: typeof streakoidSDK, rootReducer: Reducer) => {
    const getFriends = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => ReturnType<typeof rootReducer>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_FRIENDS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            const friends = await streakoid.users.friends.getAll(userId);
            const friendsWithClientData = friends.map(friend => ({
                ...friend,
                deleteFriendIsLoading: false,
                deleteFriendErrorMessage: '',
                isSelected: false,
            }));
            dispatch({ type: GET_FRIENDS, friends: friendsWithClientData });
            dispatch({ type: GET_FRIENDS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_FRIENDS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_FRIENDS_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_FRIENDS_FAIL, errorMessage: err.message });
            }
        }
    };

    const deleteFriend = (friendId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => ReturnType<typeof rootReducer>,
    ): Promise<void> => {
        try {
            dispatch({ type: DELETE_FRIEND_IS_LOADING, friendId });
            const userId = getState().users.currentUser._id;
            const friends = await streakoid.users.friends.deleteOne(userId, friendId);
            const friendsWithClientData = friends.map(friend => ({
                ...friend,
                deleteFriendIsLoading: false,
                deleteFriendErrorMessage: '',
                isSelected: false,
            }));
            dispatch({ type: DELETE_FRIEND, friends: friendsWithClientData });
            dispatch({ type: DELETE_FRIEND_IS_LOADED, friendId });
        } catch (err) {
            dispatch({ type: DELETE_FRIEND_IS_LOADED, friendId });
            if (err.response) {
                dispatch({ type: DELETE_FRIEND_FAIL, payload: { friendId, errorMessage: err.response.data.message } });
            } else {
                dispatch({ type: DELETE_FRIEND_FAIL, payload: { friendId, errorMessage: err.message } });
            }
        }
    };

    return {
        getFriends,
        deleteFriend,
    };
};

export { friendActions };
