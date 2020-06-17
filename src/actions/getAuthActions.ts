/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import Amplify, { AuthClass } from 'aws-amplify';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_LOG_IN_ERROR_MESSAGE,
    CLEAR_REGISTRATION_ERROR_MESSAGE,
    LOGIN_IS_LOADED,
    LOGIN_IS_LOADING,
    VERIFY_EMAIL_IS_LOADING,
    VERIFY_EMAIL_IS_LOADED,
    VERIFY_EMAIL_FAIL,
    RESEND_CODE_SUCCESS,
    RESEND_CODE_FAIL,
    CLEAR_RESEND_CODE_ERROR_MESSAGE,
    CLEAR_RESEND_CODE_SUCCESS_MESSAGE,
    CLEAR_VERIFY_EMAIL_ERROR_MESSAGE,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_IS_LOADING,
    FORGOT_PASSWORD_IS_LOADED,
    CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE,
    UPDATE_PASSWORD_IS_LOADING,
    UPDATE_PASSWORD_IS_LOADED,
    CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE,
    NAVIGATE_TO_HOME,
    NAVIGATE_TO_LOGIN,
    NAVIGATE_TO_UPDATE_PASSWORD,
    NAVIGATE_TO_VERIFY_EMAIL,
    REFRESH_TOKEN,
    REFRESH_TOKEN_FAIL,
    REGISTER_WITH_IDENTIFIER_USER_IS_LOADING,
    REGISTER_WITH_IDENTIFIER_USER_IS_LOADED,
    REGISTER_WITH_IDENTIFIER_USER_FAIL,
    UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADING,
    UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADED,
    UPDATE_USER_EMAIL_ATTRIBUTE_FAIL,
    UPDATE_USER_PASSWORD_IS_LOADING,
    UPDATE_USER_PASSWORD_IS_LOADED,
    UPDATE_USER_PASSWORD_FAIL,
    UPDATE_USERNAME_ATTRIBUTE_FAIL,
    UPDATE_USERNAME_ATTRIBUTE_IS_LOADED,
    UPDATE_USERNAME_ATTRIBUTE_IS_LOADING,
    NAVIGATE_TO_CHOOSE_PASSWORD,
    CLEAR_UPDATE_USER_EMAIL_ATTRIBUTE_ERROR_MESSAGE,
    NAVIGATE_TO_COMPLETED_REGISTRATION,
    UPDATE_CURRENT_USER,
    NAVIGATE_TO_CHOOSE_A_PROFILE_PICTURE,
    CLEAR_UPDATE_USERNAME_ATTRIBUTE_ERROR_MESSAGE,
} from './types';
import { AppActions, AppState } from '..';
import CognitoPayload from '../cognitoPayload';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { PopulatedCurrentUserWithClientData } from '../reducers/userReducer';
import UserTypes from '@streakoid/streakoid-models/lib/Types/UserTypes';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: 'eu-west-1',
        userPoolId: 'eu-west-1_jzNG2ske9',
        userPoolWebClientId: '68agp8bcm9bidhh4p97rj1ke1g',
    },
});

