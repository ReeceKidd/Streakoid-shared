import {
    GET_FRIENDS,
    DELETE_FRIEND,
    UserActionTypes,
    DELETE_FRIEND_IS_LOADING,
    DELETE_FRIEND_IS_LOADED,
    DELETE_FRIEND_FAIL,
    SELECT_FRIEND,
    UNSELECT_FRIEND,
    CLEAR_SELECTED_FRIENDS,
} from '../actions/types';
import { Friend } from '@streakoid/streakoid-sdk/lib';

export interface FriendStateWithClientData extends Friend {
    deleteFriendIsLoading: boolean;
    deleteFriendErrorMessage: string;
    isSelected: boolean;
}

const initialState: FriendStateWithClientData[] = [];

const friendReducer = (state = initialState, action: UserActionTypes): FriendStateWithClientData[] => {
    switch (action.type) {
        case GET_FRIENDS:
            return action.friends;

        case DELETE_FRIEND:
            return action.friends;

        case DELETE_FRIEND_FAIL:
            return state.map(friend => {
                if (friend.friendId === action.payload.friendId) {
                    return {
                        ...friend,
                        deleteFriendErrorMessage: action.payload.errorMessage,
                    };
                }
                return friend;
            });

        case DELETE_FRIEND_IS_LOADING:
            return state.map(friend => {
                if (friend.friendId === action.friendId) {
                    return {
                        ...friend,
                        deleteFriendIsLoading: true,
                    };
                }
                return friend;
            });

        case DELETE_FRIEND_IS_LOADED:
            return state.map(friend => {
                if (friend.friendId === action.friendId) {
                    return {
                        ...friend,
                        deleteFriendIsLoading: false,
                    };
                }
                return friend;
            });

        case SELECT_FRIEND:
            return state.map(friend => {
                if (friend.friendId === action.friendId) {
                    return {
                        ...friend,
                        isSelected: true,
                    };
                }
                return friend;
            });

        case UNSELECT_FRIEND:
            return state.map(friend => {
                if (friend.friendId === action.friendId) {
                    return {
                        ...friend,
                        isSelected: false,
                    };
                }
                return friend;
            });

        case CLEAR_SELECTED_FRIENDS:
            return state.map(friend => {
                return {
                    ...friend,
                    isSelected: false,
                };
            });

        default:
            return state;
    }
};

export { friendReducer };
