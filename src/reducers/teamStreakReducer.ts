import {
    GET_LIVE_TEAM_STREAKS,
    ADD_FRIEND_TO_TEAM_STREAK,
    TeamStreakActionTypes,
    COMPLETE_TEAM_MEMBER_STREAK_TASK,
    COMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL,
    COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING,
    COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED,
    INCOMPLETE_TEAM_MEMBER_STREAK_TASK,
    INCOMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL,
    INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING,
    INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED,
    CREATE_TEAM_STREAK,
    GET_LIVE_TEAM_STREAK,
    GET_LIVE_TEAM_STREAK_IS_LOADING,
    GET_LIVE_TEAM_STREAK_IS_LOADED,
    EDIT_TEAM_STREAK_FAIL,
    EDIT_TEAM_STREAK_LOADING,
    EDIT_TEAM_STREAK_LOADED,
    GET_LIVE_TEAM_STREAKS_IS_LOADING,
    GET_LIVE_TEAM_STREAKS_IS_LOADED,
    CREATE_TEAM_STREAK_IS_LOADING,
    CREATE_TEAM_STREAK_IS_LOADED,
    CREATE_TEAM_STREAK_ERROR,
    CLEAR_CREATE_TEAM_STREAK_ERROR,
    ARCHIVE_TEAM_STREAK,
    ARCHIVE_TEAM_STREAK_IS_LOADING,
    ARCHIVE_TEAM_STREAK_IS_LOADED,
    ARCHIVE_TEAM_STREAK_FAIL,
    CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE,
    GET_ARCHIVED_TEAM_STREAKS,
    GET_ARCHIVED_TEAM_STREAK_LOADING,
    GET_ARCHIVED_TEAM_STREAK_LOADED,
    GET_ARCHIVED_TEAM_STREAK,
} from '../actions/types';
import { PopulatedTeamStreak, PopulatedTeamMember, TeamMemberStreak, StreakStatus } from '@streakoid/streakoid-sdk/lib';

export interface PopulatedTeamStreakWithLoadingStates extends PopulatedTeamStreak {
    members: PopulatedTeamMemberWithLoadingStates[];
}

export interface PopulatedTeamStreakWithTaskDates extends PopulatedTeamStreak {
    members: PopulatedTeamMemberWithLoadingStates[];
    completedTeamMemberStreakTaskDatesWithCounts: { date: Date; count: number }[];
}

export interface PopulatedTeamMemberWithLoadingStates extends PopulatedTeamMember {
    teamMemberStreak: TeamMemberStreakWithLoadingStates;
}

interface TeamMemberStreakWithLoadingStates extends TeamMemberStreak {
    completeTeamMemberStreakTaskIsLoading: boolean;
    completeTeamMemberStreakTaskErrorMessage: string;
    incompleteTeamMemberStreakTaskIsLoading: boolean;
    incompleteTeamMemberStreakTaskErrorMessage: string;
}

export interface TeamStreakReducerState {
    liveTeamStreaks: PopulatedTeamStreakWithLoadingStates[];
    archivedTeamStreaks: PopulatedTeamStreakWithLoadingStates[];
    selectedLiveTeamStreak: PopulatedTeamStreakWithTaskDates;
    selectedArchivedTeamStreak: PopulatedTeamStreakWithTaskDates;
    getMultipleArchivedTeamStreaksIsLoading: boolean;
    getMultipleLiveTeamStreaksIsLoading: boolean;
    getLiveTeamStreakIsLoading: boolean;
    getArchivedTeamStreakIsLoading: boolean;
    editTeamStreakIsLoading: boolean;
    editTeamStreakErrorMessage: string;
    createTeamStreakIsLoading: boolean;
    createTeamStreakErrorMessage: string;
    archiveTeamStreakIsLoading: boolean;
    restoreArchivedTeamStreakIsLoading: boolean;
    deleteArchivedTeamStreakIsLoading: boolean;
    archiveTeamStreakErrorMessage: string;
    restoreArchivedTeamStreakErrorMessage: string;
    deleteArchivedTeamStreakErrorMessage: string;
}

