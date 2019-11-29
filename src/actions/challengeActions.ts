import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

import {
    GET_CHALLENGES,
    GET_CHALLENGES_FAIL,
    GET_CHALLENGES_IS_LOADING,
    GET_CHALLENGES_IS_LOADED,
    GET_CHALLENGE_IS_LOADING,
    GET_CHALLENGE,
    GET_CHALLENGE_IS_LOADED,
    GET_CHALLENGE_FAIL,
    JOIN_CHALLENGE_LOADING,
    JOIN_CHALLENGE_LOADED,
    JOIN_CHALLENGE,
    JOIN_CHALLENGE_FAIL,
    CREATE_CHALLENGE_STREAK,
} from './types';
import { AppActions, AppState } from '..';
import { ChallengeMember, PopulatedChallenge } from '@streakoid/streakoid-sdk/lib';

const challengeActions = (streakoid: typeof streakoidSDK) => {
    const getChallenges = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGES_IS_LOADING });
            const challenges = await streakoid.challenges.getAll({});
            dispatch({ type: GET_CHALLENGES, payload: challenges });
            dispatch({ type: GET_CHALLENGES_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CHALLENGES_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_CHALLENGES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_CHALLENGES_FAIL, payload: err.message });
            }
        }
    };

    const getChallenge = ({ challengeId }: { challengeId: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGE_IS_LOADING });
            const challenge = await streakoid.challenges.getOne({ challengeId });
            const challengeMembers = await Promise.all(
                challenge.members.map(async member => {
                    const user = await streakoid.users.getOne(member.userId);
                    const challengeMember: ChallengeMember = {
                        username: user.username,
                        userId: user._id,
                        profileImage: user.profileImages.originalImageUrl,
                    };
                    return challengeMember;
                }),
            );
            const populatedChallenge: PopulatedChallenge = {
                ...challenge,
                members: challengeMembers,
            };
            dispatch({ type: GET_CHALLENGE, payload: populatedChallenge });
            dispatch({ type: GET_CHALLENGE_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CHALLENGES_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_CHALLENGE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_CHALLENGE_FAIL, payload: err.message });
            }
        }
    };

    const joinChallenge = ({ challengeId }: { challengeId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: JOIN_CHALLENGE_LOADING });
            const userId = getState().users.currentUser._id;
            const challengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });
            const challenge = await streakoid.challenges.getOne({ challengeId });
            const challengeStreakWithLoadingState = {
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
            dispatch({ type: CREATE_CHALLENGE_STREAK, payload: challengeStreakWithLoadingState });
            dispatch({ type: JOIN_CHALLENGE_LOADED });
            dispatch({ type: JOIN_CHALLENGE, payload: challengeStreakWithLoadingState });
        } catch (err) {
            dispatch({ type: JOIN_CHALLENGE_LOADED });
            if (err.response) {
                dispatch({ type: JOIN_CHALLENGE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: JOIN_CHALLENGE_FAIL, payload: err.message });
            }
        }
    };

    return {
        getChallenges,
        getChallenge,
        joinChallenge,
    };
};

export { challengeActions };
