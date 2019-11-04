import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    SESSION_EXPIRED,
    REGISTER_FAIL,
    CLEAR_LOG_IN_ERROR_MESSAGE,
    CLEAR_REGISTRATION_ERROR_MESSAGE,
    AuthActionTypes,
    RESEND_CODE_SUCCESS,
    RESEND_CODE_FAIL,
    CLEAR_RESEND_CODE_SUCCESS_MESSAGE,
    CLEAR_RESEND_CODE_ERROR_MESSAGE,
    VERIFY_USER_FAIL,
    CLEAR_VERIFY_USER_ERROR_MESSAGE,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE,
    UPDATE_PASSWORD_FAIL,
    CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE,
    UPDATE_PASSWORD_SUCCESS,
    CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE,
    REGISTER_IS_LOADING,
    REGISTER_IS_LOADED,
    LOGIN_IS_LOADING,
    LOGIN_IS_LOADED,
    VERIFY_USER_IS_LOADING,
    VERIFY_USER_IS_LOADED,
    FORGOT_PASSWORD_IS_LOADING,
    FORGOT_PASSWORD_IS_LOADED,
    UPDATE_PASSWORD_IS_LOADING,
    UPDATE_PASSWORD_IS_LOADED,
    PASSWORD_STORE,
    PASSWORD_CLEAR,
} from '../actions/types';

export interface AuthState {
    isAuthenticated: boolean;
    idToken: string;
    accessToken: string;
    username: string;
    refreshToken: string;
    loginErrorMessage: string;
    registerErrorMessage: string;
    idTokenExpiryTime?: number;
    password: string;
    verifyUserErrorMessage: string;
    resendCodeSuccessMessage: string;
    resendCodeErrorMessage: string;
    forgotPasswordEmailDestination: string;
    forgotPasswordErrorMessage: string;
    updatePasswordSuccessMessage: string;
    updatePasswordErrorMessage: string;
    registerIsLoading: boolean;
    loginIsLoading: boolean;
    verifyUserIsLoading: boolean;
    forgotPasswordIsLoading: boolean;
    updatePasswordIsLoading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    idToken: '',
    accessToken: '',
    username: '',
    refreshToken: '',
    loginErrorMessage: '',
    registerErrorMessage: '',
    password: '',
    verifyUserErrorMessage: '',
    resendCodeSuccessMessage: '',
    resendCodeErrorMessage: '',
    forgotPasswordEmailDestination: '',
    forgotPasswordErrorMessage: '',
    updatePasswordSuccessMessage: '',
    updatePasswordErrorMessage: '',
    registerIsLoading: false,
    loginIsLoading: false,
    verifyUserIsLoading: false,
    forgotPasswordIsLoading: false,
    updatePasswordIsLoading: false,
};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const { idToken, idTokenExpiryTime, accessToken, refreshToken, username } = action.payload;
            return {
                ...state,
                idToken,
                idTokenExpiryTime,
                accessToken,
                username,
                refreshToken,
                isAuthenticated: true,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                loginErrorMessage: action.errorMessage,
            };

        case CLEAR_LOG_IN_ERROR_MESSAGE:
            return {
                ...state,
                loginErrorMessage: '',
            };

        case REGISTER_FAIL: {
            return {
                ...state,
                registerErrorMessage: action.errorMessage,
            };
        }

        case CLEAR_REGISTRATION_ERROR_MESSAGE: {
            return {
                ...state,
                registerErrorMessage: '',
            };
        }

        case SESSION_EXPIRED:
            return {
                ...initialState,
                loginErrorMessage: 'Session expried',
            };

        case LOGOUT_SUCCESS:
            return initialState;

        case VERIFY_USER_FAIL:
            return {
                ...state,
                verifyUserErrorMessage: action.errorMessage,
            };

        case CLEAR_VERIFY_USER_ERROR_MESSAGE:
            return {
                ...state,
                verifyUserErrorMessage: '',
            };

        case RESEND_CODE_SUCCESS:
            return {
                ...state,
                resendCodeSuccessMessage: action.successMessage,
            };

        case CLEAR_RESEND_CODE_SUCCESS_MESSAGE:
            return {
                ...state,
                resendCodeSuccessMessage: '',
            };

        case RESEND_CODE_FAIL:
            return {
                ...state,
                resendCodeErrorMessage: action.errorMessage,
            };

        case CLEAR_RESEND_CODE_ERROR_MESSAGE:
            return {
                ...state,
                resendCodeErrorMessage: '',
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordEmailDestination: action.payload.forgotPasswordEmailDesitnation,
                username: action.payload.username,
            };

        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                forgotPasswordErrorMessage: action.errorMessage,
            };

        case CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE:
            return {
                ...state,
                forgotPasswordErrorMessage: '',
            };

        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                updatePasswordSuccessMessage: action.successMessage,
            };

        case CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE: {
            return {
                ...state,
                updatePasswordSuccessMessage: '',
            };
        }

        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                updatePasswordErrorMessage: action.errorMessage,
            };

        case CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE:
            return {
                ...state,
                updatePasswordErrorMessage: '',
            };

        case REGISTER_IS_LOADING:
            return {
                ...state,
                registerIsLoading: true,
            };

        case REGISTER_IS_LOADED:
            return {
                ...state,
                registerIsLoading: false,
            };

        case LOGIN_IS_LOADING:
            return {
                ...state,
                loginIsLoading: true,
            };

        case LOGIN_IS_LOADED:
            return {
                ...state,
                loginIsLoading: false,
            };

        case VERIFY_USER_IS_LOADING:
            return {
                ...state,
                verifyUserIsLoading: true,
            };

        case VERIFY_USER_IS_LOADED:
            return {
                ...state,
                verifyUserIsLoading: false,
            };

        case FORGOT_PASSWORD_IS_LOADING:
            return {
                ...state,
                forgotPasswordIsLoading: true,
            };

        case FORGOT_PASSWORD_IS_LOADED:
            return {
                ...state,
                forgotPasswordIsLoading: false,
            };

        case UPDATE_PASSWORD_IS_LOADING:
            return {
                ...state,
                updatePasswordIsLoading: true,
            };

        case UPDATE_PASSWORD_IS_LOADED:
            return {
                ...state,
                updatePasswordIsLoading: false,
            };

        case PASSWORD_STORE:
            return {
                ...state,
                password: action.password,
            };

        case PASSWORD_CLEAR:
            return {
                ...state,
                password: '',
            };

        default:
            return state;
    }
};

export { authReducer };