const initialState: TeamStreakReducerState = {
    liveTeamStreaks: [],
    archivedTeamStreaks: [],
    selectedLiveTeamStreak: {
        _id: '',
        status: StreakStatus.live,
        creatorId: '',
        creator: {
            _id: '',
            username: '',
        },
        currentStreak: {
            numberOfDaysInARow: 0,
        },
        pastStreaks: [],
        members: [],
        streakName: '',
        timezone: '',
        completedToday: false,
        active: false,
        createdAt: '',
        updatedAt: '',
        completedTeamMemberStreakTaskDatesWithCounts: [],
    },
    selectedArchivedTeamStreak: {
        _id: '',
        status: StreakStatus.archived,
        creatorId: '',
        creator: {
            _id: '',
            username: '',
        },
        currentStreak: {
            numberOfDaysInARow: 0,
        },
        pastStreaks: [],
        members: [],
        streakName: '',
        timezone: '',
        completedToday: false,
        active: false,
        createdAt: '',
        updatedAt: '',
        completedTeamMemberStreakTaskDatesWithCounts: [],
    },
    getMultipleLiveTeamStreaksIsLoading: false,
    getMultipleArchivedTeamStreaksIsLoading: false,
    getLiveTeamStreakIsLoading: false,
    getArchivedTeamStreakIsLoading: false,
    editTeamStreakIsLoading: false,
    editTeamStreakErrorMessage: '',
    createTeamStreakIsLoading: false,
    createTeamStreakErrorMessage: '',
    archiveTeamStreakIsLoading: false,
    restoreArchivedTeamStreakIsLoading: false,
    deleteArchivedTeamStreakIsLoading: false,
    archiveTeamStreakErrorMessage: '',
    restoreArchivedTeamStreakErrorMessage: '',
    deleteArchivedTeamStreakErrorMessage: '',
};