const getAuthActions = ({
    unauthenticatedStreakoid,
    authenticatedStreakoid,
    auth,
}: {
    unauthenticatedStreakoid: StreakoidSDK;
    authenticatedStreakoid: StreakoidSDK;
    auth: AuthClass;
}) => {
    const loginUser = ({
        emailOrCognitoUsername,
        password,
        redirectToHomeOnLogin,
    }: {
        emailOrCognitoUsername: string;
        password: string;
        redirectToHomeOnLogin: boolean;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: LOGIN_IS_LOADING });

            const cognitoUser = await auth.signIn(emailOrCognitoUsername.toLowerCase(), password);
            const { idToken, refreshToken, accessToken } = cognitoUser.signInUserSession;
            const idTokenJwt = idToken.jwtToken;
            const idTokenExpiryTime = idToken.payload.exp;
            const refreshTokenJwt = refreshToken.token;
            const accessTokenJwt = accessToken.jwtToken;
            const cognitoPayload: CognitoPayload = {
                idToken: idTokenJwt,
                idTokenExpiryTime,
                refreshToken: refreshTokenJwt,
                accessToken: accessTokenJwt,
                username: cognitoUser.username,
            };

            dispatch({ type: LOGIN_SUCCESS, payload: cognitoPayload });

            const user = await authenticatedStreakoid.user.getCurrentUser();
            const followingWithClientData = user.following.map(following => ({
                ...following,
                followUserIsLoading: false,
                followUserErrorMessage: '',
                unfollowUserIsLoading: false,
                unfollowUserErrorMessage: '',
            }));
            const followersWithClientData = user.followers.map(follower => ({
                ...follower,
                isSelected: false,
            }));
            dispatch({
                type: UPDATE_CURRENT_USER,
                payload: {
                    ...user,
                    following: followingWithClientData,
                    followers: followersWithClientData,
                    userStreakCompleteInfo: [],
                    activityFeed: {
                        totalActivityFeedCount: 0,
                        activityFeedItems: [],
                    },
                    updatePushNotificationsErrorMessage: '',
                    updatePushNotificationsIsLoading: false,
                },
            });
            if (redirectToHomeOnLogin) {
                dispatch({ type: NAVIGATE_TO_HOME });
            }

            dispatch({ type: LOGIN_IS_LOADED });
        } catch (err) {
            dispatch({ type: LOGIN_IS_LOADED });
            if (err.response) {
                dispatch({ type: LOGIN_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: LOGIN_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearLoginErrorMessage = (): AppActions => ({ type: CLEAR_LOG_IN_ERROR_MESSAGE });

    const refreshToken = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            const session = await auth.currentSession();
            const cognitoPayload: CognitoPayload = {
                idToken: session.getIdToken().getJwtToken(),
                idTokenExpiryTime: session.getIdToken().getExpiration(),
                accessToken: session.getAccessToken().getJwtToken(),
                refreshToken: session.getRefreshToken().getToken(),
                username: getState().users.currentUser.username,
            };
            dispatch({ type: REFRESH_TOKEN, payload: cognitoPayload });
        } catch (err) {
            if (err.response) {
                dispatch({ type: REFRESH_TOKEN_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: REFRESH_TOKEN_FAIL, payload: err.message });
            }
        }
    };

    const registerWithUserIdentifier = ({ userIdentifier }: { userIdentifier: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: REGISTER_WITH_IDENTIFIER_USER_IS_LOADING });
            const user = await unauthenticatedStreakoid.users.createWithIdentifier({ userIdentifier });
            dispatch({
                type: UPDATE_CURRENT_USER,
                payload: {
                    ...user,
                    following: [],
                    followers: [],
                    userStreakCompleteInfo: [],
                    activityFeed: {
                        totalActivityFeedCount: 0,
                        activityFeedItems: [],
                    },
                    updatePushNotificationsErrorMessage: '',
                    updatePushNotificationsIsLoading: false,
                },
            });
            dispatch({ type: REGISTER_WITH_IDENTIFIER_USER_IS_LOADED });
        } catch (err) {
            dispatch({ type: REGISTER_WITH_IDENTIFIER_USER_IS_LOADED });
            if (err.response) {
                dispatch({ type: REGISTER_WITH_IDENTIFIER_USER_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: REGISTER_WITH_IDENTIFIER_USER_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearRegisterErrorMessage = (): AppActions => ({
        type: CLEAR_REGISTRATION_ERROR_MESSAGE,
    });

    const updateUserPassword = ({ newPassword, oldPassword }: { newPassword: string; oldPassword: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE });
            dispatch({ type: UPDATE_USER_PASSWORD_IS_LOADING });
            const currentUser = await auth.currentAuthenticatedUser();
            await auth.changePassword(currentUser, oldPassword, newPassword);
            await authenticatedStreakoid.user.updateCurrentUser({ updateData: { userType: UserTypes.basic } });
            const populatedCurrentUserWithClientData: PopulatedCurrentUserWithClientData = {
                ...getState().users.currentUser,
                userType: UserTypes.basic,
            };
            dispatch({ type: UPDATE_CURRENT_USER, payload: populatedCurrentUserWithClientData });
            dispatch({ type: UPDATE_USER_PASSWORD_IS_LOADED });
            dispatch({ type: NAVIGATE_TO_COMPLETED_REGISTRATION });
        } catch (err) {
            dispatch({ type: UPDATE_USER_PASSWORD_IS_LOADED });
            if (err.response) {
                dispatch({
                    type: UPDATE_USER_PASSWORD_FAIL,
                    payload: { errorMessage: err.response.data.message },
                });
            } else {
                dispatch({ type: UPDATE_USER_PASSWORD_FAIL, payload: { errorMessage: err.message } });
            }
        }
    };

    const clearUpdateUserPasswordErrorMessage = (): AppActions => ({
        type: CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE,
    });

    const updateUsernameAttribute = ({
        username,
        navigateToChooseAProfilePicture,
    }: {
        username: string;
        navigateToChooseAProfilePicture: boolean;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: CLEAR_UPDATE_USERNAME_ATTRIBUTE_ERROR_MESSAGE });
            dispatch({ type: UPDATE_USERNAME_ATTRIBUTE_IS_LOADING });
            if (username !== getState().users.currentUser.username) {
                const currentUser = await auth.currentAuthenticatedUser();
                await authenticatedStreakoid.user.updateCurrentUser({
                    updateData: { username, hasUsernameBeenCustomized: true },
                });
                const populatedCurrentUserWithClientData: PopulatedCurrentUserWithClientData = {
                    ...getState().users.currentUser,
                    username,
                    hasUsernameBeenCustomized: true,
                };
                dispatch({ type: UPDATE_CURRENT_USER, payload: populatedCurrentUserWithClientData });
                // eslint-disable-next-line @typescript-eslint/camelcase
                await auth.updateUserAttributes(currentUser, { preferred_username: username });
            } else {
                await authenticatedStreakoid.user.updateCurrentUser({
                    updateData: { hasUsernameBeenCustomized: true },
                });
                const populatedCurrentUserWithClientData: PopulatedCurrentUserWithClientData = {
                    ...getState().users.currentUser,
                    hasUsernameBeenCustomized: true,
                };
                dispatch({ type: UPDATE_CURRENT_USER, payload: populatedCurrentUserWithClientData });
            }
            dispatch({ type: UPDATE_USERNAME_ATTRIBUTE_IS_LOADED });
            if (navigateToChooseAProfilePicture) {
                dispatch({ type: NAVIGATE_TO_CHOOSE_A_PROFILE_PICTURE });
            }
        } catch (err) {
            dispatch({ type: UPDATE_USERNAME_ATTRIBUTE_IS_LOADED });
            if (err.response) {
                dispatch({
                    type: UPDATE_USERNAME_ATTRIBUTE_FAIL,
                    payload: { errorMessage: err.response.data.message },
                });
            } else {
                dispatch({ type: UPDATE_USERNAME_ATTRIBUTE_FAIL, payload: { errorMessage: err.message } });
            }
        }
    };

    const clearUpdateUsernameAttributeErrorMessage = (): AppActions => ({
        type: CLEAR_UPDATE_USERNAME_ATTRIBUTE_ERROR_MESSAGE,
    });

    const updateUserEmailAttribute = ({ email }: { email: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CLEAR_UPDATE_USER_EMAIL_ATTRIBUTE_ERROR_MESSAGE });
            dispatch({ type: UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADING });
            const currentUser = await auth.currentAuthenticatedUser();
            if (email !== getState().users.currentUser.email) {
                await auth.updateUserAttributes(currentUser, { email });
                await authenticatedStreakoid.user.updateCurrentUser({ updateData: { email } });
                const populatedCurrentUserWithClientData: PopulatedCurrentUserWithClientData = {
                    ...getState().users.currentUser,
                    email,
                };
                dispatch({ type: UPDATE_CURRENT_USER, payload: populatedCurrentUserWithClientData });
            } else {
                await auth.resendSignUp(getState().users.currentUser.cognitoUsername);
            }
            dispatch({ type: UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADED });
            dispatch({ type: NAVIGATE_TO_VERIFY_EMAIL });
        } catch (err) {
            dispatch({ type: UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADED });
            if (err.response) {
                dispatch({
                    type: UPDATE_USER_EMAIL_ATTRIBUTE_FAIL,
                    payload: { errorMessage: err.response.data.message },
                });
            } else {
                dispatch({ type: UPDATE_USER_EMAIL_ATTRIBUTE_FAIL, payload: { errorMessage: err.message } });
            }
        }
    };

    const clearUpdateUserEmailAttribueErrorMessage = (): AppActions => ({
        type: CLEAR_UPDATE_USER_EMAIL_ATTRIBUTE_ERROR_MESSAGE,
    });

    const verifyEmail = ({
        verificationCode,
        navigateToChoosePassword,
    }: {
        verificationCode: string;
        navigateToChoosePassword: boolean;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: CLEAR_VERIFY_EMAIL_ERROR_MESSAGE });
            dispatch({ type: VERIFY_EMAIL_IS_LOADING });
            await auth.verifyCurrentUserAttributeSubmit('email', verificationCode);
            dispatch({ type: VERIFY_EMAIL_IS_LOADED });
            if (navigateToChoosePassword) {
                dispatch({ type: NAVIGATE_TO_CHOOSE_PASSWORD });
            }
        } catch (err) {
            dispatch({ type: VERIFY_EMAIL_IS_LOADED });
            if (err.response) {
                dispatch({ type: VERIFY_EMAIL_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: VERIFY_EMAIL_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearVerifyUserErrorMessage = (): AppActions => ({
        type: CLEAR_VERIFY_EMAIL_ERROR_MESSAGE,
    });

    const resendCode = ({ email }: { email: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            const { username } = getState().users.currentUser;
            const successMessage = `Code was resent to: ${email}`;
            if (username) {
                await auth.resendSignUp(username);
                dispatch({ type: RESEND_CODE_SUCCESS, successMessage });
            }
        } catch (err) {
            if (err.response) {
                dispatch({ type: RESEND_CODE_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: RESEND_CODE_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearResendCodeSuccessMessage = (): AppActions => ({
        type: CLEAR_RESEND_CODE_SUCCESS_MESSAGE,
    });

    const clearResendCodeErrorMessage = (): AppActions => ({
        type: CLEAR_RESEND_CODE_ERROR_MESSAGE,
    });

    const forgotPassword = (emailOrUsername: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: FORGOT_PASSWORD_IS_LOADING });
            const { CodeDeliveryDetails } = await auth.forgotPassword(emailOrUsername.toLowerCase());
            const { Destination } = CodeDeliveryDetails;
            const payload = { forgotPasswordEmailDesitnation: Destination, username: emailOrUsername };
            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload });
            dispatch({ type: NAVIGATE_TO_UPDATE_PASSWORD });
            dispatch({ type: FORGOT_PASSWORD_IS_LOADED });
        } catch (err) {
            dispatch({ type: FORGOT_PASSWORD_IS_LOADED });
            if (err.response) {
                dispatch({ type: FORGOT_PASSWORD_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: FORGOT_PASSWORD_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearForgotPasswordErrorMessage = (): AppActions => ({
        type: CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE,
    });

    const updatePassword = (emailOrUsername: string, code: string, newPassword: string) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: UPDATE_PASSWORD_IS_LOADING });
            await auth.forgotPasswordSubmit(emailOrUsername, code, newPassword);
            dispatch({ type: UPDATE_PASSWORD_SUCCESS, successMessage: 'Updated password' });
            dispatch({ type: NAVIGATE_TO_LOGIN });
            dispatch({ type: UPDATE_PASSWORD_IS_LOADED });
        } catch (err) {
            dispatch({ type: UPDATE_PASSWORD_IS_LOADED });
            if (err.response) {
                dispatch({ type: UPDATE_PASSWORD_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: UPDATE_PASSWORD_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearUpdatePasswordSuccessMessage = (): AppActions => ({
        type: CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE,
    });

    const clearUpdatePasswordErrorMessage = (): AppActions => ({
        type: CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE,
    });

    const logoutUser = (): AppActions => {
        return { type: LOGOUT_SUCCESS };
    };

    return {
        loginUser,
        clearLoginErrorMessage,
        refreshToken,
        registerWithUserIdentifier,
        clearRegisterErrorMessage,
        updateUserPassword,
        clearUpdateUserPasswordErrorMessage,
        updateUsernameAttribute,
        clearUpdateUsernameAttributeErrorMessage,
        updateUserEmailAttribute,
        clearUpdateUserEmailAttribueErrorMessage,
        verifyEmail,
        clearVerifyUserErrorMessage,
        resendCode,
        clearResendCodeSuccessMessage,
        clearResendCodeErrorMessage,
        forgotPassword,
        clearForgotPasswordErrorMessage,
        updatePassword,
        clearUpdatePasswordSuccessMessage,
        clearUpdatePasswordErrorMessage,
        logoutUser,
    };
};

export { getAuthActions };
