import { Dispatch } from 'redux';
import StreakStatus from '@streakoid/streakoid-sdk/lib/StreakStatus';

import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import {
    GET_CHALLENGE_STREAKS_LOADING,
    GET_CHALLENGE_STREAKS_LOADED,
    GET_CHALLENGE_STREAKS,
    GET_CHALLENGE_STREAKS_FAIL,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED,
    CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED,
    CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL,
    GET_ONE_CHALLENGE_STREAK_LOADED,
    GET_ONE_CHALLENGE_STREAK,
    GET_ONE_CHALLENGE_STREAK_LOADING,
    GET_ONE_CHALLENGE_STREAK_FAIL,
} from './types';

const challengeStreakActions = (streakoid: typeof streakoidSDK) => {
    const getChallengeStreaks = ({ completedToday }: { completedToday: boolean }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGE_STREAKS_LOADING });
            const userId = getState().users.currentUser._id;
            const challengeStreaks = await streakoid.challengeStreaks.getAll({
                userId,
                status: StreakStatus.live,
                completedToday,
            });
            const challengeStreaksWithLoadingStates = await Promise.all(
                challengeStreaks.map(async challengeStreak => {
                    const challenge = await streakoid.challenges.getOne({ challengeId: challengeStreak.challengeId });
                    return {
                        ...challengeStreak,
                        challengeName: challenge.name,
                        challengeDescription: challenge.description,
                        joinChallengeStreakTaskIsLoading: false,
                        joinChallengeStreakTaskErrorMessage: '',
                        completeChallengeStreakTaskIsLoading: false,
                        completeChallengeStreakTaskErrorMessage: '',
                        incompleteChallengeStreakTaskIsLoading: false,
                        incompleteChallengeStreakTaskErrorMessage: '',
                    };
                }),
            );
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

    const getOneChallengeStreak = ({ challengeStreakId }: { challengeStreakId: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_ONE_CHALLENGE_STREAK_LOADING });
            const challengeStreak = await streakoid.challengeStreaks.getOne({ challengeStreakId });
            const challenge = await streakoid.challenges.getOne({ challengeId: challengeStreak.challengeId });
            const challengeStreakWithLoadingStates = {
                ...challengeStreak,
                challengeName: challenge.name,
                challengeDescription: challenge.description,
                joinChallengeStreakTaskIsLoading: false,
                joinChallengeStreakTaskErrorMessage: '',
                completeChallengeStreakTaskIsLoading: false,
                completeChallengeStreakTaskErrorMessage: '',
                incompleteChallengeStreakTaskIsLoading: false,
                incompleteChallengeStreakTaskErrorMessage: '',
            };
            dispatch({ type: GET_ONE_CHALLENGE_STREAK, payload: challengeStreakWithLoadingStates });
            dispatch({ type: GET_ONE_CHALLENGE_STREAK_LOADED });
        } catch (err) {
            dispatch({ type: GET_ONE_CHALLENGE_STREAK_LOADED });
            if (err.response) {
                dispatch({ type: GET_ONE_CHALLENGE_STREAK_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_ONE_CHALLENGE_STREAK_FAIL, payload: err.message });
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
        getOneChallengeStreak,
        completeChallengeStreakTask,
        incompleteChallengeStreakTask,
    };
};

export { challengeStreakActions };
