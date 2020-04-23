import {
    GET_USERS,
    UserActionTypes,
    GET_USERS_FAIL,
    GET_USERS_IS_LOADING,
    GET_USERS_IS_LOADED,
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
    UPDATE_CURRENT_USER_IS_LOADING,
    UPDATE_CURRENT_USER_IS_LOADED,
    GET_CURRENT_USER_IS_LOADING,
    GET_CURRENT_USER_IS_LOADED,
    GET_CURRENT_USER_FAIL,
    UPDATE_CURRENT_USER_FAIL,
    SEND_CANCEL_MEMBERSHIP_EMAIL,
    SEND_CANCEL_MEMBERSHIP_EMAIL_FAIL,
    SEND_CANCEL_MEMBERSHIP_EMAIL_LOADING,
    SEND_CANCEL_MEMBERSHIP_EMAIL_LOADED,
    CLEAR_SELECTED_USER,
    SELECT_FOLLOWER,
    UNSELECT_FOLLOWER,
    CLEAR_SELECTED_FOLLOWERS,
    FOLLOW_USERS_LIST_USER_FAIL,
    FOLLOW_USERS_LIST_USER_IS_LOADING,
    FOLLOW_USERS_LIST_USER_IS_LOADED,
    UNFOLLOW_USERS_LIST_USER_FAIL,
    UNFOLLOW_USERS_LIST_USER_IS_LOADING,
    UNFOLLOW_USERS_LIST_USER_IS_LOADED,
    FOLLOW_SELECTED_USER,
    FOLLOW_SELECTED_USER_IS_LOADING,
    FOLLOW_SELECTED_USER_FAIL,
    FOLLOW_SELECTED_USER_IS_LOADED,
    UNFOLLOW_SELECTED_USER,
    UNFOLLOW_SELECTED_USER_FAIL,
    UNFOLLOW_SELECTED_USER_IS_LOADING,
    UNFOLLOW_SELECTED_USER_IS_LOADED,
    FOLLOW_USERS_LIST_USER,
    UNFOLLOW_USERS_LIST_USER,
    UPDATE_PUSH_NOTIFICATIONS,
    UPDATE_PUSH_NOTIFICATIONS_FAIL,
    UPDATE_PUSH_NOTIFICATIONS_IS_LOADING,
    UPDATE_PUSH_NOTIFICATIONS_IS_LOADED,
    CLEAR_UPDATE_PUSH_NOTIFICATION_ERROR_MESSAGE,
} from '../actions/types';
import {
    SoloStreak,
    PopulatedTeamStreak,
    PopulatedCurrentUser,
    PopulatedUser,
    FormattedUser,
} from '@streakoid/streakoid-sdk';
import UserTypes from '@streakoid/streakoid-sdk/lib/userTypes';
import { ChallengeStreakListItem } from './challengeStreakReducer';
import BasicUser from '@streakoid/streakoid-sdk/lib/models/BasicUser';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';

export interface SelectedUser extends PopulatedUser {
    soloStreaks: SoloStreak[];
    teamStreaks: PopulatedTeamStreak[];
    challengeStreaks: ChallengeStreakListItem[];
    userStreakCompleteInfo: { date: Date; count: number }[];
    longestEverStreak: number;
    longestCurrentStreak: number;
    numberOfStreaks: number;
    totalTimesTracked: number;
    isCurrentUserFollowing: boolean;
    followUserIsLoading: boolean;
    followUserErrorMessage: string;
    unfollowUserIsLoading: boolean;
    unfollowUserErrorMessage: string;
    activityFeed: {
        totalActivityFeedCount: number;
        activityFeedItems: ClientActivityFeedItemType[];
    };
}

export interface FollowingWithClientData extends BasicUser {
    unfollowUserIsLoading: boolean;
    unfollowUserErrorMessage: string;
}

export interface FollowerWithClientData extends BasicUser {
    isSelected: boolean;
}

export interface PopulatedCurrentUserWithClientData extends PopulatedCurrentUser {
    userStreakCompleteInfo: { date: Date; count: number }[];
    following: FollowingWithClientData[];
    followers: FollowerWithClientData[];
    activityFeed: {
        totalActivityFeedCount: number;
        activityFeedItems: ClientActivityFeedItemType[];
    };
    updatePushNotificationsIsLoading: boolean;
    updatePushNotificationsErrorMessage: string;
}

export interface FormattedUserWithClientData extends FormattedUser {
    followUserIsLoading: boolean;
    followUserErrorMessage: string;
    unfollowUserIsLoading: boolean;
    unfollowUserErrorMessage: string;
    isCurrentUserFollowing: boolean;
}

