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
} from '../actions/types';
import { PopulatedTeamMember } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamMember';

export interface LeaderboardReducerState {
    soloStreakLeaderboard: SoloStreakLeaderboardItem[];
    getSoloStreakLeaderboardIsLoading: boolean;
    getSoloStreakLeaderboardErrorMessage: string;
    teamStreakLeaderboard: TeamStreakLeaderboardItem[];
    getTeamStreakLeaderboardIsLoading: boolean;
    getTeamStreakLeaderboardErrorMessage: string;
    challengeStreakLeaderboard: ChallengeStreakLeaderboardItem[];
    getChallengeStreakLeaderboardIsLoading: boolean;
    getChallengeStreakLeaderboardErrorMessage: string;
}

export interface SoloStreakLeaderboardItem {
    streakName: string;
    streakId: string;
    username: string;
    userProfileImage: string;
    currentStreakNumberOfDaysInARow: number;
    streakCreatedAt: Date;
}

export interface TeamStreakLeaderboardItem {
    streakName: string;
    streakId: string;
    currentStreakNumberOfDaysInARow: number;
    streakCreatedAt: Date;
    members: PopulatedTeamMember[];
}

export interface ChallengeStreakLeaderboardItem {
    challengeName: string;
    streakId: string;
    username: string;
    userProfileImage: string;
    currentStreakNumberOfDaysInARow: number;
    streakCreatedAt: Date;
}

const initialState: LeaderboardReducerState = {
    soloStreakLeaderboard: [],
    getSoloStreakLeaderboardIsLoading: false,
    getSoloStreakLeaderboardErrorMessage: '',
    teamStreakLeaderboard: [],
    getTeamStreakLeaderboardIsLoading: false,
    getTeamStreakLeaderboardErrorMessage: '',
    challengeStreakLeaderboard: [],
    getChallengeStreakLeaderboardIsLoading: false,
    getChallengeStreakLeaderboardErrorMessage: '',
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

        default:
            return state;
    }
};

export { leaderboardReducer };
