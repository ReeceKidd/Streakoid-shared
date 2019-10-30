import { CREATE_FEEDBACK, CREATE_FEEDBACK_FAIL, CLEAR_FEEDBACK, FeedbackActionTypes } from '../actions/types';

export interface FeedbackState {
    successMessage: string;
    errorMessage: string;
}

const initialState: FeedbackState = {
    successMessage: '',
    errorMessage: '',
};

const feedbackReducer = (state: FeedbackState = initialState, action: FeedbackActionTypes): FeedbackState => {
    switch (action.type) {
        case CREATE_FEEDBACK:
            return {
                ...initialState,
                successMessage: 'Feedback submitted, thank you!',
            };

        case CREATE_FEEDBACK_FAIL:
            return {
                ...initialState,
                errorMessage: action.errorMessage,
            };

        case CLEAR_FEEDBACK:
            return initialState;

        default:
            return state;
    }
};

export { feedbackReducer };
