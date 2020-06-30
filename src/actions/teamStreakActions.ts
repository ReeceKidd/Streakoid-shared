import { Dispatch } from 'redux';

import {
    GET_LIVE_TEAM_STREAKS,
    GET_LIVE_TEAM_STREAKS_FAIL,
    CREATE_TEAM_STREAK,
    CREATE_TEAM_STREAK_IS_LOADING,
    CREATE_TEAM_STREAK_IS_LOADED,
    CREATE_TEAM_STREAK_ERROR,
    CLEAR_CREATE_TEAM_STREAK_ERROR,
    GET_LIVE_TEAM_STREAKS_IS_LOADING,
    GET_LIVE_TEAM_STREAKS_IS_LOADED,
    EDIT_TEAM_STREAK,
    EDIT_TEAM_STREAK_LOADED,
    EDIT_TEAM_STREAK_FAIL,
    EDIT_TEAM_STREAK_LOADING,
    CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE,
    ARCHIVE_TEAM_STREAK_IS_LOADING,
    ARCHIVE_TEAM_STREAK,
    ARCHIVE_TEAM_STREAK_IS_LOADED,
    ARCHIVE_TEAM_STREAK_FAIL,
    CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE,
    NAVIGATE_TO_SPECIFIC_TEAM_STREAK,
    GET_ARCHIVED_TEAM_STREAKS_IS_LOADING,
    GET_ARCHIVED_TEAM_STREAKS_FAIL,
    GET_ARCHIVED_TEAM_STREAKS,
    GET_ARCHIVED_TEAM_STREAKS_IS_LOADED,
    RESTORE_ARCHIVED_TEAM_STREAK,
    RESTORE_ARCHIVED_TEAM_STREAK_FAIL,
    RESTORE_ARCHIVED_TEAM_STREAK_LOADED,
    RESTORE_ARCHIVED_TEAM_STREAK_LOADING,
    CLEAR_RESTORE_TEAM_STREAK_ERROR_MESSAGE,
    DELETE_ARCHIVED_TEAM_STREAK_LOADING,
    DELETE_ARCHIVED_TEAM_STREAK,
    DELETE_ARCHIVED_TEAM_STREAK_LOADED,
    DELETE_ARCHIVED_TEAM_STREAK_FAIL,
    UPDATE_TEAM_STREAK_TIMEZONE,
    UPDATE_TEAM_STREAK_TIMEZONE_FAIL,
    CLEAR_SELECTED_TEAM_STREAK,
    ADD_FOLLOWER_TO_TEAM_STREAK,
    ADD_FOLLOWER_TO_TEAM_STREAK_FAIL,
    GET_SELECTED_TEAM_STREAK,
    GET_SELECTED_TEAM_STREAK_IS_LOADING,
    GET_SELECTED_TEAM_STREAK_IS_LOADED,
    GET_SELECTED_TEAM_STREAK_FAIL,
    UPDATE_TEAM_STREAK_REMINDER_INFO_LOADING,
    UPDATE_TEAM_STREAK_REMINDER_INFO,
    UPDATE_TEAM_STREAK_REMINDER_INFO_FAIL,
    UPDATE_TEAM_STREAK_REMINDER_INFO_LOADED,
    UPDATE_CURRENT_USER,
} from './types';
import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';
import { PopulatedTeamMemberWithClientData, SelectedTeamStreak } from '../reducers/teamStreakReducer';
import { getPopulatedActivityFeedItem } from '../helpers/activityFeed/getPopulatedActivityFeedItem';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import { CustomTeamStreakReminder } from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import StreakReminderTypes from '@streakoid/streakoid-models/lib/Types/StreakReminderTypes';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

