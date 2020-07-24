import {
    GET_LIVE_TEAM_STREAKS,
    TeamStreakActionTypes,
    COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK,
    COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL,
    COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING,
    COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED,
    INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK,
    INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL,
    INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING,
    INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED,
    CREATE_TEAM_STREAK,
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
    RESTORE_ARCHIVED_TEAM_STREAK,
    RESTORE_ARCHIVED_TEAM_STREAK_LOADING,
    RESTORE_ARCHIVED_TEAM_STREAK_LOADED,
    RESTORE_ARCHIVED_TEAM_STREAK_FAIL,
    DELETE_ARCHIVED_TEAM_STREAK,
    DELETE_ARCHIVED_TEAM_STREAK_LOADING,
    DELETE_ARCHIVED_TEAM_STREAK_LOADED,
    DELETE_ARCHIVED_TEAM_STREAK_FAIL,
    UPDATE_TEAM_STREAK_TIMEZONE,
    CLEAR_SELECTED_TEAM_STREAK,
    GET_SELECTED_TEAM_STREAK,
    GET_SELECTED_TEAM_STREAK_IS_LOADING,
    GET_SELECTED_TEAM_STREAK_IS_LOADED,
    UPDATE_TEAM_STREAK_REMINDER_INFO,
    UPDATE_TEAM_STREAK_REMINDER_INFO_FAIL,
    UPDATE_TEAM_STREAK_REMINDER_INFO_LOADING,
    UPDATE_TEAM_STREAK_REMINDER_INFO_LOADED,
    REMOVE_USER_FROM_TEAM_STREAK_LOADED,
    REMOVE_USER_FROM_TEAM_STREAK_LOADING,
    REMOVE_USER_FROM_TEAM_STREAK_FAIL,
    ADD_USER_TO_TEAM_STREAK_LOADED,
    ADD_USER_TO_TEAM_STREAK_LOADING,
    ADD_USER_TO_TEAM_STREAK_FAIL,
    ADD_USER_TO_TEAM_STREAK,
    REMOVE_USER_FROM_TEAM_STREAK,
} from '../actions/types';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import { CustomTeamStreakReminder } from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import { PopulatedTeamStreak } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamStreak';
import { PopulatedTeamMember } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamMember';
import { TeamMemberStreak } from '@streakoid/streakoid-models/lib/Models/TeamMemberStreak';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { BasicUser } from '@streakoid/streakoid-models/lib/Models/BasicUser';

export interface PopulatedTeamStreakWithClientData extends PopulatedTeamStreak {
    members: PopulatedTeamMemberWithClientData[];
}

export interface PossibleTeamMember extends BasicUser {
    addUserToTeamStreakErrorMessage: string;
    addUserToTeamStreakIsLoading: boolean;
    removeUserFromTeamStreakErrorMessage: string;
    removeUserFromTeamStreakIsLoading: boolean;
}

export interface SelectedTeamStreak extends PopulatedTeamStreak {
    members: PopulatedTeamMemberWithClientData[];
    possibleTeamMembers: PossibleTeamMember[];
    completedTeamMemberStreakTaskDatesWithCounts: { date: Date; count: number }[];
    activityFeed: {
        totalActivityFeedCount: number;
        activityFeedItems: ClientActivityFeedItemType[];
    };
    isCurrentUserApartOfTeamStreak: boolean;
    hasCurrentUserCompletedTaskForTheDay: boolean;
    updateCustomTeamStreakReminderPushNotificationIsLoading: boolean;
    updateCustomTeamStreakReminderPushNotificationErrorMessage: string;
    inviteUrl?: string;
    customTeamStreakReminder?: CustomTeamStreakReminder;
}

export interface PopulatedTeamMemberWithClientData extends PopulatedTeamMember {
    teamMemberStreak: SelectedTeamMemberStreak;
}

interface SelectedTeamMemberStreak extends TeamMemberStreak {
    completeTeamMemberStreakTaskIsLoading: boolean;
    completeTeamMemberStreakTaskErrorMessage: string;
    incompleteTeamMemberStreakTaskIsLoading: boolean;
    incompleteTeamMemberStreakTaskErrorMessage: string;
}

