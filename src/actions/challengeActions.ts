import { Dispatch } from 'redux';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';

import {
    GET_CHALLENGES,
    GET_CHALLENGES_FAIL,
    GET_CHALLENGES_IS_LOADING,
    GET_CHALLENGES_IS_LOADED,
    GET_SELECTED_CHALLENGE_IS_LOADING,
    GET_SELECTED_CHALLENGE,
    GET_SELECTED_CHALLENGE_IS_LOADED,
    GET_SELECTED_CHALLENGE_FAIL,
    JOIN_CHALLENGE_LOADING,
    JOIN_CHALLENGE_LOADED,
    JOIN_CHALLENGE_FAIL,
    CREATE_CHALLENGE_STREAK,
    UPDATE_SELECTED_CHALLENGE_IS_LOADING,
    UPDATE_SELECTED_CHALLENGE_IS_LOADED,
    UPDATE_SELECTED_CHALLENGE_FAIL,
    UPDATE_SELECTED_CHALLENGE,
} from './types';
import { AppActions, AppState } from '..';
import { ChallengeMemberWithClientData, SelectedChallenge } from '../reducers/challengesReducer';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';
import { ChallengeStreakListItem } from '../reducers/challengeStreakReducer';
import { ChallengeMember } from '@streakoid/streakoid-models/lib/Models/ChallengeMember';
import { PopulatedChallenge } from '@streakoid/streakoid-models/lib/Models/PopulatedChallenge';

export enum GetChallengeSortFields {
    currentStreak = 'currentStreak',
    longestStreak = 'longestStreak',
}

export enum GetChallengeSortOrder {
    ascending = 'ascending',
    descending = 'descending',
}

