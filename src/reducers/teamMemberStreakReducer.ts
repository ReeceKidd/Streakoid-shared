import { TeamMemberStreak, StreakStatus } from '@streakoid/streakoid-sdk/lib';

import {
    TeamMemberStreakActionTypes,
    GET_TEAM_MEMBER_STREAK,
    GET_TEAM_MEMBER_STREAK_IS_LOADING,
    GET_TEAM_MEMBER_STREAK_IS_LOADED,
    CLEAR_SELECTED_TEAM_MEMBER_STREAK,
} from '../actions/types';

export interface TeamMemberStreakReducerState {
    selectedTeamMemberStreak: TeamMemberStreakWithTaskCompletedDates;
    getTeamMemberStreakIsLoading: boolean;
}

const defaultSelectedTeamMemberStreak = {
    _id: '',
    currentStreak: { startDate: new Date().toString(), endDate: new Date().toString(), numberOfDaysInARow: 0 },
    status: StreakStatus.live,
    active: false,
    completedToday: false,
    pastStreaks: [],
    streakName: '',
    userId: '',
    timezone: 'Europe/London',
    createdAt: '',
    updatedAt: '',
    completedTeamMemberStreakTaskDates: [],
    username: '',
    userProfileImage: '',
    teamStreakId: '',
};

const initialState: TeamMemberStreakReducerState = {
    selectedTeamMemberStreak: defaultSelectedTeamMemberStreak,
    getTeamMemberStreakIsLoading: false,
};

export interface TeamMemberStreakWithTaskCompletedDates extends TeamMemberStreak {
    completedTeamMemberStreakTaskDates: Date[];
    username: string;
    userProfileImage: string;
}

const teamMemberStreakReducer = (
    state = initialState,
    action: TeamMemberStreakActionTypes,
): TeamMemberStreakReducerState => {
    switch (action.type) {
        case GET_TEAM_MEMBER_STREAK:
            return {
                ...state,
                selectedTeamMemberStreak: action.payload,
            };

        case GET_TEAM_MEMBER_STREAK_IS_LOADING:
            return {
                ...state,
                getTeamMemberStreakIsLoading: false,
            };

        case GET_TEAM_MEMBER_STREAK_IS_LOADED:
            return {
                ...state,
                getTeamMemberStreakIsLoading: true,
            };

        case CLEAR_SELECTED_TEAM_MEMBER_STREAK:
            return {
                ...state,
                selectedTeamMemberStreak: defaultSelectedTeamMemberStreak,
            };

        default:
            return state;
    }
};

export { teamMemberStreakReducer };
