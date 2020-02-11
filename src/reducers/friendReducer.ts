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
    GET_FRIENDS_IS_LOADING,
    GET_FRIENDS_IS_LOADED,
} from '../actions/types';
import { Friend } from '@streakoid/streakoid-sdk/lib';

export interface FriendWithClientData extends Friend {
    deleteFriendIsLoading: boolean;
    deleteFriendErrorMessage: string;
    isSelected: boolean;
}

export interface FriendStateWithClientData {
    friendList: FriendWithClientData[];
    getFriendsIsLoading: boolean;
}

const initialState: FriendStateWithClientData = {
    friendList: [],
    getFriendsIsLoading: false,
};

const friendReducer = (state = initialState, action: UserActionTypes): FriendStateWithClientData => {
    switch (action.type) {
        case GET_FRIENDS:
            return { ...state, friendList: action.payload };

        case GET_FRIENDS_IS_LOADING:
            return {
                ...state,
                getFriendsIsLoading: true,
            };

        case GET_FRIENDS_IS_LOADED:
            return {
                ...state,
                getFriendsIsLoading: false,
            };

        case DELETE_FRIEND:
            return { ...state, friendList: action.payload };

        case DELETE_FRIEND_FAIL:
            return {
                ...state,
                friendList: state.friendList.map(friend => {
                    if (friend.friendId === action.payload.friendId) {
                        return {
                            ...friend,
                            deleteFriendErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return friend;
                }),
            };

        case DELETE_FRIEND_IS_LOADING:
            return {
                ...state,
                friendList: state.friendList.map(friend => {
                    if (friend.friendId === action.payload) {
                        return {
                            ...friend,
                            deleteFriendIsLoading: true,
                        };
                    }
                    return friend;
                }),
            };

        case DELETE_FRIEND_IS_LOADED:
            return {
                ...state,
                friendList: state.friendList.map(friend => {
                    if (friend.friendId === action.payload) {
                        return {
                            ...friend,
                            deleteFriendIsLoading: false,
                        };
                    }
                    return friend;
                }),
            };

        case SELECT_FRIEND:
            return {
                ...state,
                friendList: state.friendList.map(friend => {
                    if (friend.friendId === action.payload) {
                        return {
                            ...friend,
                            isSelected: true,
                        };
                    }
                    return friend;
                }),
            };

        case UNSELECT_FRIEND:
            return {
                ...state,
                friendList: state.friendList.map(friend => {
                    if (friend.friendId === action.payload) {
                        return {
                            ...friend,
                            isSelected: false,
                        };
                    }
                    return friend;
                }),
            };

        case CLEAR_SELECTED_FRIENDS:
            return {
                ...state,
                friendList: state.friendList.map(friend => {
                    return {
                        ...friend,
                        isSelected: false,
                    };
                }),
            };

        default:
            return state;
    }
};

export { friendReducer };
