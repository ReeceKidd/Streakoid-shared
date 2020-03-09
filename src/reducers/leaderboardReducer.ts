import {
    LeaderboardActionTypes,
    GET_SOLO_STREAK_LEADERBOARD,
    GET_SOLO_STREAK_LEADERBOARD_FAIL,
    GET_SOLO_STREAK_LEADERBOARD_LOADED,
    GET_SOLO_STREAK_LEADERBOARD_LOADING,
} from '../actions/types';

export interface LeaderboardReducerState {
    soloStreakLeaderboard: LeaderboardItem[];
    getSoloStreakLeaderboardIsLoading: boolean;
    getSoloStreakLeaderboardErrorMessage: string;
}

export interface LeaderboardItem {
    streakName: string;
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

        case GET_SOLO_STREAK_LEADERBOARD_LOADED:
            return {
                ...state,
                getSoloStreakLeaderboardIsLoading: true,
            };

        case GET_SOLO_STREAK_LEADERBOARD_LOADING:
            return {
                ...state,
                getSoloStreakLeaderboardIsLoading: true,
            };

        default:
            return state;
    }
};

export { leaderboardReducer };
