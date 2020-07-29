import {
    LeaderboardActionTypes,
    GET_SOLO_STREAK_LEADERBOARD,
    GET_SOLO_STREAK_LEADERBOARD_FAIL,
    GET_SOLO_STREAK_LEADERBOARD_LOADED,
    GET_SOLO_STREAK_LEADERBOARD_LOADING,
    GET_TEAM_STREAK_LEADERBOARD,
    GET_TEAM_STREAK_LEADERBOARD_FAIL,
    GET_TEAM_STREAK_LEADERBOARD_LOADED,
    GET_TEAM_STREAK_LEADERBOARD_LOADING,
    GET_CHALLENGE_STREAK_LEADERBOARD,
    GET_CHALLENGE_STREAK_LEADERBOARD_FAIL,
    GET_CHALLENGE_STREAK_LEADERBOARD_LOADED,
    GET_CHALLENGE_STREAK_LEADERBOARD_LOADING,
    GET_GLOBAL_USER_LEADERBOARD,
    GET_GLOBAL_USER_LEADERBOARD_FAIL,
    GET_GLOBAL_USER_LEADERBOARD_LOADING,
    GET_GLOBAL_USER_LEADERBOARD_LOADED,
    GET_FOLLOWING_LEADERBOARD,
    GET_FOLLOWING_LEADERBOARD_FAIL,
    GET_FOLLOWING_LEADERBOARD_LOADING,
    GET_FOLLOWING_LEADERBOARD_LOADED,
    GET_TEAM_MEMBER_STREAK_LEADERBOARD,
    GET_TEAM_MEMBER_STREAK_LEADERBOARD_FAIL,
    GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADING,
    GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADED,
} from '../actions/types';
import { PopulatedTeamMember } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamMember';
import { FormattedUser } from '@streakoid/streakoid-models/lib/Models/FormattedUser';

export interface LeaderboardReducerState {
    challengeStreakLeaderboard: ChallengeStreakLeaderboardItem[];
    getChallengeStreakLeaderboardIsLoading: boolean;
    getChallengeStreakLeaderboardErrorMessage: string;
    soloStreakLeaderboard: SoloStreakLeaderboardItem[];
    getSoloStreakLeaderboardIsLoading: boolean;
    getSoloStreakLeaderboardErrorMessage: string;
    teamStreakLeaderboard: TeamStreakLeaderboardItem[];
    getTeamStreakLeaderboardIsLoading: boolean;
    getTeamStreakLeaderboardErrorMessage: string;
    teamMemberStreakLeaderboard: TeamMemberStreakLeaderboardItem[];
    getTeamMemberStreakLeaderboardIsLoading: boolean;
    getTeamMemberStreakLeaderboardErrorMessage: string;
    globalUserLeaderboard: FormattedUser[];
    getGlobalUserLeaderboardIsLoading: boolean;
    getGlobalUserLeaderboardErrorMessage: string;
    followingLeaderboard: FormattedUser[];
    getFollowingLeaderboardIsLoading: boolean;
    getFollowingLeaderboardErrorMessage: string;
}

export interface ChallengeStreakLeaderboardItem {
    challengeName: string;
    streakId: string;
    userProfileImage: string;
    currentStreakNumberOfDaysInARow: number;
    streakCreatedAt: Date;
    username: string;
}

export interface SoloStreakLeaderboardItem {
    streakName: string;
    streakId: string;
    userProfileImage: string;
    currentStreakNumberOfDaysInARow: number;
    streakCreatedAt: Date;
    username: string;
}

export interface TeamStreakLeaderboardItem {
    streakName: string;
    streakId: string;
    currentStreakNumberOfDaysInARow: number;
    streakCreatedAt: Date;
    members: PopulatedTeamMember[];
}

export interface TeamMemberStreakLeaderboardItem {
    streakName: string;
    streakId: string;
    currentStreakNumberOfDaysInARow: number;
    streakCreatedAt: Date;
    userProfileImage: string;
    username: string;
}

const initialState: LeaderboardReducerState = {
    challengeStreakLeaderboard: [],
    getChallengeStreakLeaderboardIsLoading: false,
    getChallengeStreakLeaderboardErrorMessage: '',
    soloStreakLeaderboard: [],
    getSoloStreakLeaderboardIsLoading: false,
    getSoloStreakLeaderboardErrorMessage: '',
    teamStreakLeaderboard: [],
    getTeamStreakLeaderboardIsLoading: false,
    getTeamStreakLeaderboardErrorMessage: '',
    teamMemberStreakLeaderboard: [],
    getTeamMemberStreakLeaderboardIsLoading: false,
    getTeamMemberStreakLeaderboardErrorMessage: '',
    globalUserLeaderboard: [],
    getGlobalUserLeaderboardIsLoading: false,
    getGlobalUserLeaderboardErrorMessage: '',
    followingLeaderboard: [],
    getFollowingLeaderboardIsLoading: false,
    getFollowingLeaderboardErrorMessage: '',
};

