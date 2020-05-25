import { Dispatch } from 'redux';

import {
    SEND_CONTACT_US_EMAIL_LOADED,
    SEND_CONTACT_US_EMAIL_FAIL,
    SEND_CONTACT_US_EMAIL_LOADING,
    CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES,
    SEND_CONTACT_US_EMAIL,
    SEND_CANCEL_MEMBERSHIP_EMAIL,
    SEND_CANCEL_MEMBERSHIP_EMAIL_LOADING,
    SEND_CANCEL_MEMBERSHIP_EMAIL_LOADED,
    SEND_CANCEL_MEMBERSHIP_EMAIL_FAIL,
    CLEAR_SEND_CANCEL_MEMBERSHIP_EMAIL_MESSAGES,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

const emailActions = (streakoid: typeof streakoidSDK) => {
    const sendContactUsEmail = ({ name, email, message }: { name: string; email: string; message: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: SEND_CONTACT_US_EMAIL_LOADING });
            const subject = 'Contact Us';
            const { _id, username } = getState().users.currentUser;
            await streakoid.emails.create({ name, email, subject, message, userId: _id, username });
            dispatch({ type: SEND_CONTACT_US_EMAIL, payload: 'Message sent' });
            dispatch({ type: SEND_CONTACT_US_EMAIL_LOADED });
        } catch (err) {
            dispatch({ type: SEND_CONTACT_US_EMAIL_LOADED });
            if (err.response) {
                dispatch({ type: SEND_CONTACT_US_EMAIL_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: SEND_CONTACT_US_EMAIL_FAIL, payload: err.message });
            }
        }
    };

    const clearSendContactUsEmailMessages = (): AppActions => ({
        type: CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES,
    });

    const sendCancelMembershipEmail = ({ name, message }: { name: string; message: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: SEND_CANCEL_MEMBERSHIP_EMAIL_LOADING });
            const subject = 'Cancel membership';
            const { _id, username, email } = getState().users.currentUser;
            if (email) {
                await streakoid.emails.create({ name, email, subject, message, userId: _id, username });
                dispatch({ type: SEND_CANCEL_MEMBERSHIP_EMAIL, payload: 'Message sent' });
            }
            dispatch({ type: SEND_CANCEL_MEMBERSHIP_EMAIL_LOADED });
        } catch (err) {
            dispatch({ type: SEND_CANCEL_MEMBERSHIP_EMAIL_LOADED });
            if (err.response) {
                dispatch({ type: SEND_CANCEL_MEMBERSHIP_EMAIL_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: SEND_CANCEL_MEMBERSHIP_EMAIL_FAIL, payload: err.message });
            }
        }
    };

    const clearSendCancelMembershipEmailMessages = (): AppActions => ({
        type: CLEAR_SEND_CANCEL_MEMBERSHIP_EMAIL_MESSAGES,
    });

    return {
        sendContactUsEmail,
        clearSendContactUsEmailMessages,
        sendCancelMembershipEmail,
        clearSendCancelMembershipEmailMessages,
    };
};

export { emailActions };