const challengeActions = (streakoid: StreakoidSDK) => {
    // Helper functions
    const getSortedChallengeMembers = async (challengeId: string, challengeMembers: ChallengeMember[]) => {
        const populatedChallengeMembers = await Promise.all(
            challengeMembers.map(async member => {
                const user = await streakoid.users.getOne(member.userId);
                const userChallengeStreaks = await streakoid.challengeStreaks.getAll({
                    userId: user._id,
                    challengeId: challengeId,
                });
                const userChallengeStreak = userChallengeStreaks[0];

                const challengeMember: ChallengeMemberWithClientData = {
                    username: user.username,
                    userId: user._id,
                    profileImage: user.profileImages.originalImageUrl,
                    currentStreak: userChallengeStreak.currentStreak,
                    longestStreak: getLongestStreak(userChallengeStreak.currentStreak, userChallengeStreak.pastStreaks),
                    totalTimesTracked: userChallengeStreak.totalTimesTracked,
                    challengeStreakId: userChallengeStreak._id,
                    joinedChallenge: new Date(userChallengeStreak.createdAt),
                };
                return challengeMember;
            }),
        );
        const sortedChallengeMembers = populatedChallengeMembers.sort((challengeMemberA, challengeMemberB) => {
            return challengeMemberB.totalTimesTracked - challengeMemberA.totalTimesTracked;
        });
        return sortedChallengeMembers;
    };

    const getPopulatedChallengeStats = async (challenge: PopulatedChallenge) => {
        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            challengeId: challenge._id,
        });
        let totalTimesTracked = 0;

        challengeStreaks.map(challengeStreak => {
            totalTimesTracked += challengeStreak.totalTimesTracked;
        });

        const currentStreaks = challengeStreaks.map(
            challengeStreak => challengeStreak.currentStreak.numberOfDaysInARow,
        );
        const longestPastStreakLengths = challengeStreaks.map(challengeStreak => {
            const pastStreakLengths = challengeStreak.pastStreaks.map(pastStreak => pastStreak.numberOfDaysInARow);
            const longestPastStreakNumberOfDays = Math.max(...pastStreakLengths);
            return longestPastStreakNumberOfDays;
        });
        const longestPastStreakForChallenge = Math.max(...longestPastStreakLengths);
        const longestCurrentStreakForChallenge = currentStreaks.length === 0 ? 0 : Math.max(...currentStreaks);
        const longestEverStreakForChallenge =
            longestPastStreakForChallenge >= longestCurrentStreakForChallenge
                ? longestPastStreakForChallenge
                : longestCurrentStreakForChallenge;
        let totalStreaksSum = 0;
        challengeStreaks.map(challengeStreak => {
            challengeStreak.pastStreaks.map(pastStreak => (totalStreaksSum += pastStreak.numberOfDaysInARow));
            totalStreaksSum += challengeStreak.currentStreak.numberOfDaysInARow;
        });
        return {
            totalTimesTracked,
            longestCurrentStreakForChallenge,
            longestEverStreakForChallenge,
        };
    };

    const getChallenges = ({ searchQuery, limit }: { searchQuery?: string; limit?: number }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_CHALLENGES_IS_LOADING });
            const query: { searchQuery?: string; limit?: number } = {};
            if (searchQuery) {
                query.searchQuery = searchQuery;
            }
            if (limit) {
                query.limit = limit;
            }
            const challenges = await streakoid.challenges.getAll(query);
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
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_SELECTED_CHALLENGE_IS_LOADING });
            const currentUserId = getState().users.currentUser._id;
            const challenge = await streakoid.challenges.getOne({ challengeId });
            const sortedChallengeMembers = await getSortedChallengeMembers(challenge._id, challenge.members);
            const userChallengeStreaks = await streakoid.challengeStreaks.getAll({ userId: currentUserId });
            const userIsApartOfChallenge = userChallengeStreaks.find(
                challengeStreak => String(challengeStreak.challengeId) === String(challenge._id),
            );
            const {
                longestCurrentStreakForChallenge,
                longestEverStreakForChallenge,
                totalTimesTracked,
            } = await getPopulatedChallengeStats(challenge);
            const populatedChallenge: SelectedChallenge = {
                ...challenge,
                userIsApartOfChallenge: Boolean(userIsApartOfChallenge),
                members: sortedChallengeMembers,
                longestCurrentStreakForChallenge,
                longestEverStreakForChallenge,
                totalTimesTracked,
                usersChallengeStreakId: userIsApartOfChallenge ? userIsApartOfChallenge._id : '',
            };
            dispatch({ type: GET_SELECTED_CHALLENGE, payload: populatedChallenge });
            dispatch({ type: GET_SELECTED_CHALLENGE_IS_LOADED });
        } catch (err) {
            dispatch({ type: GET_CHALLENGES_IS_LOADED });
            if (err.response) {
                dispatch({ type: GET_SELECTED_CHALLENGE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_SELECTED_CHALLENGE_FAIL, payload: err.message });
            }
        }
    };

    const joinChallenge = ({ challengeId }: { challengeId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: JOIN_CHALLENGE_LOADING });
            const currentUser = getState().users.currentUser;
            const userId = currentUser._id;
            const challengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });
            const challenge = await streakoid.challenges.getOne({ challengeId });
            const challengeStreakListItem: ChallengeStreakListItem = {
                ...challengeStreak,
                completeChallengeStreakListTaskIsLoading: false,
                completeChallengeStreakListTaskErrorMessage: '',
                incompleteChallengeStreakListTaskIsLoading: false,
                incompleteChallengeStreakListTaskErrorMessage: '',
                recoverChallengeStreakIsLoading: false,
                recoverChallengeStreakErrorMessage: '',
            };
            dispatch({ type: CREATE_CHALLENGE_STREAK, payload: challengeStreakListItem });
            dispatch({ type: UPDATE_SELECTED_CHALLENGE_IS_LOADING });
            const sortedChallengeMembers = await getSortedChallengeMembers(challenge._id, challenge.members);
            const {
                longestCurrentStreakForChallenge,
                longestEverStreakForChallenge,
                totalTimesTracked,
            } = await getPopulatedChallengeStats(challenge);
            const updatedSelectedChallenge: SelectedChallenge = {
                ...getState().challenges.selectedChallenge,
                userIsApartOfChallenge: true,
                members: sortedChallengeMembers,
                longestCurrentStreakForChallenge,
                longestEverStreakForChallenge,
                totalTimesTracked,
            };
            dispatch({
                type: UPDATE_SELECTED_CHALLENGE,
                payload: updatedSelectedChallenge,
            });
            dispatch({ type: UPDATE_SELECTED_CHALLENGE_IS_LOADED });

            dispatch({ type: JOIN_CHALLENGE_LOADED });
        } catch (err) {
            dispatch({ type: JOIN_CHALLENGE_LOADED });
            dispatch({ type: UPDATE_SELECTED_CHALLENGE_IS_LOADED });
            if (err.response) {
                dispatch({ type: JOIN_CHALLENGE_FAIL, payload: err.response.data.message });
                dispatch({ type: UPDATE_SELECTED_CHALLENGE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: JOIN_CHALLENGE_FAIL, payload: err.message });
                dispatch({ type: UPDATE_SELECTED_CHALLENGE_FAIL, payload: err.response.data.message });
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
