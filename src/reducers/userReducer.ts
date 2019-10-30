import {
    GET_USERS,
    UserActionTypes,
    GET_USERS_FAIL,
    GET_USERS_IS_LOADING,
    GET_USERS_IS_LOADED,
    SEND_FRIEND_REQUEST_LOADED,
    SEND_FRIEND_REQUEST_LOADING,
    CLEAR_SEND_FRIEND_REQUEST_ERROR_MESSAGE,
    SEND_FRIEND_REQUEST_FAIL,
    CREATE_STRIPE_SUBSCRIPTION_FAIL,
    CLEAR_STRIPE_SUBSCRIPTION_ERROR_MESSAGE,
    CREATE_STRIPE_SUBSCRIPTION_LOADING,
    CREATE_STRIPE_SUBSCRIPTION_LOADED,
    SEND_CONTACT_US_EMAIL_FAIL,
    SEND_CONTACT_US_EMAIL_LOADING,
    SEND_CONTACT_US_EMAIL_LOADED,
    SEND_CONTACT_US_EMAIL,
    CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES,
    UPDATE_CURRENT_USER,
    GET_CURRENT_USER,
    GET_USER,
    GET_USER_FAIL,
    GET_USER_IS_LOADING,
    GET_USER_IS_LOADED,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_FAIL,
    UPLOAD_PROFILE_IMAGE_IS_LOADING,
    UPLOAD_PROFILE_IMAGE_IS_LOADED,
    CLEAR_UPLOAD_PROFILE_IMAGE_MESSAGES,
    GET_FRIENDS_IS_LOADING,
    GET_FRIENDS_IS_LOADED,
} from '../actions/types';
import { User, SoloStreak, PopulatedTeamStreak } from '@streakoid/streakoid-sdk';
import UserTypes from '@streakoid/streakoid-sdk/lib/userTypes';

export interface UserWithClientData extends User {
    sendFriendRequestIsLoading: boolean;
    sendFriendRequestErrorMessage: string;
}

export interface SelectedUser extends User {
    soloStreaks: SoloStreak[];
    teamStreaks: PopulatedTeamStreak[];
}

export interface UserReducerInitialState {
    usersList: UserWithClientData[];
    currentUser: User;
    selectedUser: SelectedUser;
    getUsersIsLoading: boolean;
    getUsersErrorMessage: string;
    getUserIsLoading: boolean;
    getUserErrorMessage: string;
    createStripeSubscriptionErrorMessage: string;
    createStripeSubscriptionIsLoading: boolean;
    sendContactUsEmailSuccessMessage: string;
    sendContactUsEmailErrorMessage: string;
    sendContactUsEmailIsLoading: boolean;
    uploadProfileImageIsLoading: boolean;
    uploadProfileImageErrorMessage: string;
    uploadProfileImageSuccessMessage: string;
    getFriendsIsLoading: boolean;
}

const initialState: UserReducerInitialState = {
    usersList: [],
    currentUser: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        timezone: '',
        userType: UserTypes.basic,
        friends: [],
        profileImages: {
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        },
        stripe: {
            customer: '',
            subscription: '',
        },
    },
    selectedUser: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        timezone: '',
        userType: UserTypes.basic,
        friends: [],
        profileImages: {
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        },
        stripe: {
            customer: '',
            subscription: '',
        },
        soloStreaks: [],
        teamStreaks: [],
    },
    getUsersIsLoading: false,
    getUsersErrorMessage: '',
    getUserIsLoading: false,
    getUserErrorMessage: '',
    createStripeSubscriptionErrorMessage: '',
    createStripeSubscriptionIsLoading: false,
    sendContactUsEmailSuccessMessage: '',
    sendContactUsEmailErrorMessage: '',
    sendContactUsEmailIsLoading: false,
    uploadProfileImageIsLoading: false,
    uploadProfileImageErrorMessage: '',
    uploadProfileImageSuccessMessage: '',
    getFriendsIsLoading: false,
};

