import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    SESSION_EXPIRED,
    CLEAR_LOG_IN_ERROR_MESSAGE,
    CLEAR_REGISTRATION_ERROR_MESSAGE,
    AuthActionTypes,
    RESEND_CODE_SUCCESS,
    RESEND_CODE_FAIL,
    CLEAR_RESEND_CODE_SUCCESS_MESSAGE,
    CLEAR_RESEND_CODE_ERROR_MESSAGE,
    VERIFY_EMAIL_FAIL,
    CLEAR_VERIFY_EMAIL_ERROR_MESSAGE,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE,
    UPDATE_PASSWORD_FAIL,
    CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE,
    UPDATE_PASSWORD_SUCCESS,
    CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE,
    REGISTER_FAIL,
    REGISTER_IS_LOADING,
    REGISTER_IS_LOADED,
    LOGIN_IS_LOADING,
    LOGIN_IS_LOADED,
    VERIFY_EMAIL_IS_LOADING,
    VERIFY_EMAIL_IS_LOADED,
    FORGOT_PASSWORD_IS_LOADING,
    FORGOT_PASSWORD_IS_LOADED,
    UPDATE_PASSWORD_IS_LOADING,
    UPDATE_PASSWORD_IS_LOADED,
    PASSWORD_STORE,
    PASSWORD_CLEAR,
    REFRESH_TOKEN,
    REFRESH_TOKEN_FAIL,
    REGISTER_WITH_IDENTIFIER_USER_FAIL,
    REGISTER_WITH_IDENTIFIER_USER_IS_LOADING,
    REGISTER_WITH_IDENTIFIER_USER_IS_LOADED,
    UPDATE_USER_EMAIL_ATTRIBUTE_FAIL,
    UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADING,
    UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADED,
} from '../actions/types';

export interface AuthState {
    isAuthenticated: boolean;
    idToken: string;
    accessToken: string;
    refreshToken: string;
    loginErrorMessage: string;
    loginIsLoading: boolean;
    registerErrorMessage: string;
    registerIsLoading: boolean;
    registerWithIdentifierUserErrorMessage: string;
    registerWithIdentifierUserIsLoading: boolean;
    idTokenExpiryTime?: number;
    password: string;
    refreshTokenErrorMessage: string;
    verifyEmailErrorMessage: string;
    resendCodeSuccessMessage: string;
    resendCodeErrorMessage: string;
    forgotPasswordEmailDestination: string;
    forgotPasswordErrorMessage: string;
    updatePasswordSuccessMessage: string;
    updatePasswordErrorMessage: string;
    verifyEmailIsLoading: boolean;
    forgotPasswordIsLoading: boolean;
    updatePasswordIsLoading: boolean;
    username: string;
    updateEmailAttributeIsLoading: boolean;
    updateEmailAttributeErrorMessage: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    idToken: '',
    accessToken: '',
    username: '',
    refreshToken: '',
    loginErrorMessage: '',
    loginIsLoading: false,
    registerErrorMessage: '',
    registerIsLoading: false,
    registerWithIdentifierUserErrorMessage: '',
    registerWithIdentifierUserIsLoading: false,
    password: '',
    refreshTokenErrorMessage: '',
    verifyEmailErrorMessage: '',
    resendCodeSuccessMessage: '',
    resendCodeErrorMessage: '',
    forgotPasswordEmailDestination: '',
    forgotPasswordErrorMessage: '',
    updatePasswordSuccessMessage: '',
    updatePasswordErrorMessage: '',
    verifyEmailIsLoading: false,
    forgotPasswordIsLoading: false,
    updatePasswordIsLoading: false,
    updateEmailAttributeIsLoading: false,
    updateEmailAttributeErrorMessage: '',
};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                idToken: action.payload.idToken,
                idTokenExpiryTime: action.payload.idTokenExpiryTime,
                accessToken: action.payload.accessToken,
                username: action.payload.username,
                refreshToken: action.payload.refreshToken,
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

        case REFRESH_TOKEN: {
            return {
                ...state,
                idToken: action.payload.idToken,
                idTokenExpiryTime: action.payload.idTokenExpiryTime,
                accessToken: action.payload.accessToken,
                username: action.payload.username,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
            };
        }

        case REFRESH_TOKEN_FAIL: {
            return {
                ...state,
                refreshTokenErrorMessage: action.payload,
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

        case VERIFY_EMAIL_FAIL:
            return {
                ...state,
                verifyEmailErrorMessage: action.errorMessage,
            };

        case VERIFY_EMAIL_IS_LOADING:
            return {
                ...state,
                verifyEmailIsLoading: true,
            };

        case VERIFY_EMAIL_IS_LOADED:
            return {
                ...state,
                verifyEmailIsLoading: false,
            };

        case CLEAR_VERIFY_EMAIL_ERROR_MESSAGE:
            return {
                ...state,
                verifyEmailErrorMessage: '',
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

        case REGISTER_FAIL: {
            return {
                ...state,
                registerErrorMessage: action.errorMessage,
            };
        }

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

        case REGISTER_WITH_IDENTIFIER_USER_FAIL: {
            return {
                ...state,
                registerWithIdentifierUserErrorMessage: action.errorMessage,
            };
        }

        case REGISTER_WITH_IDENTIFIER_USER_IS_LOADING:
            return {
                ...state,
                registerWithIdentifierUserIsLoading: true,
            };

        case REGISTER_WITH_IDENTIFIER_USER_IS_LOADED:
            return {
                ...state,
                registerWithIdentifierUserIsLoading: false,
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

        case UPDATE_USER_EMAIL_ATTRIBUTE_FAIL:
            return {
                ...state,
                updateEmailAttributeErrorMessage: action.payload.errorMessage,
            };

        case UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADING:
            return {
                ...state,
                updateEmailAttributeIsLoading: true,
            };

        case UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADED:
            return {
                ...state,
                updateEmailAttributeIsLoading: false,
            };

        default:
            return state;
    }
};

export { authReducer };