export const teamStreakActions = (streakoid: StreakoidSDK) => {
    const getLiveTeamStreaks = ({ currentUserId }: { currentUserId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_LIVE_TEAM_STREAKS_IS_LOADING });
            const teamStreaks = await streakoid.teamStreaks.getAll({
                memberId: currentUserId,
                status: StreakStatus.live,
            });
            const teamStreaksWithLoadingStates = await Promise.all(
                teamStreaks.map(async teamStreak => {
                    const members = await Promise.all(
                        teamStreak.members.map(async member => {
                            const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                                userId: member._id,
                                teamStreakId: teamStreak._id,
                            });
                            const { currentStreak, pastStreaks } = member.teamMemberStreak;
                            return {
                                ...member,
                                teamMemberStreak: {
                                    ...member.teamMemberStreak,
                                    completeTeamMemberStreakTaskIsLoading: false,
                                    completeTeamMemberStreakTaskErrorMessage: '',
                                    incompleteTeamMemberStreakTaskIsLoading: false,
                                    incompleteTeamMemberStreakTaskErrorMessage: '',
                                    longestStreak: getLongestStreak(currentStreak, pastStreaks),
                                    totalTimesTracked: totalTimesTracked.length,
                                },
                            };
                        }),
                    );
                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            );
            // Add new team streaks to team streaks order - abstract as function.
            const teamStreaksOrder = getState().users.currentUser.teamStreaksOrder;
            if (teamStreaks.length !== teamStreaksOrder.length) {
                teamStreaks.map(teamStreak => {
                    const teamStreakExistsInTeamStreaksOrder = teamStreaksOrder.find(
                        teamStreakId => teamStreakId === teamStreak._id,
                    );
                    if (!teamStreakExistsInTeamStreaksOrder) {
                        teamStreaksOrder.push(teamStreak._id);
                    }
                });
            }
            // Remove old team streaks from team streaks order - abstract as function.
            await streakoid.user.updateCurrentUser({
                updateData: {
                    teamStreaksOrder: teamStreaksOrder.filter(teamStreakId => {
                        return teamStreaks.find(teamStreak => teamStreakId === teamStreak._id);
                    }),
                },
            });
            dispatch({
                type: UPDATE_CURRENT_USER,
                payload: {
                    ...getState().users.currentUser,
                    teamStreaksOrder,
                },
            });

            dispatch({ type: GET_LIVE_TEAM_STREAKS, payload: teamStreaksWithLoadingStates });
            dispatch({ type: GET_LIVE_TEAM_STREAKS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_LIVE_TEAM_STREAKS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_LIVE_TEAM_STREAKS_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_LIVE_TEAM_STREAKS_FAIL, errorMessage: err.message });
            }
        }
    };

    const getArchivedTeamStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_IS_LOADING });
            const userId = getState().users.currentUser._id;
            const teamStreaks = await streakoid.teamStreaks.getAll({
                memberId: userId,
                status: StreakStatus.archived,
            });
            const teamStreaksWithLoadingStates = await Promise.all(
                teamStreaks.map(async teamStreak => {
                    const members = await Promise.all(
                        teamStreak.members.map(async member => {
                            const { currentStreak, pastStreaks } = member.teamMemberStreak;
                            const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                                userId: member._id,
                                teamStreakId: teamStreak._id,
                            });
                            return {
                                ...member,
                                teamMemberStreak: {
                                    ...member.teamMemberStreak,
                                    completeTeamMemberStreakTaskIsLoading: false,
                                    completeTeamMemberStreakTaskErrorMessage: '',
                                    incompleteTeamMemberStreakTaskIsLoading: false,
                                    incompleteTeamMemberStreakTaskErrorMessage: '',
                                    longestStreak: getLongestStreak(currentStreak, pastStreaks),
                                    totalTimesTracked: totalTimesTracked.length,
                                },
                            };
                        }),
                    );
                    return {
                        ...teamStreak,
                        members,
                    };
                }),
            );
            dispatch({ type: GET_ARCHIVED_TEAM_STREAKS, payload: teamStreaksWithLoadingStates });
            dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_ARCHIVED_TEAM_STREAKS_FAIL, payload: err.message });
            }
        }
    };

    const getSelectedTeamStreak = (teamStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_SELECTED_TEAM_STREAK_IS_LOADING });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
            const members = await Promise.all(
                teamStreak.members.map(async member => {
                    const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                        userId: member._id,
                        teamStreakId: teamStreak._id,
                    });
                    const { currentStreak, pastStreaks } = member.teamMemberStreak;
                    const longestStreak = getLongestStreak(currentStreak, pastStreaks);
                    return {
                        ...member,
                        teamMemberStreak: {
                            ...member.teamMemberStreak,
                            completeTeamMemberStreakTaskIsLoading: false,
                            completeTeamMemberStreakTaskErrorMessage: '',
                            incompleteTeamMemberStreakTaskIsLoading: false,
                            incompleteTeamMemberStreakTaskErrorMessage: '',
                            longestStreak,
                            totalTimesTracked: totalTimesTracked.length,
                        },
                    };
                }),
            );
            const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamStreakId,
            });
            const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(
                completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const counts: any = {};
            for (let i = 0; i < completedTeamMemberStreakTaskDates.length; i++) {
                const key = completedTeamMemberStreakTaskDates[i];
                counts[key] = counts[key] ? counts[key] + 1 : 1;
            }
            const uniqueDates = completedTeamMemberStreakTaskDates.filter(
                (item, index) => completedTeamMemberStreakTaskDates.indexOf(item) === index,
            );
            const completedTeamMemberStreakTaskDatesWithCounts = uniqueDates.map(taskDate => ({
                date: new Date(taskDate),
                count: counts[taskDate],
            }));
            const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamStreakId: teamStreak._id,
            });
            const activityFeed = await streakoid.activityFeedItems.getAll({ teamStreakId: teamStreak._id });
            const populatedActivityFeedItems: (ClientActivityFeedItemType | undefined)[] = await Promise.all(
                activityFeed.activityFeedItems.map(async activityFeedItem => {
                    return getPopulatedActivityFeedItem(streakoid, activityFeedItem);
                }),
            );
            const supportedPopulatedActivityFeedItems = populatedActivityFeedItems.filter(
                (activityFeedItem): activityFeedItem is ClientActivityFeedItemType => activityFeedItem !== undefined,
            );
            const currentUserMemberInfo = members.find(member => member._id == getState().users.currentUser._id);
            const hasCurrentUserCompletedTaskForTheDay =
                (currentUserMemberInfo && currentUserMemberInfo.teamMemberStreak.completedToday) || false;
            const currentUser = getState().users.currentUser;
            const customStreakReminder = currentUserMemberInfo
                ? currentUser.pushNotifications.customStreakReminders.find(
                      pushNotification =>
                          pushNotification.streakReminderType === StreakReminderTypes.customTeamStreakReminder &&
                          pushNotification.teamStreakId === teamStreak._id,
                  )
                : undefined;
            const customTeamStreakReminder =
                customStreakReminder &&
                customStreakReminder.streakReminderType === StreakReminderTypes.customTeamStreakReminder
                    ? customStreakReminder
                    : undefined;
            const teamStreakWithLoadingState: SelectedTeamStreak = {
                ...teamStreak,
                members,
                completedTeamMemberStreakTaskDatesWithCounts,
                longestStreak: getLongestStreak(teamStreak.currentStreak, teamStreak.pastStreaks),
                totalTimesTracked: totalTimesTracked.length,
                activityFeed: {
                    totalActivityFeedCount: activityFeed.totalCountOfActivityFeedItems,
                    activityFeedItems: supportedPopulatedActivityFeedItems,
                },
                isCurrentUserApartOfTeamStreak: Boolean(currentUserMemberInfo),
                hasCurrentUserCompletedTaskForTheDay,
                updateCustomTeamStreakReminderPushNotificationErrorMessage: '',
                updateCustomTeamStreakReminderPushNotificationIsLoading: false,
                customTeamStreakReminder,
                inviteUrl: teamStreak.inviteKey
                    ? `https://streakoid.com/${RouterCategories.teamStreaks}/${teamStreakId}?key=${teamStreak.inviteKey}`
                    : undefined,
            };
            dispatch({ type: GET_SELECTED_TEAM_STREAK, payload: teamStreakWithLoadingState });
            dispatch({ type: GET_SELECTED_TEAM_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_SELECTED_TEAM_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_SELECTED_TEAM_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: GET_SELECTED_TEAM_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const createTeamStreak = ({
        streakName,
        members,
        streakDescription,
        numberOfMinutes,
    }: {
        streakName: string;
        members: { memberId: string }[];
        streakDescription?: string;
        numberOfMinutes?: number;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: CREATE_TEAM_STREAK_IS_LOADING });
            const userId = getState().users.currentUser._id;
            members = [{ memberId: userId }, ...members];
            const teamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                streakDescription,
                numberOfMinutes,
                members,
            });
            const teamStreakMembersWithLoadingStates = await Promise.all(
                teamStreak.members.map(async member => {
                    const { currentStreak, pastStreaks } = member.teamMemberStreak;
                    const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                        userId: member._id,
                        teamStreakId: teamStreak._id,
                    });
                    return {
                        ...member,
                        teamMemberStreak: {
                            ...member.teamMemberStreak,
                            completeTeamMemberStreakTaskIsLoading: false,
                            completeTeamMemberStreakTaskErrorMessage: '',
                            incompleteTeamMemberStreakTaskIsLoading: false,
                            incompleteTeamMemberStreakTaskErrorMessage: '',
                            longestStreak: getLongestStreak(currentStreak, pastStreaks),
                            totalTimesTracked: totalTimesTracked.length,
                        },
                    };
                }),
            );
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members: teamStreakMembersWithLoadingStates,
            };
            dispatch({ type: CREATE_TEAM_STREAK, payload: teamStreakWithLoadingState });
            dispatch({ type: CREATE_TEAM_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: CREATE_TEAM_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: CREATE_TEAM_STREAK_ERROR, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: CREATE_TEAM_STREAK_ERROR, errorMessage: err.message });
            }
        }
    };

    const clearCreateTeamStreakError = (): AppActions => ({
        type: CLEAR_CREATE_TEAM_STREAK_ERROR,
    });

    const editTeamStreak = ({
        teamStreakId,
        streakName,
        streakDescription,
        numberOfMinutes,
    }: {
        teamStreakId: string;
        streakName: string;
        streakDescription?: string;
        numberOfMinutes?: number;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: EDIT_TEAM_STREAK_LOADING });
            const teamStreak = await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: {
                    streakName,
                    streakDescription,
                    numberOfMinutes,
                },
            });
            dispatch({ type: EDIT_TEAM_STREAK, payload: teamStreak });
            dispatch({ type: NAVIGATE_TO_SPECIFIC_TEAM_STREAK, payload: teamStreakId });
            dispatch({ type: EDIT_TEAM_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: EDIT_TEAM_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: EDIT_TEAM_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: EDIT_TEAM_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const clearEditTeamStreakErrorMessage = (): AppActions => ({
        type: CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE,
    });

    const archiveTeamStreak = (teamStreakId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: ARCHIVE_TEAM_STREAK_IS_LOADING });
            await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { status: StreakStatus.archived },
            });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
            const teamStreakMembersWithLoadingStates = await Promise.all(
                teamStreak.members.map(async member => {
                    const { currentStreak, pastStreaks } = member.teamMemberStreak;
                    const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                        userId: member._id,
                        teamStreakId: teamStreak._id,
                    });
                    return {
                        ...member,
                        teamMemberStreak: {
                            ...member.teamMemberStreak,
                            completeTeamMemberStreakTaskIsLoading: false,
                            completeTeamMemberStreakTaskErrorMessage: '',
                            incompleteTeamMemberStreakTaskIsLoading: false,
                            incompleteTeamMemberStreakTaskErrorMessage: '',
                            longestStreak: getLongestStreak(currentStreak, pastStreaks),
                            totalTimesTracked: totalTimesTracked.length,
                        },
                    };
                }),
            );
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members: teamStreakMembersWithLoadingStates,
            };
            dispatch({ type: ARCHIVE_TEAM_STREAK, payload: teamStreakWithLoadingState });
            dispatch({ type: ARCHIVE_TEAM_STREAK_IS_LOADED });
        } catch (err) {
            dispatch({ type: ARCHIVE_TEAM_STREAK_IS_LOADED });
            if (err.response) {
                dispatch({ type: ARCHIVE_TEAM_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: ARCHIVE_TEAM_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearArchiveTeamStreakErrorMessage = (): AppActions => ({
        type: CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE,
    });

    const restoreArchivedTeamStreak = (teamStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_LOADING });
            await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { status: StreakStatus.live },
            });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
            const teamStreakMembersWithLoadingStates = await Promise.all(
                teamStreak.members.map(async member => {
                    const { currentStreak, pastStreaks } = member.teamMemberStreak;
                    const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                        userId: member._id,
                        teamStreakId: teamStreak._id,
                    });
                    return {
                        ...member,
                        teamMemberStreak: {
                            ...member.teamMemberStreak,
                            completeTeamMemberStreakTaskIsLoading: false,
                            completeTeamMemberStreakTaskErrorMessage: '',
                            incompleteTeamMemberStreakTaskIsLoading: false,
                            incompleteTeamMemberStreakTaskErrorMessage: '',
                            longestStreak: getLongestStreak(currentStreak, pastStreaks),
                            totalTimesTracked: totalTimesTracked.length,
                        },
                    };
                }),
            );
            const teamStreakWithLoadingState = {
                ...teamStreak,
                members: teamStreakMembersWithLoadingStates,
                activityFeed: {
                    totalActivityFeedCount: 0,
                    activityFeedItems: [],
                },
            };
            dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK, payload: teamStreakWithLoadingState });
            dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: RESTORE_ARCHIVED_TEAM_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const clearRestoreArchivedTeamStreakErrorMessage = (): AppActions => ({
        type: CLEAR_RESTORE_TEAM_STREAK_ERROR_MESSAGE,
    });

    const deleteArchivedTeamStreak = (teamStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_LOADING });
            await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { status: StreakStatus.deleted },
            });
            dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK, payload: teamStreakId });
            dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: DELETE_ARCHIVED_TEAM_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const updateTeamStreakTimezone = ({ teamStreakId, timezone }: { teamStreakId: string; timezone: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            await streakoid.teamStreaks.update({
                teamStreakId,
                updateData: { timezone },
            });
            const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);
            const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({ teamStreakId });
            await Promise.all(
                teamMemberStreaks.map(teamMemberStreak => {
                    return streakoid.teamMemberStreaks.update({
                        teamMemberStreakId: teamMemberStreak._id,
                        updateData: { timezone },
                    });
                }),
            );
            const teamStreakMembersWithLoadingStates = await Promise.all(
                teamStreak.members.map(async member => {
                    const { currentStreak, pastStreaks } = member.teamMemberStreak;
                    const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                        userId: member._id,
                        teamStreakId: teamStreak._id,
                    });
                    return {
                        ...member,
                        teamMemberStreak: {
                            ...member.teamMemberStreak,
                            completeTeamMemberStreakTaskIsLoading: false,
                            completeTeamMemberStreakTaskErrorMessage: '',
                            incompleteTeamMemberStreakTaskIsLoading: false,
                            incompleteTeamMemberStreakTaskErrorMessage: '',
                            longestStreak: getLongestStreak(currentStreak, pastStreaks),
                            totalTimesTracked: totalTimesTracked.length,
                        },
                    };
                }),
            );
            const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamStreakId,
            });
            const completedTeamMemberStreakTaskDates = completeTeamMemberStreakTasks.map(
                completeTask => new Date(completeTask.createdAt).toISOString().split('T')[0],
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const counts: any = {};
            for (let i = 0; i < completedTeamMemberStreakTaskDates.length; i++) {
                const key = completedTeamMemberStreakTaskDates[i];
                counts[key] = counts[key] ? counts[key] + 1 : 1;
            }
            const uniqueDates = completedTeamMemberStreakTaskDates.filter(
                (item, index) => completedTeamMemberStreakTaskDates.indexOf(item) === index,
            );
            const completedTeamMemberStreakTaskDatesWithCounts = uniqueDates.map(taskDate => ({
                date: new Date(taskDate),
                count: counts[taskDate],
            }));
            const totalTimesTracked = await streakoid.completeTeamMemberStreakTasks.getAll({
                teamStreakId: teamStreak._id,
            });
            const currentUserMemberInfo = teamStreak.members.find(
                member => member._id == getState().users.currentUser._id,
            );
            const hasCurrentUserCompletedTaskForTheDay =
                (currentUserMemberInfo && currentUserMemberInfo.teamMemberStreak.completedToday) || false;
            const teamStreakWithLoadingState: SelectedTeamStreak = {
                ...teamStreak,
                members: teamStreakMembersWithLoadingStates,
                completedTeamMemberStreakTaskDatesWithCounts,
                longestStreak: getLongestStreak(teamStreak.currentStreak, teamStreak.pastStreaks),
                totalTimesTracked: totalTimesTracked.length,
                activityFeed: {
                    totalActivityFeedCount: 0,
                    activityFeedItems: [],
                },
                isCurrentUserApartOfTeamStreak: Boolean(currentUserMemberInfo),
                hasCurrentUserCompletedTaskForTheDay,
                updateCustomTeamStreakReminderPushNotificationIsLoading: false,
                updateCustomTeamStreakReminderPushNotificationErrorMessage: '',
                inviteUrl: teamStreak.inviteKey
                    ? `https://streakoid.com/${RouterCategories.teamStreaks}/${teamStreakId}?key=${teamStreak.inviteKey}`
                    : undefined,
            };
            dispatch({ type: UPDATE_TEAM_STREAK_TIMEZONE, payload: teamStreakWithLoadingState });
        } catch (err) {
            if (err.response) {
                dispatch({ type: UPDATE_TEAM_STREAK_TIMEZONE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: UPDATE_TEAM_STREAK_TIMEZONE_FAIL, payload: err.message });
            }
        }
    };

    const clearSelectedTeamStreak = (): AppActions => ({
        type: CLEAR_SELECTED_TEAM_STREAK,
    });

    const addFollowerToTeamStreak = ({
        followerId,
        teamStreakId,
    }: {
        followerId: string;
        teamStreakId: string;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const teamMember = await streakoid.teamStreaks.teamMembers.create({ followerId, teamStreakId });
            const teamMemberInfo = await streakoid.users.getOne(teamMember.memberId);
            const teamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMember.teamMemberStreakId);
            const populatedTeamMemberWithClientData: PopulatedTeamMemberWithClientData = {
                ...teamMember,
                _id: teamMember.memberId,
                username: teamMemberInfo.username,
                profileImage: teamMemberInfo.profileImages.originalImageUrl,
                teamMemberStreak: {
                    ...teamMemberStreak,
                    completeTeamMemberStreakTaskIsLoading: false,
                    completeTeamMemberStreakTaskErrorMessage: '',
                    incompleteTeamMemberStreakTaskIsLoading: false,
                    incompleteTeamMemberStreakTaskErrorMessage: '',
                    longestStreak: 0,
                    totalTimesTracked: 0,
                },
            };
            dispatch({ type: ADD_FOLLOWER_TO_TEAM_STREAK, payload: populatedTeamMemberWithClientData });
        } catch (err) {
            if (err.response) {
                dispatch({ type: ADD_FOLLOWER_TO_TEAM_STREAK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: ADD_FOLLOWER_TO_TEAM_STREAK_FAIL, errorMessage: err.message });
            }
        }
    };

    const updateCustomTeamStreakReminderPushNotification = ({
        customTeamStreakReminder,
    }: {
        customTeamStreakReminder: CustomTeamStreakReminder;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: UPDATE_TEAM_STREAK_REMINDER_INFO_LOADING });

            dispatch({
                type: UPDATE_TEAM_STREAK_REMINDER_INFO,
                payload: { customTeamStreakReminder },
            });

            dispatch({ type: UPDATE_TEAM_STREAK_REMINDER_INFO_LOADED });
        } catch (err) {
            dispatch({ type: UPDATE_TEAM_STREAK_REMINDER_INFO_LOADED });
            if (err.response) {
                dispatch({
                    type: UPDATE_TEAM_STREAK_REMINDER_INFO_FAIL,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: UPDATE_TEAM_STREAK_REMINDER_INFO_FAIL,
                    payload: err.message,
                });
            }
        }
    };

    return {
        getLiveTeamStreaks,
        getArchivedTeamStreaks,
        getSelectedTeamStreak,
        createTeamStreak,
        clearCreateTeamStreakError,
        editTeamStreak,
        clearEditTeamStreakErrorMessage,
        archiveTeamStreak,
        clearArchiveTeamStreakErrorMessage,
        restoreArchivedTeamStreak,
        clearRestoreArchivedTeamStreakErrorMessage,
        deleteArchivedTeamStreak,
        updateTeamStreakTimezone,
        clearSelectedTeamStreak,
        addFollowerToTeamStreak,
        updateCustomTeamStreakReminderPushNotification,
    };
};
