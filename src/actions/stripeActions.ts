import { Token } from 'react-stripe-checkout';
import { Dispatch } from 'redux';
import {
    CREATE_STRIPE_SUBSCRIPTION,
    CREATE_STRIPE_SUBSCRIPTION_FAIL,
    CLEAR_STRIPE_SUBSCRIPTION_ERROR_MESSAGE,
    CREATE_STRIPE_SUBSCRIPTION_LOADING,
    CREATE_STRIPE_SUBSCRIPTION_LOADED,
    NAVIGATE_TO_THANK_YOU,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import PaymentPlans from '@streakoid/streakoid-models/lib/Types/PaymentPlans';

const stripeActions = (streakoid: typeof streakoidSDK) => {
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

    return {
        createStripeSubscription,
        clearCreateStripeSubscriptionErrorMessage,
    };
};

export { stripeActions };
