import { Dispatch } from 'redux';

import { CREATE_FEEDBACK, CREATE_FEEDBACK_FAIL, CLEAR_FEEDBACK } from './types';
import { AppActions } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

const feedbackActions = (streakoid: typeof streakoidSDK) => {
    const submitFeedback = (
        userId: string,
        pageUrl: string,
        username: string,
        userEmail: string,
        feedbackText: string,
    ) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const feedback = await streakoid.feedbacks.create({ userId, pageUrl, username, userEmail, feedbackText });
            dispatch({ type: CREATE_FEEDBACK, payload: feedback });
        } catch (err) {
            if (err.response) {
                dispatch({ type: CREATE_FEEDBACK_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: CREATE_FEEDBACK_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearFeedback = (): AppActions => ({
        type: CLEAR_FEEDBACK,
    });

    return {
        submitFeedback,
        clearFeedback,
    };
};

export { feedbackActions };
