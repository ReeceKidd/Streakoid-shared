import {
    TeamMemberStreakActionTypes,
    GET_TEAM_MEMBER_STREAK,
    GET_TEAM_MEMBER_STREAK_IS_LOADING,
    GET_TEAM_MEMBER_STREAK_IS_LOADED,
    CLEAR_SELECTED_TEAM_MEMBER_STREAK,
} from '../actions/types';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { TeamMemberStreak } from '@streakoid/streakoid-models/lib/Models/TeamMemberStreak';

export interface TeamMemberStreakReducerState {
    selectedTeamMemberStreak: SelectedTeamMemberStreak;
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
    teamStreakName: '',
    teamStreakDescription: '',
    totalTimesTracked: 0,
    daysSinceStreakCreation: 0,
    numberOfRestarts: 0,
    activityFeed: {
        totalActivityFeedCount: 0,
        activityFeedItems: [],
    },
    completeSelectedTeamMemberStreakIsLoading: false,
    completeSelectedTeamMemberStreakErrorMessage: '',
    incompleteSelectedTeamMemberStreakIsLoading: false,
    incompleteSelectedTeamMemberStreakErrorMessage: '',
    longestTeamMemberStreak: {
        teamMemberStreakId: '',
        teamStreakId: '',
        teamStreakName: '',
        numberOfDays: 0,
        startDate: new Date(),
    },
};

const initialState: TeamMemberStreakReducerState = {
    selectedTeamMemberStreak: defaultSelectedTeamMemberStreak,
    getTeamMemberStreakIsLoading: false,
};

export interface SelectedTeamMemberStreak extends TeamMemberStreak {
    completedTeamMemberStreakTaskDates: Date[];
    userProfileImage: string;
    teamStreakName: string;
    teamStreakDescription?: string;
    daysSinceStreakCreation: number;
    numberOfRestarts: number;
    activityFeed: {
        totalActivityFeedCount: number;
        activityFeedItems: ClientActivityFeedItemType[];
    };
    completeSelectedTeamMemberStreakIsLoading: boolean;
    completeSelectedTeamMemberStreakErrorMessage: string;
    incompleteSelectedTeamMemberStreakIsLoading: boolean;
    incompleteSelectedTeamMemberStreakErrorMessage: string;
    username: string;
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
                getTeamMemberStreakIsLoading: true,
            };

        case GET_TEAM_MEMBER_STREAK_IS_LOADED:
            return {
                ...state,
                getTeamMemberStreakIsLoading: false,
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
