import { Dispatch } from 'react';
import Amplify, { Auth } from 'aws-amplify';

import {
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_LOG_IN_ERROR_MESSAGE,
    CLEAR_REGISTRATION_ERROR_MESSAGE,
    UPDATE_CURRENT_USER,
    REGISTER_IS_LOADING,
    REGISTER_IS_LOADED,
    LOGIN_IS_LOADED,
    LOGIN_IS_LOADING,
    VERIFY_USER_IS_LOADING,
    VERIFY_USER_IS_LOADED,
    VERIFY_USER_FAIL,
    PASSWORD_STORE,
    PASSWORD_CLEAR,
    RESEND_CODE_SUCCESS,
    RESEND_CODE_FAIL,
    CLEAR_RESEND_CODE_ERROR_MESSAGE,
    CLEAR_RESEND_CODE_SUCCESS_MESSAGE,
    CLEAR_VERIFY_USER_ERROR_MESSAGE,
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
    NAVIGATE_TO_VERIFY_USER,
    NAVIGATE_TO_LOGIN,
    NAVIGATE_TO_UPDATE_PASSWORD,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';
import CognitoPayload from '../cognitoPayload';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: 'eu-west-1',
        userPoolId: 'eu-west-1_jzNG2ske9',
        userPoolWebClientId: '68agp8bcm9bidhh4p97rj1ke1g',
    },
});

const authActions = (streakoid: typeof streakoidSDK, streakoidRegistration: typeof streakoidSDK) => {
    const loginUser = ({ emailOrUsername, password }: { emailOrUsername: string; password: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: LOGIN_IS_LOADING });

            const cognitoUser = await Auth.signIn(emailOrUsername.toLowerCase(), password);
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

            const users = await streakoid.users.getAll({ username: cognitoUser.username });
            const user = users[0];

            dispatch({ type: UPDATE_CURRENT_USER, user });
            dispatch({ type: NAVIGATE_TO_HOME });
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

    const registerUser = ({
        username,
        email,
        password,
    }: {
        username: string;
        email: string;
        password: string;
    }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: REGISTER_IS_LOADING });
            const lowercaseUsername = username.toLowerCase();
            await Auth.signUp({ username: lowercaseUsername, password, attributes: { email } });
            const user = await streakoidRegistration.users.create({ username: lowercaseUsername, email });
            dispatch({ type: UPDATE_CURRENT_USER, user });
            dispatch({ type: PASSWORD_STORE, password });
            dispatch({ type: REGISTER_IS_LOADED });
            dispatch({ type: NAVIGATE_TO_VERIFY_USER });
        } catch (err) {
            dispatch({ type: REGISTER_IS_LOADED });
            if (err.response) {
                dispatch({ type: REGISTER_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: REGISTER_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearRegisterErrorMessage = (): AppActions => ({
        type: CLEAR_REGISTRATION_ERROR_MESSAGE,
    });

    const verifyUser = (verificationCode: string) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: VERIFY_USER_IS_LOADING });
            let { username } = getState().users.currentUser;
            const { password } = getState().auth;

            await Auth.confirmSignUp(username, verificationCode, {
                forceAliasCreation: true,
            });
            if (password) {
                username = username.toLowerCase();
                const cognitoUser = await Auth.signIn(username, password);
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
                    username,
                };

                dispatch({ type: LOGIN_SUCCESS, payload: cognitoPayload });
                const users = await streakoid.users.getAll({ username });
                const user = users[0];

                dispatch({ type: UPDATE_CURRENT_USER, user });
                dispatch({ type: NAVIGATE_TO_HOME });

                dispatch({ type: PASSWORD_CLEAR });
            } else {
                dispatch({ type: NAVIGATE_TO_LOGIN });
            }
            dispatch({ type: VERIFY_USER_IS_LOADED });
        } catch (err) {
            dispatch({ type: VERIFY_USER_IS_LOADED });
            if (err.response) {
                dispatch({ type: VERIFY_USER_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: VERIFY_USER_FAIL, errorMessage: err.message });
            }
        }
    };

    const clearVerifyUserErrorMessage = (): AppActions => ({
        type: CLEAR_VERIFY_USER_ERROR_MESSAGE,
    });

    const resendCode = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            const { username, email } = getState().users.currentUser;
            const successMessage = `Code was resent to: ${email}`;
            await Auth.resendSignUp(username);
            dispatch({ type: RESEND_CODE_SUCCESS, successMessage });
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
            const { CodeDeliveryDetails } = await Auth.forgotPassword(emailOrUsername.toLowerCase());
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
            await Auth.forgotPasswordSubmit(emailOrUsername, code, newPassword);
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
        registerUser,
        clearRegisterErrorMessage,
        verifyUser,
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

export { authActions };