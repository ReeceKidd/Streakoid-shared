import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import {
    DELETE_FRIEND,
    DELETE_FRIEND_FAIL,
    DELETE_FRIEND_IS_LOADING,
    DELETE_FRIEND_IS_LOADED,
    SELECT_FRIEND,
    UNSELECT_FRIEND,
    CLEAR_SELECTED_FRIENDS,
} from './types';
import { AppActions, AppState } from '..';

const friendActions = (streakoid: typeof streakoidSDK) => {
    const deleteFriend = (friendId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: DELETE_FRIEND_IS_LOADING, payload: friendId });
            const userId = getState().users.currentUser._id;
            const friends = await streakoid.users.friends.deleteOne(userId, friendId);
            const friendsWithClientData = friends.map(friend => ({
                ...friend,
                deleteFriendIsLoading: false,
                deleteFriendErrorMessage: '',
                isSelected: false,
            }));
            dispatch({ type: DELETE_FRIEND, payload: friendsWithClientData });
            dispatch({ type: DELETE_FRIEND_IS_LOADED, payload: friendId });
        } catch (err) {
            dispatch({ type: DELETE_FRIEND_IS_LOADED, payload: friendId });
            if (err.response) {
                dispatch({ type: DELETE_FRIEND_FAIL, payload: { friendId, errorMessage: err.response.data.message } });
            } else {
                dispatch({ type: DELETE_FRIEND_FAIL, payload: { friendId, errorMessage: err.message } });
            }
        }
    };

    const selectFriend = (friendId: string): AppActions => ({
        type: SELECT_FRIEND,
        payload: friendId,
    });

    const unselectFriend = (friendId: string): AppActions => ({
        type: UNSELECT_FRIEND,
        payload: friendId,
    });

    const clearSelectedFriends = (): AppActions => ({
        type: CLEAR_SELECTED_FRIENDS,
    });

    return {
        deleteFriend,
        selectFriend,
        unselectFriend,
        clearSelectedFriends,
    };
};

export { friendActions };