export interface TeamStreakReducerState {
    liveTeamStreaks: PopulatedTeamStreakWithClientData[];
    archivedTeamStreaks: PopulatedTeamStreakWithClientData[];
    selectedTeamStreak: SelectedTeamStreak;
    getMultipleArchivedTeamStreaksIsLoading: boolean;
    getMultipleLiveTeamStreaksIsLoading: boolean;
    getTeamStreakIsLoading: boolean;
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

const defaultSelectedTeamStreak: SelectedTeamStreak = {
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
    possibleTeamMembers: [],
    streakName: '',
    timezone: 'Europe/London',
    completedToday: false,
    active: false,
    createdAt: '',
    updatedAt: '',
    completedTeamMemberStreakTaskDatesWithCounts: [],
    totalTimesTracked: 0,
    activityFeed: {
        totalActivityFeedCount: 0,
        activityFeedItems: [],
    },
    longestTeamStreak: {
        teamStreakId: '',
        teamStreakName: '',
        members: [],
        numberOfDays: 0,
        startDate: new Date(),
    },
    isCurrentUserApartOfTeamStreak: false,
    hasCurrentUserCompletedTaskForTheDay: false,
    updateCustomTeamStreakReminderPushNotificationIsLoading: false,
    updateCustomTeamStreakReminderPushNotificationErrorMessage: '',
};

const initialState: TeamStreakReducerState = {
    liveTeamStreaks: [],
    archivedTeamStreaks: [],
    selectedTeamStreak: defaultSelectedTeamStreak,
    getMultipleLiveTeamStreaksIsLoading: false,
    getMultipleArchivedTeamStreaksIsLoading: false,
    getTeamStreakIsLoading: false,
    editTeamStreakIsLoading: false,
    editTeamStreakErrorMessage: '',
    createTeamStreakIsLoading: false,
    createTeamStreakErrorMessage: '',
    archiveTeamStreakIsLoading: false,
    restoreArchivedTeamStreakIsLoading: false,
    restoreArchivedTeamStreakErrorMessage: '',
    deleteArchivedTeamStreakIsLoading: false,
    deleteArchivedTeamStreakErrorMessage: '',
    archiveTeamStreakErrorMessage: '',
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

        case GET_SELECTED_TEAM_STREAK:
            return {
                ...state,
                selectedTeamStreak: action.payload,
            };

        case GET_SELECTED_TEAM_STREAK_IS_LOADING:
            return {
                ...state,
                getTeamStreakIsLoading: true,
            };

        case GET_SELECTED_TEAM_STREAK_IS_LOADED:
            return {
                ...state,
                getTeamStreakIsLoading: false,
            };

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

        case COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id == action.payload.teamMemberStreakId) {
                            return {
                                ...member,
                                teamMemberStreak: {
                                    ...member.teamMemberStreak,
                                    completedToday: true,
                                },
                            };
                        }
                        return member;
                    });

                    return {
                        ...teamStreak,
                        members,
                        completedToday: !Boolean(
                            members.find(member => member.teamMemberStreak.completedToday === false),
                        ),
                    };
                }),
            };

        case COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id == action.payload.teamMemberStreakId) {
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

        case COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id == action.teamMemberStreakId) {
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

        case COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id == action.teamMemberStreakId) {
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

        case INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id == action.payload.teamMemberStreakId) {
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
                        completedToday: false,
                    };
                }),
            };

        case INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id == action.payload.teamMemberStreakId) {
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

        case INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id == action.teamMemberStreakId) {
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

        case INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED:
            return {
                ...state,
                liveTeamStreaks: state.liveTeamStreaks.map(teamStreak => {
                    const members = teamStreak.members.map(member => {
                        if (member.teamMemberStreak._id == action.teamMemberStreakId) {
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

        case RESTORE_ARCHIVED_TEAM_STREAK:
            return {
                ...state,
                archivedTeamStreaks: state.archivedTeamStreaks.filter(
                    archivedTeamStreak => archivedTeamStreak._id !== action.payload._id,
                ),
            };

        case RESTORE_ARCHIVED_TEAM_STREAK_LOADING:
            return {
                ...state,
                restoreArchivedTeamStreakIsLoading: true,
            };

        case RESTORE_ARCHIVED_TEAM_STREAK_LOADED:
            return {
                ...state,
                restoreArchivedTeamStreakIsLoading: false,
            };

        case RESTORE_ARCHIVED_TEAM_STREAK_FAIL:
            return {
                ...state,
                restoreArchivedTeamStreakErrorMessage: action.payload,
            };

        case DELETE_ARCHIVED_TEAM_STREAK:
            return {
                ...state,
                archivedTeamStreaks: [
                    ...state.archivedTeamStreaks.filter(
                        archivedTeamStreak => archivedTeamStreak._id !== action.payload,
                    ),
                ],
            };

        case DELETE_ARCHIVED_TEAM_STREAK_LOADING: {
            return {
                ...state,
                deleteArchivedTeamStreakIsLoading: true,
            };
        }

        case DELETE_ARCHIVED_TEAM_STREAK_LOADED: {
            return {
                ...state,
                deleteArchivedTeamStreakIsLoading: false,
            };
        }

        case DELETE_ARCHIVED_TEAM_STREAK_FAIL: {
            return {
                ...state,
                deleteArchivedTeamStreakErrorMessage: action.payload,
            };
        }

        case UPDATE_TEAM_STREAK_TIMEZONE: {
            return {
                ...state,
                selectedTeamStreak: action.payload,
            };
        }

        case UPDATE_TEAM_STREAK_REMINDER_INFO: {
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    customTeamStreakReminder: action.payload.customTeamStreakReminder,
                },
            };
        }

        case UPDATE_TEAM_STREAK_REMINDER_INFO_FAIL: {
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    updateCustomTeamStreakReminderPushNotificationErrorMessage: action.payload,
                },
            };
        }

        case UPDATE_TEAM_STREAK_REMINDER_INFO_LOADING: {
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    updateCustomTeamStreakReminderPushNotificationIsLoading: true,
                },
            };
        }

        case UPDATE_TEAM_STREAK_REMINDER_INFO_LOADED: {
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    updateCustomTeamStreakReminderPushNotificationIsLoading: false,
                },
            };
        }

        case ADD_USER_TO_TEAM_STREAK:
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    members: [...state.selectedTeamStreak.members, action.payload.teamMember],
                },
            };

        case ADD_USER_TO_TEAM_STREAK_FAIL:
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    members: state.selectedTeamStreak.members.map(member => {
                        if (String(member._id) === String(action.payload.userId)) {
                            return {
                                ...member,
                                addUserToTeamStreakErrorMessage: action.payload.errorMessage,
                            };
                        }
                        return member;
                    }),
                },
            };

        case ADD_USER_TO_TEAM_STREAK_LOADING:
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    possibleTeamMembers: state.selectedTeamStreak.possibleTeamMembers.map(member => {
                        if (String(member.userId) === String(action.payload.userId)) {
                            return {
                                ...member,
                                addUserToTeamStreakIsLoading: true,
                            };
                        }
                        return member;
                    }),
                },
            };

        case ADD_USER_TO_TEAM_STREAK_LOADED:
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    possibleTeamMembers: state.selectedTeamStreak.possibleTeamMembers.map(member => {
                        if (member.userId === action.payload.userId) {
                            return {
                                ...member,
                                addUserToTeamStreakIsLoading: false,
                            };
                        }
                        return member;
                    }),
                },
            };

        case REMOVE_USER_FROM_TEAM_STREAK:
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    members: state.selectedTeamStreak.members.filter(
                        member => String(member._id) !== String(action.payload.userId),
                    ),
                },
            };

        case REMOVE_USER_FROM_TEAM_STREAK_FAIL:
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    possibleTeamMembers: state.selectedTeamStreak.possibleTeamMembers.map(member => {
                        if (member.userId === action.payload.userId) {
                            return {
                                ...member,
                                removeUserFromTeamStreakErrorMessage: action.payload.errorMessage,
                            };
                        }
                        return member;
                    }),
                },
            };

        case REMOVE_USER_FROM_TEAM_STREAK_LOADING:
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    possibleTeamMembers: state.selectedTeamStreak.possibleTeamMembers.map(member => {
                        if (member.userId === action.payload.userId) {
                            return {
                                ...member,
                                removeUserFromTeamStreakIsLoading: true,
                            };
                        }
                        return member;
                    }),
                },
            };

        case REMOVE_USER_FROM_TEAM_STREAK_LOADED:
            return {
                ...state,
                selectedTeamStreak: {
                    ...state.selectedTeamStreak,
                    possibleTeamMembers: state.selectedTeamStreak.possibleTeamMembers.map(member => {
                        if (member.userId === action.payload.userId) {
                            return {
                                ...member,
                                removeUserFromTeamStreakIsLoading: false,
                            };
                        }
                        return member;
                    }),
                },
            };

        case CLEAR_SELECTED_TEAM_STREAK: {
            return {
                ...state,
                selectedTeamStreak: defaultSelectedTeamStreak,
            };
        }

        default:
            return state;
    }
};

export { teamStreakReducer };
