import { Dispatch } from 'redux';
import StreakStatus from '@streakoid/streakoid-sdk/lib/StreakStatus';

import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import {
    GET_CHALLENGE_STREAKS_LOADING,
    GET_CHALLENGE_STREAKS_LOADED,
    GET_CHALLENGE_STREAKS,
    GET_CHALLENGE_STREAKS_FAIL,
    JOIN_CHALLENGE_STREAK,
    JOIN_CHALLENGE_STREAK_LOADING,
    JOIN_CHALLENGE_STREAK_LOADED,
    JOIN_CHALLENGE_STREAK_FAIL,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL,
} from './types';

const challengeStreakActions = (streakoid: typeof streakoidSDK) => {
    const getChallengeStreaks = () => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGE_STREAKS_LOADING });
            const userId = getState().users.currentUser._id;
            const challengeStreaks = await streakoid.challengeStreaks.getAll({ userId, status: StreakStatus.live });
            const challengeStreaksWithLoadingStates = challengeStreaks.map(challengeStreak => {
                return {
                    ...challengeStreak,
                    joinChallengeStreakTaskIsLoading: false,
                    joinChallengeStreakTaskErrorMessage: '',
                    completeChallengeStreakTaskIsLoading: false,
                    completeChallengeStreakTaskErrorMessage: '',
                    incompleteChallengeStreakTaskIsLoading: false,
                    incompleteChallengeStreakTaskErrorMessage: '',
                };
            });
            dispatch({ type: GET_CHALLENGE_STREAKS, payload: challengeStreaksWithLoadingStates });
            dispatch({ type: GET_CHALLENGE_STREAKS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CHALLENGE_STREAKS_LOADED });
            if (err.response) {
                dispatch({ type: GET_CHALLENGE_STREAKS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_CHALLENGE_STREAKS_FAIL, payload: err.message });
            }
        }
    };

    const joinChallengeStreak = ({ challengeId }: { challengeId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: JOIN_CHALLENGE_STREAK_LOADING, payload: challengeId });
            const userId = getState().users.currentUser._id;
            const challengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });
            const challengeStreakWithLoadingState = {
                ...challengeStreak,
                joinChallengeStreakTaskIsLoading: false,
                joinChallengeStreakTaskErrorMessage: '',
                completeChallengeStreakTaskIsLoading: false,
                completeChallengeStreakTaskErrorMessage: '',
                incompleteChallengeStreakTaskIsLoading: false,
                incompleteChallengeStreakTaskErrorMessage: '',
            };
            dispatch({ type: JOIN_CHALLENGE_STREAK_LOADED, payload: challengeId });
            dispatch({ type: JOIN_CHALLENGE_STREAK, payload: challengeStreakWithLoadingState });
        } catch (err) {
            dispatch({ type: JOIN_CHALLENGE_STREAK_LOADED, payload: challengeId });
            if (err.response) {
                dispatch({ type: JOIN_CHALLENGE_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: JOIN_CHALLENGE_STREAK_FAIL, payload: err.message });
            }
        }
    };

    const completeChallengeStreakTask = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING, challengeStreakId });
            const userId = getState().users.currentUser._id;
            const completeChallengeStreakTask = await streakoid.completeChallengeStreakTasks.create({
                challengeStreakId,
                userId,
            });
            dispatch({
                type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK,
                payload: completeChallengeStreakTask.challengeStreakId,
            });
            dispatch({ type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED, challengeStreakId });
        } catch (err) {
            dispatch({ type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED, challengeStreakId });
            if (err.response) {
                dispatch({
                    type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.message },
                });
            }
        }
    };

    const incompleteChallengeStreakTask = (challengeStreakId: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING, challengeStreakId });
            const userId = getState().users.currentUser._id;
            await streakoid.incompleteChallengeStreakTasks.create({ userId, challengeStreakId });
            dispatch({
                type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK,
                payload: challengeStreakId,
            });
            dispatch({ type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED, challengeStreakId });
        } catch (err) {
            dispatch({ type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED, challengeStreakId });
            if (err.response) {
                dispatch({
                    type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.response.data.message },
                });
            } else {
                dispatch({
                    type: CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL,
                    payload: { challengeStreakId, errorMessage: err.message },
                });
            }
        }
    };

    return {
        getChallengeStreaks,
        joinChallengeStreak,
        completeChallengeStreakTask,
        incompleteChallengeStreakTask,
    };
};

export { challengeStreakActions };
