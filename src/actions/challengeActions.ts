import { Dispatch } from 'redux';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

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
    NAVIGATE_TO_STREAK_LIMIT_REACHED,
    UPDATE_SELECTED_CHALLENGE_IS_LOADING,
    UPDATE_SELECTED_CHALLENGE_IS_LOADED,
    UPDATE_SELECTED_CHALLENGE_FAIL,
    UPDATE_SELECTED_CHALLENGE,
} from './types';
import { AppActions, AppState } from '..';
import { StreakStatus } from '@streakoid/streakoid-sdk/lib';
import { ChallengeMemberWithClientData, PopulatedChallengeWithClientData } from '../reducers/challengesReducer';
import { getLongestStreak } from '../helpers/streakCalculations/getLongestStreak';
import { getAverageStreak } from '../helpers/streakCalculations/getAverageStreak';

export enum GetChallengeSortFields {
    currentStreak = 'currentStreak',
    longestStreak = 'longestStreak',
}

export enum GetChallengeSortOrder {
    ascending = 'ascending',
    descending = 'descending',
}

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

    const getChallenge = ({
        challengeId,
        sort,
    }: {
        challengeId: string;
        sort: { sortField: GetChallengeSortFields; sortOrder: GetChallengeSortOrder };
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: GET_SELECTED_CHALLENGE_IS_LOADING });
            const currentUserId = getState().users.currentUser._id;
            const challenge = await streakoid.challenges.getOne({ challengeId });
            const challengeMembers = await Promise.all(
                challenge.members.map(async member => {
                    const user = await streakoid.users.getOne(member.userId);
                    const userChallengeStreaks = await streakoid.challengeStreaks.getAll({
                        userId: user._id,
                        challengeId: challengeId,
                    });
                    const userChallengeStreak = userChallengeStreaks[0];
                    const totalTimesTracked = await streakoid.completeChallengeStreakTasks.getAll({
                        challengeStreakId: userChallengeStreak._id,
                    });
                    const challengeMember: ChallengeMemberWithClientData = {
                        username: user.username,
                        userId: user._id,
                        profileImage: user.profileImages.originalImageUrl,
                        currentStreak: userChallengeStreak.currentStreak,
                        longestStreak: getLongestStreak(
                            userChallengeStreak.currentStreak,
                            userChallengeStreak.pastStreaks,
                        ),
                        averageStreak: getAverageStreak(
                            userChallengeStreak.currentStreak,
                            userChallengeStreak.pastStreaks,
                        ),
                        totalTimesTracked: totalTimesTracked.length,
                        challengeStreakId: userChallengeStreak._id,
                        joinedChallenge: new Date(userChallengeStreak.createdAt),
                    };
                    return challengeMember;
                }),
            );
            const sortedChallengeMembers = challengeMembers.sort((challengeMemberA, challengeMemberB) => {
                if (sort.sortField === GetChallengeSortFields.currentStreak) {
                    if (sort.sortOrder === GetChallengeSortOrder.ascending) {
                        return (
                            challengeMemberA.currentStreak.numberOfDaysInARow -
                            challengeMemberB.currentStreak.numberOfDaysInARow
                        );
                    } else {
                        return (
                            challengeMemberB.currentStreak.numberOfDaysInARow -
                            challengeMemberA.currentStreak.numberOfDaysInARow
                        );
                    }
                } else if (sort.sortField === GetChallengeSortFields.longestStreak) {
                    if (sort.sortOrder === GetChallengeSortOrder.ascending) {
                        return challengeMemberA.longestStreak - challengeMemberB.longestStreak;
                    } else {
                        return challengeMemberB.longestStreak - challengeMemberA.longestStreak;
                    }
                } else return 0;
            });
            const challengeStreaks = await streakoid.challengeStreaks.getAll({ challengeId });
            let totalTimesTracked = 0;
            await Promise.all(
                challengeStreaks.map(async challengeStreak => {
                    const timesTracked = await streakoid.completeChallengeStreakTasks.getAll({
                        challengeStreakId: challengeStreak._id,
                    });
                    totalTimesTracked += timesTracked.length;
                }),
            );
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
            let totalNumberOfStreaks = 0;
            challengeStreaks.map(challengeStreak => {
                challengeStreak.pastStreaks.map(pastStreak => (totalStreaksSum += pastStreak.numberOfDaysInARow));
                totalStreaksSum += challengeStreak.currentStreak.numberOfDaysInARow;
                // Plus one for the current length.
                totalNumberOfStreaks += challengeStreak.pastStreaks.length + 1;
            });
            const averageStreakForChallenge = totalNumberOfStreaks / totalStreaksSum;
            const userChallengeStreaks = await streakoid.challengeStreaks.getAll({ userId: currentUserId });
            const userIsApartOfChallenge = userChallengeStreaks.find(
                challengeStreak => String(challengeStreak.challengeId) === String(challenge._id),
            );
            const populatedChallenge: PopulatedChallengeWithClientData = {
                ...challenge,
                userIsApartOfChallenge: userIsApartOfChallenge ? true : false,
                members: sortedChallengeMembers,
                longestCurrentStreakForChallenge,
                longestEverStreakForChallenge,
                averageStreakForChallenge: isFinite(averageStreakForChallenge) ? averageStreakForChallenge : 0,
                totalTimesTracked,
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
            const isPayingMember = getState().users.currentUser.membershipInformation.isPayingMember;
            if (!isPayingMember) {
                const userChallengeStreaks = await streakoid.challengeStreaks.getAll({
                    userId,
                    status: StreakStatus.live,
                });
                const challengeLimitForFreeAccounts = 2;
                if (userChallengeStreaks.length >= challengeLimitForFreeAccounts) {
                    dispatch({ type: NAVIGATE_TO_STREAK_LIMIT_REACHED });
                    dispatch({ type: JOIN_CHALLENGE_LOADED });
                    return;
                }
            }
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
                completedChallengeStreakTaskDates: [],
                username: currentUser.username,
                userProfileImage: currentUser.profileImages.originalImageUrl,
                longestStreak: 0,
                averageStreak: 0,
                totalTimesTracked: 0,
                daysSinceStreakCreation: 0,
                numberOfRestarts: 0,
            };
            dispatch({ type: UPDATE_SELECTED_CHALLENGE_IS_LOADING });
            dispatch({
                type: UPDATE_SELECTED_CHALLENGE,
                payload: { ...getState().challenges.selectedChallenge, userIsApartOfChallenge: true },
            });
            dispatch({ type: UPDATE_SELECTED_CHALLENGE_IS_LOADED });
            dispatch({ type: CREATE_CHALLENGE_STREAK, payload: challengeStreakWithLoadingState });
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