const defaultSelectedUser: SelectedUser = {
    _id: '',
    isPayingMember: false,
    username: '',
    createdAt: '',
    updatedAt: '',
    timezone: 'Europe/London',
    userType: UserTypes.basic,
    friends: [],
    followers: [],
    following: [],
    achievements: [],
    profileImages: {
        originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
    },
    pushNotificationToken: '',
    soloStreaks: [],
    teamStreaks: [],
    challengeStreaks: [],
    userStreakCompleteInfo: [],
    longestEverStreak: 0,
    longestCurrentStreak: 0,
    numberOfStreaks: 0,
    totalTimesTracked: 0,
    isCurrentUserFollowing: false,
    followUserIsLoading: false,
    followUserErrorMessage: '',
    unfollowUserIsLoading: false,
    unfollowUserErrorMessage: '',
    activityFeed: {
        activityFeedItems: [],
        totalActivityFeedCount: 0,
    },
};

export interface UserReducerInitialState {
    usersList: FormattedUserWithClientData[];
    currentUser: PopulatedCurrentUserWithClientData;
    selectedUser: SelectedUser;
    getUsersIsLoading: boolean;
    getUsersErrorMessage: string;
    getUserIsLoading: boolean;
    getUserErrorMessage: string;
    getCurrentUserIsLoading: boolean;
    getCurrentUserErrorMessage: string;
    updateCurrentUserIsLoading: boolean;
    updateCurrentUserErrorMessage: string;
    createStripeSubscriptionErrorMessage: string;
    createStripeSubscriptionIsLoading: boolean;
    sendContactUsEmailSuccessMessage: string;
    sendContactUsEmailErrorMessage: string;
    sendContactUsEmailIsLoading: boolean;
    sendCancelMembershipEmailSuccessMessage: string;
    sendCancelMembershipEmailErrorMessage: string;
    sendCancelMembershipEmailIsLoading: boolean;
    uploadProfileImageIsLoading: boolean;
    uploadProfileImageErrorMessage: string;
    uploadProfileImageSuccessMessage: string;
}