const teamStreakReducer = (state = initialState, action: TeamStreakActionTypes): TeamStreakReducerState => {
    switch (action.type) {
        case GET_LIVE_TEAM_STREAKS:
            return {
                ...state,
                liveTeamStreaks: action.payload,
            };

        case GET_LIVE_TEAM_STREAKS_IS_LOADING:
            return {
                ...state,
                getMultipleLiveTeamStreaksIsLoading: true,
            };

        case GET_LIVE_TEAM_STREAKS_IS_LOADED:
            return {
                ...state,
                getMultipleLiveTeamStreaksIsLoading: false,
            };

        case GET_ARCHIVED_TEAM_STREAKS:
            return {
                ...state,
                archivedTeamStreaks: action.payload,
            };

        case GET_ARCHIVED_TEAM_STREAK_LOADING:
            return {
                ...state,
                getMultipleArchivedTeamStreaksIsLoading: true,
            };

        case GET_ARCHIVED_TEAM_STREAK_LOADED:
            return {
                ...state,
                getMultipleArchivedTeamStreaksIsLoading: false,
            };

        case GET_LIVE_TEAM_STREAK:
            return {
                ...state,
                selectedLiveTeamStreak: action.payload,
            };

        case GET_LIVE_TEAM_STREAK_IS_LOADING:
            return {
                ...state,
                getLiveTeamStreakIsLoading: true,
            };

        case GET_LIVE_TEAM_STREAK_IS_LOADED:
            return {
                ...state,
                getLiveTeamStreakIsLoading: false,
            };

        case GET_ARCHIVED_TEAM_STREAK:
            return {
                ...state,
                selectedArchivedTeamStreak: action.payload,
            };

        case GET_ARCHIVED_TEAM_STREAK_LOADING:
            return {
                ...state,
                getArchivedTeamStreakIsLoading: true,
            };

        case GET_ARCHIVED_TEAM_STREAK_LOADED: {
            return {
                ...state,
                getArchivedTeamStreakIsLoading: false,
            };
        }

        case CREATE_TEAM_STREAK:
            return {
                ...state,
                liveTeamStreaks: [...state.liveTeamStreaks, action.payload],
            };

        case EDIT_TEAM_STREAK_FAIL:
            return {
                ...state,
                editTeamStreakErrorMessage: action.payload,
            };

        case EDIT_TEAM_STREAK_LOADING:
            return {
                ...state,
                editTeamStreakIsLoading: true,
            };

        case EDIT_TEAM_STREAK_LOADED:
            return {
                ...state,
                editTeamStreakIsLoading: false,
            };

        case ADD_FRIEND_TO_TEAM_STREAK:
            return state;

        case COMPLETE_TEAM_MEMBER_STREAK_TASK:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id === action.teamMemberStreakId) {
                            const completedTeamMemberStreak = {
                                ...member.teamMemberStreak,
                                completedToday: true,
                            };
                            return {
                                ...member,
                                teamMemberStreak: completedTeamMemberStreak,
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            };

        case COMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id === action.payload.teamMemberStreakId) {
                            const teamMemberStreak = {
                                ...member.teamMemberStreak,
                                completeTeamMemberStreakTaskErrorMessage: action.payload.errorMessage,
                            };
                            return {
                                ...member,
                                teamMemberStreak,
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            };

        case COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id === action.teamMemberStreakId) {
                            const teamMemberStreak = {
                                ...member.teamMemberStreak,
                                completeTeamMemberStreakTaskIsLoading: true,
                            };
                            return {
                                ...member,
                                teamMemberStreak,
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            };

        case COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id === action.teamMemberStreakId) {
                            const teamMemberStreak = {
                                ...member.teamMemberStreak,
                                completeTeamMemberStreakTaskIsLoading: false,
                            };
                            return {
                                ...member,
                                teamMemberStreak,
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            };

        case INCOMPLETE_TEAM_MEMBER_STREAK_TASK:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id === action.teamMemberStreakId) {
                            const completedTeamMemberStreak = {
                                ...member.teamMemberStreak,
                                completedToday: false,
                            };
                            return {
                                ...member,
                                teamMemberStreak: completedTeamMemberStreak,
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            };

        case INCOMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id === action.payload.teamMemberStreakId) {
                            const teamMemberStreak = {
                                ...member.teamMemberStreak,
                                incompleteTeamMemberStreakTaskErrorMessage: action.payload.errorMessage,
                            };
                            return {
                                ...member,
                                teamMemberStreak,
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            };

        case INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id === action.teamMemberStreakId) {
                            const teamMemberStreak = {
                                ...member.teamMemberStreak,
                                incompleteTeamMemberStreakTaskIsLoading: true,
                            };
                            return {
                                ...member,
                                teamMemberStreak,
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            };

        case INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id === action.teamMemberStreakId) {
                            const teamMemberStreak = {
                                ...member.teamMemberStreak,
                                incompleteTeamMemberStreakTaskIsLoading: false,
                            };
                            return {
                                ...member,
                                teamMemberStreak,
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            };

        case CREATE_TEAM_STREAK_IS_LOADING:
            return {
                ...state,
                createTeamStreakIsLoading: true,
            };

        case CREATE_TEAM_STREAK_IS_LOADED:
            return {
                ...state,
                createTeamStreakIsLoading: false,
            };

        case CREATE_TEAM_STREAK_ERROR:
            return {
                ...state,
                createTeamStreakErrorMessage: action.errorMessage,
            };

        case CLEAR_CREATE_TEAM_STREAK_ERROR:
            return {
                ...state,
                createTeamStreakErrorMessage: '',
            };

        case ARCHIVE_TEAM_STREAK:
            return {
                ...state,
                archivedTeamStreaks: [...state.archivedTeamStreaks, action.payload],
                liveTeamStreaks: [...state.liveTeamStreaks.filter(teamStreak => teamStreak._id !== action.payload._id)],
            };

        case ARCHIVE_TEAM_STREAK_FAIL:
            return {
                ...state,
                archiveTeamStreakErrorMessage: action.errorMessage,
            };

        case CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE:
            return {
                ...state,
                archiveTeamStreakErrorMessage: '',
            };

        case ARCHIVE_TEAM_STREAK_IS_LOADING:
            return {
                ...state,
                archiveTeamStreakIsLoading: true,
            };

        case ARCHIVE_TEAM_STREAK_IS_LOADED:
            return {
                ...state,
                archiveTeamStreakIsLoading: false,
            };

        default:
            return state;
    }
};

export { teamStreakReducer };