export interface LeaderboardWithClientData {
    deleteLeaderboardIsLoading: boolean;
    leaderboardCreatorProfilePicture: string;
}

const leaderboardReducer = (state = initialState, action: LeaderboardActionTypes): LeaderboardReducerState => {
    switch (action.type) {
        case GET_SOLO_STREAK_LEADERBOARD:
            return {
                ...state,
                soloStreakLeaderboard: action.payload,
            };

        case GET_SOLO_STREAK_LEADERBOARD_FAIL:
            return {
                ...state,
                getSoloStreakLeaderboardErrorMessage: action.payload,
            };

        case GET_SOLO_STREAK_LEADERBOARD_LOADING:
            return {
                ...state,
                getSoloStreakLeaderboardIsLoading: true,
            };

        case GET_SOLO_STREAK_LEADERBOARD_LOADED:
            return {
                ...state,
                getSoloStreakLeaderboardIsLoading: false,
            };

        case GET_TEAM_STREAK_LEADERBOARD:
            return {
                ...state,
                teamStreakLeaderboard: action.payload,
            };

        case GET_TEAM_STREAK_LEADERBOARD_FAIL:
            return {
                ...state,
                getTeamStreakLeaderboardErrorMessage: action.payload,
            };

        case GET_TEAM_STREAK_LEADERBOARD_LOADING:
            return {
                ...state,
                getTeamStreakLeaderboardIsLoading: true,
            };

        case GET_TEAM_STREAK_LEADERBOARD_LOADED:
            return {
                ...state,
                getTeamStreakLeaderboardIsLoading: false,
            };

        case GET_TEAM_MEMBER_STREAK_LEADERBOARD:
            return {
                ...state,
                teamMemberStreakLeaderboard: action.payload,
            };

        case GET_TEAM_MEMBER_STREAK_LEADERBOARD_FAIL:
            return {
                ...state,
                getTeamMemberStreakLeaderboardErrorMessage: action.payload,
            };

        case GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADING:
            return {
                ...state,
                getTeamMemberStreakLeaderboardIsLoading: true,
            };

        case GET_TEAM_MEMBER_STREAK_LEADERBOARD_LOADED:
            return {
                ...state,
                getTeamMemberStreakLeaderboardIsLoading: false,
            };

        case GET_CHALLENGE_STREAK_LEADERBOARD:
            return {
                ...state,
                challengeStreakLeaderboard: action.payload,
            };

        case GET_CHALLENGE_STREAK_LEADERBOARD_FAIL:
            return {
                ...state,
                getChallengeStreakLeaderboardErrorMessage: action.payload,
            };

        case GET_CHALLENGE_STREAK_LEADERBOARD_LOADING:
            return {
                ...state,
                getChallengeStreakLeaderboardIsLoading: true,
            };

        case GET_CHALLENGE_STREAK_LEADERBOARD_LOADED:
            return {
                ...state,
                getChallengeStreakLeaderboardIsLoading: false,
            };

        case GET_GLOBAL_USER_LEADERBOARD:
            return {
                ...state,
                globalUserLeaderboard: action.payload,
            };

        case GET_GLOBAL_USER_LEADERBOARD_FAIL:
            return {
                ...state,
                getGlobalUserLeaderboardErrorMessage: action.payload,
            };

        case GET_GLOBAL_USER_LEADERBOARD_LOADING:
            return {
                ...state,
                getGlobalUserLeaderboardIsLoading: true,
            };

        case GET_GLOBAL_USER_LEADERBOARD_LOADED:
            return {
                ...state,
                getGlobalUserLeaderboardIsLoading: false,
            };

        case GET_FOLLOWING_LEADERBOARD:
            return {
                ...state,
                followingLeaderboard: action.payload,
            };

        case GET_FOLLOWING_LEADERBOARD_FAIL:
            return {
                ...state,
                getFollowingLeaderboardErrorMessage: action.payload,
            };

        case GET_FOLLOWING_LEADERBOARD_LOADING:
            return {
                ...state,
                getFollowingLeaderboardIsLoading: true,
            };

        case GET_FOLLOWING_LEADERBOARD_LOADED:
            return {
                ...state,
                getFollowingLeaderboardIsLoading: false,
            };

        default:
            return state;
    }
};

export { leaderboardReducer };