const userReducer = (state = initialState, action: UserActionTypes): UserReducerInitialState => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                usersList: action.payload,
            };

        case GET_USERS_FAIL:
            return {
                ...state,
                getUsersErrorMessage: action.errorMessage,
            };

        case GET_USERS_IS_LOADING:
            return {
                ...state,
                getUsersIsLoading: true,
            };

        case GET_USERS_IS_LOADED:
            return {
                ...state,
                getUsersIsLoading: false,
            };

        case GET_USER:
            return {
                ...state,
                selectedUser: action.payload,
            };

        case GET_USER_FAIL:
            return {
                ...state,
                getUserErrorMessage: action.payload,
            };

        case GET_USER_IS_LOADING:
            return {
                ...state,
                getUserIsLoading: true,
            };

        case GET_USER_IS_LOADED:
            return {
                ...state,
                getUserIsLoading: false,
            };

        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };

        case UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user,
            };

        case SEND_FRIEND_REQUEST_FAIL:
            return {
                ...state,
                usersList: state.usersList.map(user => {
                    if (user._id === action.payload.friendId) {
                        return { ...user, addFriendRequestErrorMessage: '' };
                    }
                    return user;
                }),
            };

        case CLEAR_SEND_FRIEND_REQUEST_ERROR_MESSAGE:
            return {
                ...state,
                usersList: state.usersList.map(user => {
                    if (user._id === action.friendId) {
                        return { ...user, addFriendRequestErrorMessage: '' };
                    }
                    return user;
                }),
            };

        case SEND_FRIEND_REQUEST_LOADING:
            return {
                ...state,
                usersList: state.usersList.map(user => {
                    if (user._id === action.friendId) {
                        return { ...user, addFriendRequestIsLoading: true };
                    }
                    return user;
                }),
            };

        case SEND_FRIEND_REQUEST_LOADED:
            return {
                ...state,
                usersList: state.usersList.map(user => {
                    if (user._id === action.friendId) {
                        return { ...user, sendFriendRequestIsLoading: false };
                    }
                    return user;
                }),
            };

        case CREATE_STRIPE_SUBSCRIPTION_FAIL:
            return {
                ...state,
                createStripeSubscriptionErrorMessage: action.payload,
            };

        case CLEAR_STRIPE_SUBSCRIPTION_ERROR_MESSAGE:
            return {
                ...state,
                createStripeSubscriptionErrorMessage: '',
            };

        case CREATE_STRIPE_SUBSCRIPTION_LOADING:
            return {
                ...state,
                createStripeSubscriptionIsLoading: true,
            };

        case CREATE_STRIPE_SUBSCRIPTION_LOADED:
            return {
                ...state,
                createStripeSubscriptionIsLoading: false,
            };

        case SEND_CONTACT_US_EMAIL:
            return {
                ...state,
                sendContactUsEmailSuccessMessage: action.payload,
            };

        case SEND_CONTACT_US_EMAIL_FAIL:
            return {
                ...state,
                sendContactUsEmailErrorMessage: action.payload,
            };

        case CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES:
            return {
                ...state,
                sendContactUsEmailSuccessMessage: '',
                sendContactUsEmailErrorMessage: '',
            };

        case SEND_CONTACT_US_EMAIL_LOADING:
            return {
                ...state,
                sendContactUsEmailIsLoading: true,
            };

        case SEND_CONTACT_US_EMAIL_LOADED:
            return {
                ...state,
                sendContactUsEmailIsLoading: false,
            };

        case UPLOAD_PROFILE_IMAGE:
            return {
                ...state,
                uploadProfileImageSuccessMessage: 'Profile image updated successfully',
                currentUser: {
                    ...state.currentUser,
                    profileImages: {
                        ...state.currentUser.profileImages,
                        originalImageUrl: action.payload.originalImageUrl,
                    },
                },
            };

        case UPLOAD_PROFILE_IMAGE_FAIL:
            return {
                ...state,
                uploadProfileImageErrorMessage: action.payload,
            };

        case UPLOAD_PROFILE_IMAGE_IS_LOADING:
            return {
                ...state,
                uploadProfileImageIsLoading: true,
            };

        case UPLOAD_PROFILE_IMAGE_IS_LOADED:
            return {
                ...state,
                uploadProfileImageIsLoading: false,
            };

        case CLEAR_UPLOAD_PROFILE_IMAGE_MESSAGES:
            return {
                ...state,
                uploadProfileImageErrorMessage: '',
                uploadProfileImageSuccessMessage: '',
            };

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

        default:
            return state;
    }
};

export { userReducer };