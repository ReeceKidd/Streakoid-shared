import { Token } from 'react-stripe-checkout';
import { Dispatch } from 'redux';
import {
    CREATE_STRIPE_SUBSCRIPTION,
    CREATE_STRIPE_SUBSCRIPTION_FAIL,
    CLEAR_STRIPE_SUBSCRIPTION_ERROR_MESSAGE,
    CREATE_STRIPE_SUBSCRIPTION_LOADING,
    CREATE_STRIPE_SUBSCRIPTION_LOADED,
    NAVIGATE_TO_THANK_YOU,
    CREATE_STRIPE_PORTAL_SESSION,
    CREATE_STRIPE_PORTAL_SESSION_LOADING,
    CREATE_STRIPE_PORTAL_SESSION_LOADED,
    CREATE_STRIPE_PORTAL_SESSION_FAIL,
    CLEAR_STRIPE_PORTAL_SESSION_URL,
} from './types';
import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import PaymentPlans from '@streakoid/streakoid-models/lib/Types/PaymentPlans';

const stripeActions = (streakoid: StreakoidSDK) => {
    const createStripeSubscription = ({ token, paymentPlan }: { token: Token; paymentPlan: PaymentPlans }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_STRIPE_SUBSCRIPTION_LOADING });
            const userId = getState().users.currentUser._id;
            const user = await streakoid.stripe.createSubscription({ token, userId, paymentPlan });
            dispatch({ type: CREATE_STRIPE_SUBSCRIPTION, payload: user });
            dispatch({ type: NAVIGATE_TO_THANK_YOU });
            dispatch({ type: CREATE_STRIPE_SUBSCRIPTION_LOADED });
        } catch (err) {
            dispatch({ type: CREATE_STRIPE_SUBSCRIPTION_LOADED });
            if (err.response) {
                dispatch({ type: CREATE_STRIPE_SUBSCRIPTION_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: CREATE_STRIPE_SUBSCRIPTION_FAIL, payload: err.message });
            }
        }
    };

    const clearCreateStripeSubscriptionErrorMessage = (): AppActions => ({
        type: CLEAR_STRIPE_SUBSCRIPTION_ERROR_MESSAGE,
    });

    const createStripePortalSession = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: CREATE_STRIPE_PORTAL_SESSION_LOADING });

            const { url } = await streakoid.stripe.createPortalSession();
            dispatch({ type: CREATE_STRIPE_PORTAL_SESSION, payload: { url } });

            dispatch({ type: CREATE_STRIPE_PORTAL_SESSION_LOADED });
        } catch (err) {
            dispatch({ type: CREATE_STRIPE_PORTAL_SESSION_LOADED });
            if (err.response) {
                dispatch({ type: CREATE_STRIPE_PORTAL_SESSION_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: CREATE_STRIPE_PORTAL_SESSION_FAIL, payload: err.message });
            }
        }
    };

    const clearStripePortalSessionUrl = (): AppActions => ({
        type: CLEAR_STRIPE_PORTAL_SESSION_URL,
    });

    return {
        createStripeSubscription,
        clearCreateStripeSubscriptionErrorMessage,
        createStripePortalSession,
        clearStripePortalSessionUrl,
    };
};

export { stripeActions };
