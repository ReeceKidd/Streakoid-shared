import { Dispatch } from 'redux';

import {
    GET_PENDING_FRIEND_REQUESTS,
    GET_PENDING_FRIEND_REQUESTS_FAIL,
    GET_SENT_FRIEND_REQUESTS,
    GET_SENT_FRIEND_REQUESTS_FAIL,
    REJECT_FRIEND_REQUEST,
    REJECT_FRIEND_REQUEST_FAIL,
    GET_SENT_FRIEND_REQUESTS_IS_LOADING,
    GET_SENT_FRIEND_REQUESTS_IS_LOADED,
    GET_PENDING_FRIEND_REQUESTS_IS_LOADING,
    GET_PENDING_FRIEND_REQUESTS_IS_LOADED,
    REJECT_FRIEND_REQUEST_IS_LOADING,
    REJECT_FRIEND_REQUEST_IS_LOADED,
    CLEAR_REJECT_FRIEND_REQUEST_ERROR_MESSAGE,
    ACCEPT_FRIEND_REQUEST_IS_LOADING,
    ACCEPT_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST_IS_LOADED,
    ACCEPT_FRIEND_REQUEST_FAIL,
} from './types';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import { AppActions, AppState } from '..';
import { FriendRequestStatus } from '@streakoid/streakoid-sdk/lib';

const friendRequestActions = (streakoid: typeof streakoidSDK) => {
    const getPendingFriendRequests = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_PENDING_FRIEND_REQUESTS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            const pendingFriendRequests = await streakoid.friendRequests.getAll({
                status: FriendRequestStatus.pending,
                requesteeId: userId,
            });
            const pendingFriendRequestsWithClientData = await Promise.all(
                pendingFriendRequests.map(async friendRequest => {
                    const requester = await streakoid.users.getOne(friendRequest.requester._id);
                    return {
                        ...friendRequest,
                        requesterProfileImage: requester.profileImages.originalImageUrl,
                        sendFriendRequestIsLoading: false,
                        sendFriendRequestErrorMessage: '',
                        acceptFriendRequestIsLoading: false,
                        acceptFriendRequestErrorMessage: '',
                        rejectFriendRequestIsLoading: false,
                        rejectFriendRequestErrorMessage: '',
                    };
                }),
            );
            dispatch({ type: GET_PENDING_FRIEND_REQUESTS, pendingFriendRequests: pendingFriendRequestsWithClientData });
            dispatch({ type: GET_PENDING_FRIEND_REQUESTS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_PENDING_FRIEND_REQUESTS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_PENDING_FRIEND_REQUESTS_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_PENDING_FRIEND_REQUESTS_FAIL, errorMessage: err.message });
            }
        }
    };

    const getSentFriendRequests = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_SENT_FRIEND_REQUESTS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            const sentFriendRequests = await streakoid.friendRequests.getAll({
                status: FriendRequestStatus.pending,
                requesterId: userId,
            });
            const sentFriendRequestWithClientData = sentFriendRequests.map(friendRequest => ({
                ...friendRequest,
                sendFriendRequestIsLoading: false,
                sendFriendRequestErrorMessage: '',
            }));
            dispatch({ type: GET_SENT_FRIEND_REQUESTS, sentFriendRequests: sentFriendRequestWithClientData });
            dispatch({ type: GET_SENT_FRIEND_REQUESTS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_SENT_FRIEND_REQUESTS_IS_LOADED });
            dispatch({ type: GET_SENT_FRIEND_REQUESTS_FAIL, errorMessage: err.message });
        }
    };

    const acceptFriendRequest = ({
        requesterId,
        friendRequestId,
    }: {
        requesterId: string;
        friendRequestId: string;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            const userId = getState().users.currentUser._id;
            dispatch({ type: ACCEPT_FRIEND_REQUEST_IS_LOADING, friendRequestId });
            await streakoid.users.friends.addFriend({ userId, friendId: requesterId });
            dispatch({ type: ACCEPT_FRIEND_REQUEST, friendRequestId });
            dispatch({ type: ACCEPT_FRIEND_REQUEST_IS_LOADED, friendRequestId });
        } catch (err) {
            dispatch({ type: ACCEPT_FRIEND_REQUEST_IS_LOADED, friendRequestId });
            if (err.response) {
                dispatch({
                    type: ACCEPT_FRIEND_REQUEST_FAIL,
                    payload: { errorMessage: err.response.data.message, friendRequestId },
                });
            } else {
                dispatch({ type: ACCEPT_FRIEND_REQUEST_FAIL, payload: { errorMessage: err.message, friendRequestId } });
            }
        }
    };

    const rejectFriendRequest = (friendRequestId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: REJECT_FRIEND_REQUEST_IS_LOADING, friendRequestId });
            await streakoid.friendRequests.update({
                friendRequestId,
                updateData: { status: FriendRequestStatus.rejected },
            });
            dispatch({ type: REJECT_FRIEND_REQUEST, friendRequestId });
            dispatch({ type: REJECT_FRIEND_REQUEST_IS_LOADED, friendRequestId });
        } catch (err) {
            dispatch({ type: REJECT_FRIEND_REQUEST_IS_LOADED, friendRequestId });
            dispatch({ type: REJECT_FRIEND_REQUEST_FAIL, payload: { errorMessage: err.message, friendRequestId } });
        }
    };

    const clearRejectFriendRequestErrorMessage = (friendRequestId: string): AppActions => ({
        type: CLEAR_REJECT_FRIEND_REQUEST_ERROR_MESSAGE,
        friendRequestId,
    });

    return {
        getPendingFriendRequests,
        getSentFriendRequests,
        acceptFriendRequest,
        rejectFriendRequest,
        clearRejectFriendRequestErrorMessage,
    };
};

export { friendRequestActions };
