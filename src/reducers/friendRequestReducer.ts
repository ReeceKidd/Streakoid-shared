import {
    GET_PENDING_FRIEND_REQUESTS,
    REJECT_FRIEND_REQUEST_IS_LOADING,
    REJECT_FRIEND_REQUEST_IS_LOADED,
    REJECT_FRIEND_REQUEST_FAIL,
    CLEAR_REJECT_FRIEND_REQUEST_ERROR_MESSAGE,
    REJECT_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST_IS_LOADING,
    ACCEPT_FRIEND_REQUEST_IS_LOADED,
    ACCEPT_FRIEND_REQUEST_FAIL,
    CLEAR_ACCEPT_FRIEND_REQUEST_ERROR_MESSAGE,
    GET_SENT_FRIEND_REQUESTS,
    SEND_FRIEND_REQUEST,
    FriendRequestActionTypes,
    GET_SENT_FRIEND_REQUESTS_IS_LOADING,
    GET_SENT_FRIEND_REQUESTS_IS_LOADED,
    GET_PENDING_FRIEND_REQUESTS_IS_LOADING,
    GET_PENDING_FRIEND_REQUESTS_IS_LOADED,
} from '../actions/types';
import { PopulatedFriendRequest } from '@streakoid/streakoid-sdk/lib';

export interface FriendRequestStateWithClientData extends PopulatedFriendRequest {
    requesterProfileImage: string;
    sendFriendRequestIsLoading: boolean;
    sendFriendRequestErrorMessage: string;
    acceptFriendRequestIsLoading: boolean;
    acceptFriendRequestErrorMessage: string;
    rejectFriendRequestIsLoading: boolean;
    rejectFriendRequestErrorMessage: string;
}

export interface FriendRequestReducerState {
    pendingFriendRequests: FriendRequestStateWithClientData[];
    sentFriendRequests: PopulatedFriendRequest[];
    getSentFriendRequestsIsLoading: boolean;
    getPendingFriendRequestsIsLoading: boolean;
}

const initialState: FriendRequestReducerState = {
    pendingFriendRequests: [],
    sentFriendRequests: [],
    getSentFriendRequestsIsLoading: false,
    getPendingFriendRequestsIsLoading: false,
};

const friendRequestReducer = (state = initialState, action: FriendRequestActionTypes): FriendRequestReducerState => {
    switch (action.type) {
        case GET_PENDING_FRIEND_REQUESTS:
            return {
                ...state,
                pendingFriendRequests: action.pendingFriendRequests,
            };

        case ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.filter(
                    friendRequest => friendRequest._id !== action.friendRequestId,
                ),
            };

        case ACCEPT_FRIEND_REQUEST_IS_LOADING:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.map(friendRequest => {
                    if (friendRequest._id === action.friendRequestId) {
                        return {
                            ...friendRequest,
                            acceptFriendRequestIsLoading: true,
                        };
                    }
                    return friendRequest;
                }),
            };

        case ACCEPT_FRIEND_REQUEST_IS_LOADED:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.map(friendRequest => {
                    if (friendRequest._id === action.friendRequestId) {
                        return {
                            ...friendRequest,
                            acceptFriendRequestIsLoading: false,
                        };
                    }
                    return friendRequest;
                }),
            };

        case ACCEPT_FRIEND_REQUEST_FAIL:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.map(friendRequest => {
                    if (friendRequest._id === action.payload.friendRequestId) {
                        return {
                            ...friendRequest,
                            acceptFriendRequestErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return friendRequest;
                }),
            };

        case CLEAR_ACCEPT_FRIEND_REQUEST_ERROR_MESSAGE:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.map(friendRequest => {
                    if (friendRequest._id === action.friendRequestId) {
                        return {
                            ...friendRequest,
                            acceptFriendRequestErrorMessage: '',
                        };
                    }
                    return friendRequest;
                }),
            };

        case REJECT_FRIEND_REQUEST:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.filter(
                    friendRequest => friendRequest._id !== action.friendRequestId,
                ),
            };

        case REJECT_FRIEND_REQUEST_IS_LOADING:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.map(friendRequest => {
                    if (friendRequest._id === action.friendRequestId) {
                        return {
                            ...friendRequest,
                            rejectFriendRequestIsLoading: true,
                        };
                    }
                    return friendRequest;
                }),
            };

        case REJECT_FRIEND_REQUEST_IS_LOADED:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.map(friendRequest => {
                    if (friendRequest._id === action.friendRequestId) {
                        return {
                            ...friendRequest,
                            rejectFriendRequestIsLoading: false,
                        };
                    }
                    return friendRequest;
                }),
            };

        case REJECT_FRIEND_REQUEST_FAIL:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.map(friendRequest => {
                    if (friendRequest._id === action.payload.friendRequestId) {
                        return {
                            ...friendRequest,
                            rejectFriendRequestErrorMessage: action.payload.errorMessage,
                        };
                    }
                    return friendRequest;
                }),
            };

        case CLEAR_REJECT_FRIEND_REQUEST_ERROR_MESSAGE:
            return {
                ...state,
                pendingFriendRequests: state.pendingFriendRequests.map(friendRequest => {
                    if (friendRequest._id === action.friendRequestId) {
                        return {
                            ...friendRequest,
                            rejectFriendRequestErrorMessage: '',
                        };
                    }
                    return friendRequest;
                }),
            };

        case GET_SENT_FRIEND_REQUESTS:
            return {
                ...state,
                sentFriendRequests: action.sentFriendRequests,
            };

        case SEND_FRIEND_REQUEST:
            return {
                ...state,
                sentFriendRequests: [...state.sentFriendRequests, action.friendRequest],
            };

        case GET_SENT_FRIEND_REQUESTS_IS_LOADING:
            return {
                ...state,
                getSentFriendRequestsIsLoading: true,
            };

        case GET_SENT_FRIEND_REQUESTS_IS_LOADED:
            return {
                ...state,
                getSentFriendRequestsIsLoading: false,
            };

        case GET_PENDING_FRIEND_REQUESTS_IS_LOADING:
            return {
                ...state,
                getPendingFriendRequestsIsLoading: true,
            };

        case GET_PENDING_FRIEND_REQUESTS_IS_LOADED:
            return {
                ...state,
                getPendingFriendRequestsIsLoading: false,
            };

        default:
            return state;
    }
};

export { friendRequestReducer };