const initialState: UserReducerInitialState = {
    usersList: [],
    currentUser: {
        _id: '',
        email: '',
        username: '',
        membershipInformation: {
            isPayingMember: false,
            pastMemberships: [],
            currentMembershipStartDate: null,
        },
        timezone: 'Europe/London',
        userType: UserTypes.basic,
        profileImages: {
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        },
        friends: [],
        followers: [],
        following: [],
        achievements: [],
        userStreakCompleteInfo: [],
        pushNotificationToken: '',
        pushNotifications: {
            teamStreakUpdates: {
                enabled: false,
            },
            newFollowerUpdates: {
                enabled: false,
            },
            achievementUpdates: {
                enabled: false,
            },
            customStreakReminders: [],
        },
        hasCompletedIntroduction: true,
        createdAt: '',
        updatedAt: '',
        activityFeed: {
            totalActivityFeedCount: 0,
            activityFeedItems: [],
        },
        updatePushNotificationsIsLoading: false,
        updatePushNotificationsErrorMessage: '',
    },
    selectedUser: defaultSelectedUser,
    getUsersIsLoading: false,
    getUsersErrorMessage: '',
    getUserIsLoading: false,
    getUserErrorMessage: '',
    getCurrentUserIsLoading: false,
    getCurrentUserErrorMessage: '',
    updateCurrentUserIsLoading: false,
    updateCurrentUserErrorMessage: '',
    createStripeSubscriptionErrorMessage: '',
    createStripeSubscriptionIsLoading: false,
    sendContactUsEmailSuccessMessage: '',
    sendContactUsEmailErrorMessage: '',
    sendContactUsEmailIsLoading: false,
    sendCancelMembershipEmailSuccessMessage: '',
    sendCancelMembershipEmailErrorMessage: '',
    sendCancelMembershipEmailIsLoading: false,
    uploadProfileImageIsLoading: false,
    uploadProfileImageErrorMessage: '',
    uploadProfileImageSuccessMessage: '',
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

        case GET_CURRENT_USER_FAIL:
            return {
                ...state,
                getCurrentUserErrorMessage: action.errorMessage,
            };

        case GET_CURRENT_USER_IS_LOADING: {
            return {
                ...state,
                getCurrentUserIsLoading: true,
            };
        }

        case GET_CURRENT_USER_IS_LOADED: {
            return {
                ...state,
                getCurrentUserIsLoading: false,
            };
        }

        case UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };

        case UPDATE_CURRENT_USER_FAIL:
            return {
                ...state,
                updateCurrentUserErrorMessage: action.errorMessage,
            };

        case UPDATE_CURRENT_USER_IS_LOADING:
            return {
                ...state,
                updateCurrentUserIsLoading: true,
            };

        case UPDATE_CURRENT_USER_IS_LOADED:
            return {
                ...state,
                updateCurrentUserIsLoading: false,
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

        case CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES:
            return {
                ...state,
                sendContactUsEmailSuccessMessage: '',
                sendContactUsEmailErrorMessage: '',
            };

        case SEND_CANCEL_MEMBERSHIP_EMAIL:
            return {
                ...state,
                sendCancelMembershipEmailSuccessMessage: action.payload,
            };

        case SEND_CANCEL_MEMBERSHIP_EMAIL_FAIL:
            return {
                ...state,
                sendCancelMembershipEmailErrorMessage: action.payload,
            };

        case SEND_CANCEL_MEMBERSHIP_EMAIL_LOADING:
            return {
                ...state,
                sendCancelMembershipEmailIsLoading: true,
            };

        case SEND_CANCEL_MEMBERSHIP_EMAIL_LOADED:
            return {
                ...state,
                sendCancelMembershipEmailIsLoading: false,
            };

        case CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES:
            return {
                ...state,
                sendContactUsEmailSuccessMessage: '',
                sendContactUsEmailErrorMessage: '',
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

        case CLEAR_SELECTED_USER:
            return {
                ...state,
                selectedUser: defaultSelectedUser,
            };

        case FOLLOW_USERS_LIST_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: [...state.currentUser.following, action.payload.userToFollow],
                },
                usersList: [
                    ...state.usersList.map(user => {
                        if (user._id === action.payload.userToFollow.userId) {
                            return {
                                ...user,
                                isCurrentUserFollowing: true,
                            };
                        }
                        return user;
                    }),
                ],
            };

        case FOLLOW_USERS_LIST_USER_FAIL:
            return {
                ...state,
                usersList: [
                    ...state.usersList.map(selectedUser => {
                        if (selectedUser._id === action.payload.userToFollowId) {
                            return {
                                ...selectedUser,
                                followUserErrorMessage: action.payload.errorMessage,
                            };
                        }
                        return selectedUser;
                    }),
                ],
            };

        case FOLLOW_USERS_LIST_USER_IS_LOADING:
            return {
                ...state,
                usersList: [
                    ...state.usersList.map(selectedUser => {
                        if (selectedUser._id === action.payload) {
                            return {
                                ...selectedUser,
                                followUserIsLoading: true,
                            };
                        }
                        return selectedUser;
                    }),
                ],
            };

        case FOLLOW_USERS_LIST_USER_IS_LOADED:
            return {
                ...state,
                usersList: [
                    ...state.usersList.map(selectedUser => {
                        if (selectedUser._id === action.payload) {
                            return {
                                ...selectedUser,
                                followUserIsLoading: false,
                            };
                        }
                        return selectedUser;
                    }),
                ],
            };

        case UNFOLLOW_USERS_LIST_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: [
                        ...state.currentUser.following.filter(user => user.userId !== action.payload.userToUnfollowId),
                    ],
                },
                usersList: [
                    ...state.usersList.map(user => {
                        if (user._id === action.payload.userToUnfollowId) {
                            return {
                                ...user,
                                isCurrentUserFollowing: false,
                            };
                        }
                        return user;
                    }),
                ],
            };

        case UNFOLLOW_USERS_LIST_USER_FAIL:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: state.currentUser.following.map(followingUser => {
                        if (followingUser.userId === action.payload.userToUnfollowId) {
                            return {
                                ...followingUser,
                                unfollowUserErrorMessage: action.payload.errorMessage,
                            };
                        }
                        return followingUser;
                    }),
                },
                usersList: [
                    ...state.usersList.map(selectedUser => {
                        if (selectedUser._id === action.payload.userToUnfollowId) {
                            return {
                                ...selectedUser,
                                unfollowUserErrorMessage: action.payload.errorMessage,
                            };
                        }
                        return selectedUser;
                    }),
                ],
            };

        case UNFOLLOW_USERS_LIST_USER_IS_LOADING:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: state.currentUser.following.map(followingUser => {
                        if (followingUser.userId === action.payload) {
                            return {
                                ...followingUser,
                                unfollowUserIsLoading: true,
                            };
                        }
                        return followingUser;
                    }),
                },
                usersList: [
                    ...state.usersList.map(selectedUser => {
                        if (selectedUser._id === action.payload) {
                            return {
                                ...selectedUser,
                                unfollowUserIsLoading: true,
                            };
                        }
                        return selectedUser;
                    }),
                ],
            };

        case UNFOLLOW_USERS_LIST_USER_IS_LOADED:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: state.currentUser.following.map(followingUser => {
                        if (followingUser.userId === action.payload) {
                            return {
                                ...followingUser,
                                unfollowUserIsLoaded: false,
                            };
                        }
                        return followingUser;
                    }),
                },
                usersList: [
                    ...state.usersList.map(selectedUser => {
                        if (selectedUser._id === action.payload) {
                            return {
                                ...selectedUser,
                                unfollowUserIsLoading: false,
                            };
                        }
                        return selectedUser;
                    }),
                ],
            };

        case SELECT_FOLLOWER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    followers: state.currentUser.followers.map(follower => {
                        if (follower.userId === action.payload) {
                            return {
                                ...follower,
                                isSelected: true,
                            };
                        }
                        return follower;
                    }),
                },
            };

        case UNSELECT_FOLLOWER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    followers: state.currentUser.followers.map(follower => {
                        if (follower.userId === action.payload) {
                            return {
                                ...follower,
                                isSelected: false,
                            };
                        }
                        return follower;
                    }),
                },
            };

        case CLEAR_SELECTED_FOLLOWERS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    followers: state.currentUser.followers.map(follower => {
                        return {
                            ...follower,
                            isSelected: false,
                        };
                    }),
                },
            };

        case FOLLOW_SELECTED_USER:
            return {
                ...state,
                selectedUser: {
                    ...state.selectedUser,
                    isCurrentUserFollowing: true,
                    followers: [...state.selectedUser.followers, action.payload.currentUser],
                },
                currentUser: {
                    ...state.currentUser,
                    following: [
                        ...state.currentUser.following,
                        { ...action.payload.userToFollow, unfollowUserErrorMessage: '', unfollowUserIsLoading: false },
                    ],
                },
            };

        case FOLLOW_SELECTED_USER_FAIL:
            return {
                ...state,
                selectedUser: {
                    ...state.selectedUser,
                    followUserErrorMessage: action.payload,
                },
            };

        case FOLLOW_SELECTED_USER_IS_LOADING:
            return {
                ...state,
                selectedUser: {
                    ...state.selectedUser,
                    followUserIsLoading: true,
                },
            };

        case FOLLOW_SELECTED_USER_IS_LOADED:
            return {
                ...state,
                selectedUser: {
                    ...state.selectedUser,
                    followUserIsLoading: false,
                },
            };

        case UNFOLLOW_SELECTED_USER:
            return {
                ...state,
                selectedUser: {
                    ...state.selectedUser,
                    followers: [
                        ...state.selectedUser.followers.filter(user => user.userId !== action.payload.currentUserId),
                    ],
                    isCurrentUserFollowing: false,
                },
                currentUser: {
                    ...state.currentUser,
                    following: [
                        ...state.currentUser.following.filter(user => user.userId !== action.payload.userToUnfollowId),
                    ],
                },
            };

        case UNFOLLOW_SELECTED_USER_FAIL:
            return {
                ...state,
                selectedUser: {
                    ...state.selectedUser,
                    unfollowUserErrorMessage: action.payload,
                },
            };

        case UNFOLLOW_SELECTED_USER_IS_LOADING:
            return {
                ...state,
                selectedUser: {
                    ...state.selectedUser,
                    unfollowUserIsLoading: true,
                },
            };

        case UNFOLLOW_SELECTED_USER_IS_LOADED:
            return {
                ...state,
                selectedUser: {
                    ...state.selectedUser,
                    unfollowUserIsLoading: false,
                },
            };

        case UPDATE_PUSH_NOTIFICATIONS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    pushNotifications: {
                        ...state.currentUser.pushNotifications,
                        ...action.payload,
                    },
                },
            };

        case UPDATE_PUSH_NOTIFICATIONS_FAIL:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    updatePushNotificationsErrorMessage: action.payload,
                },
            };

        case UPDATE_PUSH_NOTIFICATIONS_IS_LOADING:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    updatePushNotificationsIsLoading: true,
                },
            };

        case UPDATE_PUSH_NOTIFICATIONS_IS_LOADED:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    updatePushNotificationsIsLoading: false,
                },
            };

        case CLEAR_UPDATE_PUSH_NOTIFICATION_ERROR_MESSAGE:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    updatePushNotificationsErrorMessage: '',
                },
            };

        default:
            return state;
    }
};

export { userReducer };
