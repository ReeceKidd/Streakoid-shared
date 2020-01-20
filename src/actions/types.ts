import {
    PopulatedFriendRequest,
    SoloStreak,
    TeamStreak,
    ProfileImages,
    FormattedUser,
    Badge,
    Challenge,
    PopulatedChallenge,
    Note,
} from '@streakoid/streakoid-sdk/lib';
import { PopulatedTeamStreakWithLoadingStates, PopulatedTeamStreakWithTaskDates } from '../reducers/teamStreakReducer';
import {
    LiveSoloStreakWithClientData,
    ArchivedSoloStreakWithClientData,
    SoloStreakWithTaskCompletedDates,
} from '../reducers/soloStreakReducer';
import { FriendRequestStateWithClientData } from '../reducers/friendRequestReducer';
import { UserWithClientData, SelectedUser, PopulatedCurrentUserWithStreakCompleteInfo } from '../reducers/userReducer';
import { FriendStateWithClientData } from '../reducers/friendReducer';
import CognitoPayload from '../cognitoPayload';
import { StreakRecommendationWithClientData } from '../reducers/streakRecommendationsReducer';
import { ChallengeStreakWithClientData } from '../reducers/challengeStreakReducer';
import { UserBadge } from '../reducers/badgesReducer';

export const NAVIGATE_TO_HOME = 'NAVIGATE_TO_HOME';
export const NAVIGATE_TO_VERIFY_USER = 'NAVIGATE_TO_VERIFY_USER';
export const NAVIGATE_TO_LOGIN = 'NAVIGATE_TO_LOGIN';
export const NAVIGATE_TO_UPDATE_PASSWORD = 'NAVIGATE_TO_UPDATE_PASSWORD';
export const NAVIGATE_TO_SOLO_STREAKS = 'NAVIGATE_TO_SOLO_STREAKS';
export const NAVIGATE_TO_SPECIFIC_SOLO_STREAK = 'NAVIGATE_TO_SPECIFIC_SOLO_STREAK';
export const NAVIGATE_TO_THANK_YOU = 'NAVIGATE_TO_THANK_YOU';
export const NAVIGATE_TO_TEAM_STREAKS = 'NAVIGATE_TO_TEAM_STREAKS';
export const NAVIGATE_TO_SPECIFIC_TEAM_STREAK = 'NAVIGATE_TO_SPECIFIC_TEAM_STREAK';
export const NAVIGATE_TO_CHALLENGE_STREAKS = 'NAVIGATE_TO_CHALLENGE_STREAKS';
export const NAVIGATE_TO_SPECIFIC_CHALLENGE_STREAK = 'NAVIGATE_TO_SPECIFIC_CHALLENGE_STREAK';
export const NAVIGATE_TO_PAYMENT = 'NAVIGATE_TO_PAYMENT';
export const NAVIGATE_TO_STREAK_LIMIT_REACHED = 'NAVIGATE_TO_STREAK_LIMIT_REACHED';
export const NAVIGATE_TO_WELCOME = 'NAVIGATE_TO_WELCOME';

export interface NavigateToHomeAction {
    type: typeof NAVIGATE_TO_HOME;
}

export interface NavigateToVerifyUserAction {
    type: typeof NAVIGATE_TO_VERIFY_USER;
}

export interface NavigateToLoginAction {
    type: typeof NAVIGATE_TO_LOGIN;
}

export interface NavigateToUpdatePasswordAction {
    type: typeof NAVIGATE_TO_UPDATE_PASSWORD;
}

export interface NavigateToSoloStreaksAction {
    type: typeof NAVIGATE_TO_SOLO_STREAKS;
}

export interface NavigateToSpecificSoloStreakAction {
    type: typeof NAVIGATE_TO_SPECIFIC_SOLO_STREAK;
    payload: string;
}

export interface NavigateToThankYouAction {
    type: typeof NAVIGATE_TO_THANK_YOU;
}

export interface NavigateToTeamStreakAction {
    type: typeof NAVIGATE_TO_TEAM_STREAKS;
}

export interface NavigateToSpecificTeamStreakAction {
    type: typeof NAVIGATE_TO_SPECIFIC_TEAM_STREAK;
    payload: string;
}

export interface NavigateToPaymentAction {
    type: typeof NAVIGATE_TO_PAYMENT;
}

export interface NavigateToWelcomeAction {
    type: typeof NAVIGATE_TO_WELCOME;
}

export interface NavigateToStreakLimitReachedAction {
    type: typeof NAVIGATE_TO_STREAK_LIMIT_REACHED;
}

export interface NavigateToChallengeStreakAction {
    type: typeof NAVIGATE_TO_CHALLENGE_STREAKS;
}

export interface NavigateToSpecificChallengeStreakAction {
    type: typeof NAVIGATE_TO_SPECIFIC_CHALLENGE_STREAK;
    payload: string;
}

export type NavigationActionTypes =
    | NavigateToHomeAction
    | NavigateToVerifyUserAction
    | NavigateToLoginAction
    | NavigateToUpdatePasswordAction
    | NavigateToSoloStreaksAction
    | NavigateToSpecificSoloStreakAction
    | NavigateToWelcomeAction
    | NavigateToThankYouAction
    | NavigateToTeamStreakAction
    | NavigateToSpecificTeamStreakAction
    | NavigateToPaymentAction
    | NavigateToStreakLimitReachedAction
    | NavigateToChallengeStreakAction
    | NavigateToSpecificChallengeStreakAction;

export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CLEAR_LOG_IN_ERROR_MESSAGE = 'CLEAR_LOGIN_ERROR_MESSAGE';
export const SESSION_EXPIRED = 'SESSION_EXPIRED';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const CLEAR_REGISTRATION_ERROR_MESSAGE = 'CLEAR_REGISTRATION_ERROR_MESSAGE';
export const VERIFY_USER_FAIL = 'VERIFY_USER_FAIL';
export const CLEAR_VERIFY_USER_ERROR_MESSAGE = 'CLEAR_VERIFY_USER_ERROR_MESSAGE';
export const RESEND_CODE_SUCCESS = 'RESEND_CODE_SUCCESS';
export const RESEND_CODE_FAIL = 'RESEND_CODE_FAIL';
export const CLEAR_RESEND_CODE_SUCCESS_MESSAGE = 'CLEAR_RESEND_CODE_SUCCESS_MESSAGE';
export const CLEAR_RESEND_CODE_ERROR_MESSAGE = 'CLEAR_RESEND_CODE_ERROR_MESSAGE';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
export const CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE = 'CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE = 'CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE';
export const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL';
export const CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE = 'CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE';
export const REGISTER_IS_LOADING = 'REGISTER_IS_LOADING';
export const REGISTER_IS_LOADED = 'REGISTER__ISLOADED';
export const LOGIN_IS_LOADING = 'LOGIN_IS_LOADING';
export const LOGIN_IS_LOADED = 'LOGIN_IS_LOADED';
export const VERIFY_USER_IS_LOADING = 'VERIFY_CODE_IS_LOADING';
export const VERIFY_USER_IS_LOADED = 'VERIFY_CODE_IS_LOADED';
export const FORGOT_PASSWORD_IS_LOADING = 'FORGOT_PASSWORD_IS_LOADING';
export const FORGOT_PASSWORD_IS_LOADED = 'FORGOT_PASSWORD_IS_LOADED';
export const UPDATE_PASSWORD_IS_LOADING = 'UPDATE_PASSWORD_IS_LOADING';
export const UPDATE_PASSWORD_IS_LOADED = 'UPDATE_PASSWORD_IS_LOADED';
export const PASSWORD_STORE = 'PASSWORD_STORE';
export const PASSWORD_CLEAR = 'PASSWORD_CLEAR';

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: CognitoPayload;
}

export interface LoginFailAction {
    type: typeof LOGIN_FAIL;
    errorMessage: string;
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
}

export interface RefreshTokenAction {
    type: typeof REFRESH_TOKEN;
    payload: CognitoPayload;
}

export interface RefreshTokenFailAction {
    type: typeof REFRESH_TOKEN_FAIL;
    payload: string;
}

export interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

export interface ClearLogInErrorMessageAction {
    type: typeof CLEAR_LOG_IN_ERROR_MESSAGE;
}

export interface SessionExpiredAction {
    type: typeof SESSION_EXPIRED;
}

export interface RegisterFailAction {
    type: typeof REGISTER_FAIL;
    errorMessage: string;
}

export interface ClearRegistrationErrorMessageAction {
    type: typeof CLEAR_REGISTRATION_ERROR_MESSAGE;
}

export interface VerifyUserFailAction {
    type: typeof VERIFY_USER_FAIL;
    errorMessage: string;
}

export interface ClearVerifyUserErrorMessageAction {
    type: typeof CLEAR_VERIFY_USER_ERROR_MESSAGE;
}

export interface ResendCodeSuccessAction {
    type: typeof RESEND_CODE_SUCCESS;
    successMessage: string;
}

export interface ResendCodeFailAction {
    type: typeof RESEND_CODE_FAIL;
    errorMessage: string;
}

export interface ClearResendCodeSuccessMessage {
    type: typeof CLEAR_RESEND_CODE_SUCCESS_MESSAGE;
}

export interface ClearResendCodeErrorMessage {
    type: typeof CLEAR_RESEND_CODE_ERROR_MESSAGE;
}

export interface ForgotPasswordSuccessAction {
    type: typeof FORGOT_PASSWORD_SUCCESS;
    payload: { forgotPasswordEmailDesitnation: string; username: string };
}

export interface ForgotPasswordFailAction {
    type: typeof FORGOT_PASSWORD_FAIL;
    errorMessage: string;
}

export interface ClearForgotPasswordErrorMessage {
    type: typeof CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE;
}

export interface UpdatePasswordSuccessAction {
    type: typeof UPDATE_PASSWORD_SUCCESS;
    successMessage: string;
}

export interface ClearUpdatePasswordSuccessMessage {
    type: typeof CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE;
}

export interface UpdatePasswordFailAction {
    type: typeof UPDATE_PASSWORD_FAIL;
    errorMessage: string;
}

export interface ClearUpdatePasswordErrorMessage {
    type: typeof CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE;
}

export interface RegisterIsLoadingAction {
    type: typeof REGISTER_IS_LOADING;
}

export interface RegisterIsLoadedAction {
    type: typeof REGISTER_IS_LOADED;
}

export interface LoginIsLoadingAction {
    type: typeof LOGIN_IS_LOADING;
}

export interface LoginIsLoadedAction {
    type: typeof LOGIN_IS_LOADED;
}

export interface VerifyUserIsLoadingAction {
    type: typeof VERIFY_USER_IS_LOADING;
}

export interface VerifyUserIsLoadedAction {
    type: typeof VERIFY_USER_IS_LOADED;
}

export interface ForgotPasswordIsLoadingAction {
    type: typeof FORGOT_PASSWORD_IS_LOADING;
}

export interface ForgotPasswordIsLoadedAction {
    type: typeof FORGOT_PASSWORD_IS_LOADED;
}

export interface NewPasswordIsLoadingAction {
    type: typeof UPDATE_PASSWORD_IS_LOADING;
}

export interface NewPasswordIsLoadedAction {
    type: typeof UPDATE_PASSWORD_IS_LOADED;
}

export interface PasswordStoreAction {
    type: typeof PASSWORD_STORE;
    password: string;
}

export interface PasswordClearAction {
    type: typeof PASSWORD_CLEAR;
}

export type AuthActionTypes =
    | LoginSuccessAction
    | LoginFailAction
    | RefreshTokenAction
    | RefreshTokenFailAction
    | LogoutSuccessAction
    | ClearLogInErrorMessageAction
    | SessionExpiredAction
    | RegisterFailAction
    | ClearRegistrationErrorMessageAction
    | VerifyUserFailAction
    | ClearVerifyUserErrorMessageAction
    | ResendCodeSuccessAction
    | ResendCodeFailAction
    | ClearResendCodeSuccessMessage
    | ClearResendCodeErrorMessage
    | ForgotPasswordSuccessAction
    | ForgotPasswordFailAction
    | ClearForgotPasswordErrorMessage
    | UpdatePasswordSuccessAction
    | ClearUpdatePasswordSuccessMessage
    | UpdatePasswordFailAction
    | ClearUpdatePasswordErrorMessage
    | RegisterIsLoadingAction
    | RegisterIsLoadedAction
    | LoginIsLoadingAction
    | LoginIsLoadedAction
    | VerifyUserIsLoadingAction
    | VerifyUserIsLoadedAction
    | ForgotPasswordIsLoadingAction
    | ForgotPasswordIsLoadedAction
    | NewPasswordIsLoadingAction
    | NewPasswordIsLoadedAction
    | PasswordStoreAction
    | PasswordClearAction;

export const GET_LIVE_SOLO_STREAKS = 'GET_LIVE_SOLO_STREAKS';
export const GET_LIVE_SOLO_STREAKS_FAIL = 'GET_LIVE_SOLO_STREAKS_FAIL';
export const GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING = 'GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING';
export const GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADED = 'GET_MULTIPLE_SOLO_STREAKS_IS_LOADED';
export const GET_ARCHIVED_SOLO_STREAKS = 'GET_ARCHIVED_SOLO_STREAKS';
export const GET_ARCHIVED_SOLO_STREAKS_FAIL = 'GET_ARCHIVED_SOLO_STREAKS_FAIL';
export const GET_LIVE_SOLO_STREAK = 'GET_LIVE_SOLO_STREAK';
export const GET_LIVE_SOLO_STREAK_FAIL = 'GET__LIVE_SOLO_STREAK_FAIL';
export const GET_ARCHIVED_SOLO_STREAK = 'GET_ARCHIVED_SOLO_STREAK';
export const GET_ARCHIVED_SOLO_STREAK_FAIL = 'GET_ARCHIVED_SOLO_STREAK_FAIL';
export const CREATE_SOLO_STREAK = 'CREATE_SOLO_STREAK';
export const EDIT_SOLO_STREAK = 'EDIT_SOLO_STREAK';
export const EDIT_SOLO_STREAK_FAIL = 'EDIT_SOLO_STREAK_FAIL';
export const CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE = 'CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE';
export const CREATE_COMPLETE_SOLO_STREAK_TASK = 'CREATE_COMPLETE__SOLO_STREAK_TASK';
export const CREATE_COMPLETE_SOLO_STREAK_TASK_FAIL = 'CREATE_COMPLETE_SOLO_STREAK_TASK_FAIL';
export const CREATE_COMPLETE_SOLO_STREAK_TASK_LOADING = 'CREATE_COMPLETE_SOLO_STREAK_TASK_LOADING';
export const CREATE_COMPLETE_SOLO_STREAK_TASK_LOADED = 'CREATE_COMPLETE_SOLO_STREAK_TASK_LOADED';
export const CREATE_INCOMPLETE_SOLO_STREAK_TASK = 'CREATE_INCOMPLETE__SOLO_STREAK_TASK';
export const CREATE_INCOMPLETE_SOLO_STREAK_TASK_FAIL = 'CREATE_INCOMPLETE_SOLO_STREAK_TASK_FAIL';
export const CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADING = 'CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADING';
export const CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADED = 'CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADED';
export const UPDATE_SOLO_STREAK_TIMEZONES = 'UPDATE_SOLO_STREAK_TIMEZONES';
export const UPDATE_SOLO_STREAK_TIMEZONES_FAIL = 'UPDATE_SOLO_STREAK_TIMEZONES_FAIL';
export const ARCHIVE_SOLO_STREAK = 'ARCHIVE_SOLO_STREAK';
export const ARCHIVE_SOLO_STREAK_FAIL = 'ARCHIVE_SOLO_STREAK_FAIL';
export const CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE = 'CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE';
export const RESTORE_ARCHIVED_SOLO_STREAK = 'RESTORE_ARCHIVED_SOLO_STREAK';
export const RESTORE_ARCHIVED_SOLO_STREAK_FAIL = 'RESTORE_ARCHIVED_SOLO_STREAK_FAIL';
export const CLEAR_RESTORE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE = 'CLEAR_RESTORE_ACHIVED_SOLO_STREAK_ERROR_MESSAGE';
export const DELETE_ARCHIVED_SOLO_STREAK = 'DELETE_ARCHIVED_SOLO_STREAK';
export const DELETE_ARCHIVED_SOLO_STREAK_FAIL = 'DELETE_ARCHIVED_SOLO_STREAK_FAIL';
export const CLEAR_DELETE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE = 'DELETE_ACHIVED_SOLO_STREAK_ERROR_MESSAGE';
export const GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING = 'GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING';
export const GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED = 'GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED';
export const GET_LIVE_SOLO_STREAK_IS_LOADING = 'GET_LIVE_SOLO_STREAK_IS_LOADING';
export const GET_LIVE_SOLO_STREAK_IS_LOADED = 'GET_LIVE_SOLO_STREAK_IS_LOADED';
export const GET_ARCHIVED_SOLO_STREAK_IS_LOADING = 'GET_ARCHIVED_SOLO_STREAK_IS_LOADING';
export const GET_ARCHIVED_SOLO_STREAK_IS_LOADED = 'GET_ARCHIVED_SOLO_STREAK_IS_LOADED';
export const ARCHIVE_SOLO_STREAK_IS_LOADING = 'ARCHIVE_SOLO_STREAK_IS_LOADING';
export const ARCHIVE_SOLO_STREAK_IS_LOADED = 'ARCHIVE_SOLO_STREAK_IS_LOADED';
export const RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING = 'RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING';
export const RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED = 'RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED';
export const DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING = 'DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING';
export const DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED = 'DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED';
export const CREATE_SOLO_STREAK_IS_LOADING = 'CREATE_SOLO_STREAK_IS_LOADING';
export const CREATE_SOLO_STREAK_IS_LOADED = 'CREATE_SOLO_STREAK_IS_LOADED';
export const EDIT_SOLO_STREAK_IS_LOADING = 'EDIT_SOLO_STREAK_IS_LOADING';
export const EDIT_SOLO_STREAK_IS_LOADED = 'EDIT_SOLO_STREAK_IS_LOADED';
export const CREATE_SOLO_STREAK_ERROR = 'CREATE_SOLO_STREAK_ERROR';
export const CLEAR_CREATE_SOLO_STREAK_ERROR = 'CLEAR_CREATE_SOLO_STREAK_ERROR';

export interface GetLiveSoloStreaksAction {
    type: typeof GET_LIVE_SOLO_STREAKS;
    payload: LiveSoloStreakWithClientData[];
}

export interface GetLiveSoloStreaksFailAction {
    type: typeof GET_LIVE_SOLO_STREAKS_FAIL;
    errorMessage: string;
}

export interface GetArchivedSoloStreaksAction {
    type: typeof GET_ARCHIVED_SOLO_STREAKS;
    payload: ArchivedSoloStreakWithClientData[];
}

export interface GetArchivedSoloStreaksFailAction {
    type: typeof GET_ARCHIVED_SOLO_STREAKS_FAIL;
    errorMessage: string;
}

export interface GetLiveSoloStreakAction {
    type: typeof GET_LIVE_SOLO_STREAK;
    payload: SoloStreakWithTaskCompletedDates;
}

export interface GetLiveSoloStreakFailAction {
    type: typeof GET_LIVE_SOLO_STREAK_FAIL;
    errorMessage: string;
}

export interface GetArchivedSoloStreakAction {
    type: typeof GET_ARCHIVED_SOLO_STREAK;
    payload: SoloStreak;
}

export interface GetArchivedSoloStreakFailAction {
    type: typeof GET_ARCHIVED_SOLO_STREAK_FAIL;
    errorMessage: string;
}

export interface CreateSoloStreakAction {
    type: typeof CREATE_SOLO_STREAK;
    payload: LiveSoloStreakWithClientData;
}

export interface EditSoloStreakAction {
    type: typeof EDIT_SOLO_STREAK;
    soloStreak: LiveSoloStreakWithClientData;
}

export interface EditSoloStreakFailAction {
    type: typeof EDIT_SOLO_STREAK_FAIL;
    errorMessage: string;
}

export interface ClearEditSoloStreakErrorMessageAction {
    type: typeof CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE;
}

export interface CreateCompleteSoloStreakTaskAction {
    type: typeof CREATE_COMPLETE_SOLO_STREAK_TASK;
    payload: string;
}

export interface CreateCompleteSoloStreakTaskFailAction {
    type: typeof CREATE_COMPLETE_SOLO_STREAK_TASK_FAIL;
    payload: { soloStreakId: string; errorMessage: string };
}

export interface CreateCompleteSoloStreakTaskLoadingAction {
    type: typeof CREATE_COMPLETE_SOLO_STREAK_TASK_LOADING;
    soloStreakId: string;
}

export interface CreateCompleteSoloStreakTaskLoadedAction {
    type: typeof CREATE_COMPLETE_SOLO_STREAK_TASK_LOADED;
    soloStreakId: string;
}

export interface CreateIncompleteSoloStreakTaskAction {
    type: typeof CREATE_INCOMPLETE_SOLO_STREAK_TASK;
    payload: string;
}

export interface CreateIncompleteSoloStreakTaskFailAction {
    type: typeof CREATE_INCOMPLETE_SOLO_STREAK_TASK_FAIL;
    payload: { soloStreakId: string; errorMessage: string };
}

export interface CreateIncompleteSoloStreakTaskLoadingAction {
    type: typeof CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADING;
    soloStreakId: string;
}

export interface CreateIncompleteSoloStreakTaskLoadedAction {
    type: typeof CREATE_INCOMPLETE_SOLO_STREAK_TASK_LOADED;
    soloStreakId: string;
}

export interface UpdateSoloStreaksTimezonesAction {
    type: typeof UPDATE_SOLO_STREAK_TIMEZONES;
    timezone: string;
}

export interface UpdateSoloStreaksTimezonesFailAction {
    type: typeof UPDATE_SOLO_STREAK_TIMEZONES_FAIL;
    errorMessage: string;
}

export interface ArchiveSoloStreakAction {
    type: typeof ARCHIVE_SOLO_STREAK;
    payload: ArchivedSoloStreakWithClientData;
}

export interface ArchiveSoloStreakFailAction {
    type: typeof ARCHIVE_SOLO_STREAK_FAIL;
    errorMessage: string;
}

export interface ClearArchiveSoloStreakAction {
    type: typeof CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE;
}

export interface RestoreArchivedSoloStreakAction {
    type: typeof RESTORE_ARCHIVED_SOLO_STREAK;
    payload: LiveSoloStreakWithClientData;
}

export interface RestoreArchivedSoloStreakFailAction {
    type: typeof RESTORE_ARCHIVED_SOLO_STREAK_FAIL;
    errorMessage: string;
}

export interface ClearRestoreArchivedSoloStreakErrorMessageAction {
    type: typeof CLEAR_RESTORE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE;
}

export interface DeleteArchivedSoloStreakAction {
    type: typeof DELETE_ARCHIVED_SOLO_STREAK;
    payload: string;
}

export interface DeleteArchivedSoloStreakFailAction {
    type: typeof DELETE_ARCHIVED_SOLO_STREAK_FAIL;
    errorMessage: string;
}

export interface ClearDeleteArchivedSoloStreakErrorMessageAction {
    type: typeof CLEAR_DELETE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE;
}

export interface GetMultipleLiveSoloStreaksIsLoadingAction {
    type: typeof GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING;
}

export interface GetMultipleLiveSoloStreaksIsLoadedAction {
    type: typeof GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADED;
}

export interface GetMultipleArchivedSoloStreaksIsLoadingAction {
    type: typeof GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING;
}

export interface GetMultipleArchivedSoloStreaksIsLoadedAction {
    type: typeof GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED;
}

export interface GetLiveSoloStreakIsLoadingAction {
    type: typeof GET_LIVE_SOLO_STREAK_IS_LOADING;
}

export interface GetLiveSoloStreakIsLoadedAction {
    type: typeof GET_LIVE_SOLO_STREAK_IS_LOADED;
}

export interface GetArchivedSoloStreakIsLoadingAction {
    type: typeof GET_ARCHIVED_SOLO_STREAK_IS_LOADING;
}

export interface GetArchivedSoloStreakIsLoadedAction {
    type: typeof GET_ARCHIVED_SOLO_STREAK_IS_LOADED;
}

export interface ArchiveSoloStreakIsLoadingAction {
    type: typeof ARCHIVE_SOLO_STREAK_IS_LOADING;
}

export interface ArchiveSoloStreakIsLoadedAction {
    type: typeof ARCHIVE_SOLO_STREAK_IS_LOADED;
}

export interface RestoreArchivedSoloStreakIsLoadingAction {
    type: typeof RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING;
}

export interface RestoreArchivedSoloStreakIsLoadedAction {
    type: typeof RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED;
}

export interface DeleteArchivedSoloStreakIsLoadingAction {
    type: typeof DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING;
}

export interface DeleteArchivedSoloStreakIsLoadedAction {
    type: typeof DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED;
}

export interface CreateSoloStreakIsLoadingAction {
    type: typeof CREATE_SOLO_STREAK_IS_LOADING;
}

export interface CreateSoloStreakIsLoadedAction {
    type: typeof CREATE_SOLO_STREAK_IS_LOADED;
}

export interface EditSoloStreakIsLoadingAction {
    type: typeof EDIT_SOLO_STREAK_IS_LOADING;
}

export interface EditSoloStreakIsLoadedAction {
    type: typeof EDIT_SOLO_STREAK_IS_LOADED;
}

export interface CreateSoloStreakErrorAction {
    type: typeof CREATE_SOLO_STREAK_ERROR;
    errorMessage: string;
}

export interface ClearCreateSoloStreakErrorAction {
    type: typeof CLEAR_CREATE_SOLO_STREAK_ERROR;
}

export type SoloStreakActionTypes =
    | GetLiveSoloStreaksAction
    | GetLiveSoloStreaksFailAction
    | GetArchivedSoloStreaksAction
    | GetArchivedSoloStreaksFailAction
    | GetLiveSoloStreakAction
    | GetLiveSoloStreakFailAction
    | GetArchivedSoloStreakAction
    | GetArchivedSoloStreakFailAction
    | CreateSoloStreakAction
    | EditSoloStreakAction
    | EditSoloStreakFailAction
    | ClearEditSoloStreakErrorMessageAction
    | CreateCompleteSoloStreakTaskAction
    | CreateCompleteSoloStreakTaskFailAction
    | CreateCompleteSoloStreakTaskLoadingAction
    | CreateCompleteSoloStreakTaskLoadedAction
    | CreateIncompleteSoloStreakTaskAction
    | CreateIncompleteSoloStreakTaskFailAction
    | CreateIncompleteSoloStreakTaskLoadingAction
    | CreateIncompleteSoloStreakTaskLoadedAction
    | UpdateSoloStreaksTimezonesAction
    | UpdateSoloStreaksTimezonesFailAction
    | ArchiveSoloStreakAction
    | ArchiveSoloStreakFailAction
    | ClearArchiveSoloStreakAction
    | RestoreArchivedSoloStreakAction
    | RestoreArchivedSoloStreakFailAction
    | ClearRestoreArchivedSoloStreakErrorMessageAction
    | DeleteArchivedSoloStreakAction
    | DeleteArchivedSoloStreakFailAction
    | ClearDeleteArchivedSoloStreakErrorMessageAction
    | GetMultipleLiveSoloStreaksIsLoadingAction
    | GetMultipleLiveSoloStreaksIsLoadedAction
    | GetMultipleArchivedSoloStreaksIsLoadingAction
    | GetMultipleArchivedSoloStreaksIsLoadedAction
    | GetLiveSoloStreakIsLoadingAction
    | GetLiveSoloStreakIsLoadedAction
    | GetArchivedSoloStreakIsLoadingAction
    | GetArchivedSoloStreakIsLoadedAction
    | ArchiveSoloStreakIsLoadingAction
    | ArchiveSoloStreakIsLoadedAction
    | RestoreArchivedSoloStreakIsLoadingAction
    | RestoreArchivedSoloStreakIsLoadedAction
    | DeleteArchivedSoloStreakIsLoadingAction
    | DeleteArchivedSoloStreakIsLoadedAction
    | CreateSoloStreakIsLoadingAction
    | CreateSoloStreakIsLoadedAction
    | EditSoloStreakIsLoadingAction
    | EditSoloStreakIsLoadedAction
    | CreateSoloStreakErrorAction
    | ClearCreateSoloStreakErrorAction;

export const GET_STREAK_RECOMMENDATIONS = 'GET_STREAK_RECOMMENDATIONS';
export const GET_STREAK_RECOMMENDATIONS_FAIL = 'GET_STREAK_RECOMMENDATIONS_FAIL';
export const GET_STREAK_RECOMMENDATIONS_IS_LOADING = 'GET_STREAK_RECOMMENDATIONS_IS_LOADING';
export const GET_STREAK_RECOMMENDATIONS_IS_LOADED = 'GET_STREAK_RECOMMENDATIONS_IS_LOADED';
export const SELECT_STREAK_RECOMMENDATION = 'SELECT_STREAK_RECOMMENDATION';
export const SELECT_STREAK_RECOMMENDATION_FAIL = 'SELECT_STREAK_RECOMMENDATION_FAIL';
export const SELECT_STREAK_RECOMMENDATION_IS_LOADING = 'SELECT_STREAK_RECOMMENDATION_IS_LOADING';
export const SELECT_STREAK_RECOMMENDATION_IS_LOADED = 'SELECT_STREAK_RECOMMENDATION_IS_LOADED';
export const CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE = 'CLEAR_STREAK_RECOMMENDATIONS_ERROR_MESSAGE';

export interface GetStreakRecommendationsAction {
    type: typeof GET_STREAK_RECOMMENDATIONS;
    payload: StreakRecommendationWithClientData[];
}

export interface GetStreakRecommendationsFailAction {
    type: typeof GET_STREAK_RECOMMENDATIONS_FAIL;
    payload: string;
}

export interface GetStreakRecommendationsIsLoadingAction {
    type: typeof GET_STREAK_RECOMMENDATIONS_IS_LOADING;
}

export interface GetStreakRecommendationsIsLoadedAction {
    type: typeof GET_STREAK_RECOMMENDATIONS_IS_LOADED;
}

export interface SelectStreakRecommendationAction {
    type: typeof SELECT_STREAK_RECOMMENDATION;
    payload: string;
}

export interface SelectStreakRecommendationFailAction {
    type: typeof SELECT_STREAK_RECOMMENDATION_FAIL;
    payload: { errorMessage: string; challengeId: string };
}

export interface SelectStreakRecommendationIsLoading {
    type: typeof SELECT_STREAK_RECOMMENDATION_IS_LOADING;
    payload: { challengeId: string };
}

export interface SelectStreakRecommendationIsLoaded {
    type: typeof SELECT_STREAK_RECOMMENDATION_IS_LOADED;
    payload: { challengeId: string };
}

export interface ClearGetStreakRecommendationsErrorMessageAction {
    type: typeof CLEAR_GET_STREAK_RECOMMENDATIONS_ERROR_MESSAGE;
}

export type StreakRecommendationsActionTypes =
    | GetStreakRecommendationsAction
    | GetStreakRecommendationsFailAction
    | GetStreakRecommendationsIsLoadingAction
    | GetStreakRecommendationsIsLoadedAction
    | SelectStreakRecommendationAction
    | SelectStreakRecommendationFailAction
    | SelectStreakRecommendationIsLoading
    | SelectStreakRecommendationIsLoaded
    | ClearGetStreakRecommendationsErrorMessageAction;

export const GET_LIVE_TEAM_STREAKS = 'GET_LIVE_TEAM_STREAKS';
export const GET_LIVE_TEAM_STREAKS_FAIL = 'GET_LIVE_TEAM_STREAKS_FAIL';
export const GET_LIVE_TEAM_STREAKS_IS_LOADING = 'GET_LIVE_TEAM_STREAKS_IS_LOADING';
export const GET_LIVE_TEAM_STREAKS_IS_LOADED = 'GET_LIVE_TEAM_STREAKS_IS_LOADED';

export const GET_ARCHIVED_TEAM_STREAKS = 'GET_ARCHIVED_TEAM_STREAKS';
export const GET_ARCHIVED_TEAM_STREAKS_FAIL = 'GET_ARCHIVED_TEAM_STREAKS_FAIL';
export const GET_ARCHIVED_TEAM_STREAKS_IS_LOADING = 'GET_ARCHIVED_TEAM_STREAKS_IS_LOADING';
export const GET_ARCHIVED_TEAM_STREAKS_IS_LOADED = 'GET_ARCHIVED_TEAM_STREAKS_IS_LOADED';

export const GET_LIVE_TEAM_STREAK = 'GET_LIVE_TEAM_STREAK';
export const GET_LIVE_TEAM_STREAK_FAIL = 'GET_LIVE_TEAM_STREAK_FAIL';
export const GET_LIVE_TEAM_STREAK_IS_LOADING = 'GET_LIVE_TEAM_STREAK_IS_LOADING';
export const GET_LIVE_TEAM_STREAK_IS_LOADED = 'GET_LIVE_TEAM_STREAK_IS_LOADED';

export const GET_ARCHIVED_TEAM_STREAK = 'GET_ARCHIVED_TEAM_STREAK';
export const GET_ARCHIVED_TEAM_STREAK_FAIL = 'GET_ARCHIVED_TEAM_STREAK_FAIL';
export const GET_ARCHIVED_TEAM_STREAK_LOADING = 'GET_ARCHIVED_TEAM_STREAK_LOADING';
export const GET_ARCHIVED_TEAM_STREAK_LOADED = 'GET_ARCHIVED_TEAM_STREAK_LOADED';

export const CREATE_TEAM_STREAK = 'CREATE_TEAM_STREAK';
export const EDIT_TEAM_STREAK = 'EDIT_TEAM_STREAK';
export const EDIT_TEAM_STREAK_FAIL = 'EDIT_TEAM_STREAK_FAIL';
export const EDIT_TEAM_STREAK_LOADING = 'EDIT_TEAM_STREAK_LOADING';
export const EDIT_TEAM_STREAK_LOADED = 'EDIT_TEAM_STREAK_LOADED';
export const CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE = 'CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE';
export const ADD_FRIEND_TO_TEAM_STREAK = 'ADD_FRIEND_TO_TEAM_STREAK';
export const ADD_FRIEND_TO_TEAM_STREAK_FAIL = 'ADD_FRIEND_TO_TEAM_STREAK_FAIL';
export const COMPLETE_TEAM_MEMBER_STREAK_TASK = 'COMPLETE_TEAM_MEMBER_STREAK_TASK';
export const COMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL = 'COMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL';
export const COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING = 'COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING';
export const COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED = 'COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED';
export const INCOMPLETE_TEAM_MEMBER_STREAK_TASK = 'INCOMPLETE_TEAM_MEMBER_STREAK_TASK';
export const INCOMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL = 'INCOMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL';
export const INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING = 'INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING';
export const INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED = 'INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED';

export const CREATE_TEAM_STREAK_IS_LOADING = 'CREATE_TEAM_STREAK_IS_LOADING';
export const CREATE_TEAM_STREAK_IS_LOADED = 'CREATE_TEAM_STREAK_IS_LOADED';
export const CREATE_TEAM_STREAK_ERROR = 'CREATE_TEAM_STREAK_ERROR';
export const CLEAR_CREATE_TEAM_STREAK_ERROR = 'CLEAR_CREATE_TEAM_STREAK_ERROR';

export const ARCHIVE_TEAM_STREAK = 'ARCHIVE_TEAM_STREAK';
export const ARCHIVE_TEAM_STREAK_FAIL = 'ARCHIVE_TEAM_STREAK_FAIL';
export const ARCHIVE_TEAM_STREAK_IS_LOADING = 'ARCHIVE_TEAM_STREAK_IS_LOADING';
export const ARCHIVE_TEAM_STREAK_IS_LOADED = 'ARCHIVE_TEAM_STREAK_IS_LOADED';
export const CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE = 'CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE';

export const RESTORE_ARCHIVED_TEAM_STREAK = 'RESTORE_ARCHIVED_TEAM_STREAK';
export const RESTORE_ARCHIVED_TEAM_STREAK_FAIL = 'RESTORE_ARCHIVED_TEAM_STREAK_FAIL';
export const RESTORE_ARCHIVED_TEAM_STREAK_LOADING = 'RESTORE_ARCHIVED_TEAM_STREAK_LOADING';
export const RESTORE_ARCHIVED_TEAM_STREAK_LOADED = 'RESTORE_ARCHIVED_TEAM_STREAK_LOADED';
export const CLEAR_RESTORE_TEAM_STREAK_ERROR_MESSAGE = 'CLEAR_RESTORE_TEAM_STREAK_ERROR_MESSAGE';

export const DELETE_ARCHIVED_TEAM_STREAK = 'DELETE_ARCHIVED_TEAM_STREAK';
export const DELETE_ARCHIVED_TEAM_STREAK_FAIL = 'DELETE_ARCHIVED_TEAM_STREAK_FAIL';
export const DELETE_ARCHIVED_TEAM_STREAK_LOADING = 'DELETE_ARCHIVED_TEAM_STREAK_LOADING';
export const DELETE_ARCHIVED_TEAM_STREAK_LOADED = 'DELETE_ARCHIVED_TEAM_STREAK_LOADED';

export const UPDATE_TEAM_STREAK_TIMEZONE = 'UPDATE_TEAM_STREAK_TIMEZONE';
export const UPDATE_TEAM_STREAK_TIMEZONE_FAIL = 'UPDATE_TEAM_STREAK_TIMEZONE_FAIL';

export interface GetLiveTeamStreaksAction {
    type: typeof GET_LIVE_TEAM_STREAKS;
    payload: PopulatedTeamStreakWithLoadingStates[];
}

export interface GetLiveTeamStreaksFailAction {
    type: typeof GET_LIVE_TEAM_STREAKS_FAIL;
    errorMessage: string;
}

export interface GetLiveTeamStreaksIsLoadingAction {
    type: typeof GET_LIVE_TEAM_STREAKS_IS_LOADING;
}

export interface GetLiveTeamStreaksIsLoadedAction {
    type: typeof GET_LIVE_TEAM_STREAKS_IS_LOADED;
}

export interface GetArchivedTeamStreaksAction {
    type: typeof GET_ARCHIVED_TEAM_STREAKS;
    payload: PopulatedTeamStreakWithLoadingStates[];
}

export interface GetArchivedTeamStreaksFailAction {
    type: typeof GET_ARCHIVED_TEAM_STREAKS_FAIL;
    payload: string;
}

export interface GetArchivedTeamStreaksLoadingAction {
    type: typeof GET_ARCHIVED_TEAM_STREAKS_IS_LOADING;
}

export interface GetArchivedTeamStreaksLoadedAction {
    type: typeof GET_ARCHIVED_TEAM_STREAKS_IS_LOADED;
}

export interface GetLiveTeamStreakAction {
    type: typeof GET_LIVE_TEAM_STREAK;
    payload: PopulatedTeamStreakWithTaskDates;
}

export interface GetLiveTeamStreakFailAction {
    type: typeof GET_LIVE_TEAM_STREAK_FAIL;
    errorMessage: string;
}

export interface GetLiveTeamStreakLoadingAction {
    type: typeof GET_LIVE_TEAM_STREAK_IS_LOADING;
}

export interface GetLiveTeamStreakLoadedAction {
    type: typeof GET_LIVE_TEAM_STREAK_IS_LOADED;
}

export interface GetArchivedTeamStreakAction {
    type: typeof GET_ARCHIVED_TEAM_STREAK;
    payload: PopulatedTeamStreakWithTaskDates;
}

export interface GetArchivedTeamStreakFailAction {
    type: typeof GET_ARCHIVED_TEAM_STREAK_FAIL;
    payload: string;
}

export interface GetArchivedTeamStreakLoadingAction {
    type: typeof GET_ARCHIVED_TEAM_STREAK_LOADING;
}

export interface GetArchivedTeamStreakLoadedAction {
    type: typeof GET_ARCHIVED_TEAM_STREAK_LOADED;
}

export interface CreateTeamStreakAction {
    type: typeof CREATE_TEAM_STREAK;
    payload: PopulatedTeamStreakWithLoadingStates;
}

export interface EditTeamStreakAction {
    type: typeof EDIT_TEAM_STREAK;
    payload: TeamStreak;
}

export interface EditTeamStreakFailAction {
    type: typeof EDIT_TEAM_STREAK_FAIL;
    payload: string;
}

export interface EditTeamStreakLoadingAction {
    type: typeof EDIT_TEAM_STREAK_LOADING;
}

export interface EditTeamStreakLoadedAction {
    type: typeof EDIT_TEAM_STREAK_LOADED;
}

export interface ClearEditTeamStreakErrorMessageAction {
    type: typeof CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE;
}

export interface AddFriendToTeamStreakAction {
    type: typeof ADD_FRIEND_TO_TEAM_STREAK;
}

export interface AddFriendToTeamStreakFailAction {
    type: typeof ADD_FRIEND_TO_TEAM_STREAK_FAIL;
    errorMessage: string;
}

export interface CompleteTeamMemberStreakTaskAction {
    type: typeof COMPLETE_TEAM_MEMBER_STREAK_TASK;
    teamMemberStreakId: string;
}

export interface CompleteTeamMemberStreakTaskFailAction {
    type: typeof COMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL;
    payload: { teamMemberStreakId: string; errorMessage: string };
}

export interface CompleteTeamMemberStreakTaskLoadingAction {
    type: typeof COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING;
    teamMemberStreakId: string;
}

export interface CompleteTeamMemberStreakTaskLoadedAction {
    type: typeof COMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED;
    teamMemberStreakId: string;
}

export interface IncompleteTeamMemberStreakTaskAction {
    type: typeof INCOMPLETE_TEAM_MEMBER_STREAK_TASK;
    teamMemberStreakId: string;
}

export interface IncompleteTeamMemberStreakTaskFailAction {
    type: typeof INCOMPLETE_TEAM_MEMBER_STREAK_TASK_FAIL;
    payload: { teamMemberStreakId: string; errorMessage: string };
}

export interface IncompleteTeamMemberStreakTaskLoadingAction {
    type: typeof INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADING;
    teamMemberStreakId: string;
}

export interface IncompleteTeamMemberStreakTaskLoadedAction {
    type: typeof INCOMPLETE_TEAM_MEMBER_STREAK_TASK_LOADED;
    teamMemberStreakId: string;
}

export interface CreateTeamStreakIsLoadingAction {
    type: typeof CREATE_TEAM_STREAK_IS_LOADING;
}

export interface CreateTeamStreakIsLoadedAction {
    type: typeof CREATE_TEAM_STREAK_IS_LOADED;
}

export interface CreateTeamStreakErrorAction {
    type: typeof CREATE_TEAM_STREAK_ERROR;
    errorMessage: string;
}

export interface ClearCreateTeamStreakErrorAction {
    type: typeof CLEAR_CREATE_TEAM_STREAK_ERROR;
}

export interface ArchiveTeamStreakAction {
    type: typeof ARCHIVE_TEAM_STREAK;
    payload: PopulatedTeamStreakWithLoadingStates;
}

export interface ArchiveTeamStreakFailAction {
    type: typeof ARCHIVE_TEAM_STREAK_FAIL;
    errorMessage: string;
}

export interface ClearArchiveTeamStreakErrorMessageAction {
    type: typeof CLEAR_ARCHIVE_TEAM_STREAK_ERROR_MESSAGE;
}

export interface ArchiveTeamStreakIsLoadingAction {
    type: typeof ARCHIVE_TEAM_STREAK_IS_LOADING;
}

export interface ArchiveTeamStreakIsLoadedAction {
    type: typeof ARCHIVE_TEAM_STREAK_IS_LOADED;
}

export interface RestoreArchivedTeamStreakAction {
    type: typeof RESTORE_ARCHIVED_TEAM_STREAK;
    payload: PopulatedTeamStreakWithLoadingStates;
}

export interface RestoreArchivedTeamStreakFailAction {
    type: typeof RESTORE_ARCHIVED_TEAM_STREAK_FAIL;
    payload: string;
}

export interface RestoreArchivedTeamStreakLoadingAction {
    type: typeof RESTORE_ARCHIVED_TEAM_STREAK_LOADING;
}

export interface RestoreArchivedTeamStreakLoadedAction {
    type: typeof RESTORE_ARCHIVED_TEAM_STREAK_LOADED;
}

export interface ClearRestoreTeamStreakErrorAction {
    type: typeof CLEAR_RESTORE_TEAM_STREAK_ERROR_MESSAGE;
}

export interface DeleteArchivedTeamStreakAction {
    type: typeof DELETE_ARCHIVED_TEAM_STREAK;
    payload: string;
}

export interface DeleteArchivedTeamStreakFailAction {
    type: typeof DELETE_ARCHIVED_TEAM_STREAK_FAIL;
    payload: string;
}

export interface DeleteArchivedTeamStreakLoadingAction {
    type: typeof DELETE_ARCHIVED_TEAM_STREAK_LOADING;
}

export interface DeleteArchivedTeamStreakLoadedAction {
    type: typeof DELETE_ARCHIVED_TEAM_STREAK_LOADED;
}

export interface UpdateTimezoneAction {
    type: typeof UPDATE_TEAM_STREAK_TIMEZONE;
    payload: PopulatedTeamStreakWithTaskDates;
}

export interface UpdateTimezoneFailAction {
    type: typeof UPDATE_TEAM_STREAK_TIMEZONE_FAIL;
    payload: string;
}

export type TeamStreakActionTypes =
    | GetLiveTeamStreaksAction
    | GetLiveTeamStreaksFailAction
    | GetLiveTeamStreaksIsLoadingAction
    | GetLiveTeamStreaksIsLoadedAction
    | GetArchivedTeamStreaksAction
    | GetArchivedTeamStreaksFailAction
    | GetArchivedTeamStreaksLoadingAction
    | GetArchivedTeamStreaksLoadedAction
    | GetLiveTeamStreakAction
    | GetLiveTeamStreakFailAction
    | GetLiveTeamStreakLoadingAction
    | GetLiveTeamStreakLoadedAction
    | GetArchivedTeamStreakAction
    | GetArchivedTeamStreakFailAction
    | GetArchivedTeamStreakLoadingAction
    | GetArchivedTeamStreakLoadedAction
    | CreateTeamStreakAction
    | EditTeamStreakAction
    | EditTeamStreakFailAction
    | EditTeamStreakLoadingAction
    | EditTeamStreakLoadedAction
    | ClearEditTeamStreakErrorMessageAction
    | AddFriendToTeamStreakAction
    | AddFriendToTeamStreakFailAction
    | CompleteTeamMemberStreakTaskAction
    | CompleteTeamMemberStreakTaskFailAction
    | CompleteTeamMemberStreakTaskLoadingAction
    | CompleteTeamMemberStreakTaskLoadedAction
    | IncompleteTeamMemberStreakTaskAction
    | IncompleteTeamMemberStreakTaskFailAction
    | IncompleteTeamMemberStreakTaskLoadingAction
    | IncompleteTeamMemberStreakTaskLoadedAction
    | CreateTeamStreakIsLoadingAction
    | CreateTeamStreakIsLoadedAction
    | CreateTeamStreakErrorAction
    | ClearCreateTeamStreakErrorAction
    | ArchiveTeamStreakAction
    | ArchiveTeamStreakFailAction
    | ClearArchiveTeamStreakErrorMessageAction
    | ArchiveTeamStreakIsLoadingAction
    | ArchiveTeamStreakIsLoadedAction
    | RestoreArchivedTeamStreakAction
    | RestoreArchivedTeamStreakFailAction
    | RestoreArchivedTeamStreakLoadingAction
    | RestoreArchivedTeamStreakLoadedAction
    | ClearRestoreTeamStreakErrorAction
    | DeleteArchivedTeamStreakAction
    | DeleteArchivedTeamStreakFailAction
    | DeleteArchivedTeamStreakLoadingAction
    | DeleteArchivedTeamStreakLoadedAction
    | UpdateTimezoneAction
    | UpdateTimezoneFailAction;

export const GET_USERS = 'GET_USERS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';
export const GET_USERS_IS_LOADING = 'GET_USERS_IS_LOADING';
export const GET_USERS_IS_LOADED = 'GET_USERS_IS_LOADED';
export const GET_USER = 'GET_USER';
export const GET_USER_FAIL = 'GET_USER_FAIL';
export const GET_USER_IS_LOADING = 'GET_USER_IS_LOADING';
export const GET_USER_IS_LOADED = 'GET_USER_IS_LOADED';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const UPDATE_CURRENT_USER_FAIL = 'UPDATE_CURRENT_USER_FAIL';
export const UPDATE_CURRENT_USER_IS_LOADING = 'UPDATE_CURRENT_USER_IS_LOADING';
export const UPDATE_CURRENT_USER_IS_LOADED = 'UPDATE_CURRENT_USER_IS_LOADED';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_FAIL = 'GET_CURRENT_USER_FAIL';
export const GET_CURRENT_USER_IS_LOADING = 'GET_CURRENT_USER_IS_LOADING';
export const GET_CURRENT_USER_IS_LOADED = 'GET_CURRENT_USER_IS_LOADED';

export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FRIENDS_FAIL = 'GET_FRIENDS_FAIL';
export const DELETE_FRIEND = 'DELTE_FRIEND';
export const DELETE_FRIEND_FAIL = 'DELTE_FRIEND_FAIL';
export const DELETE_FRIEND_IS_LOADING = 'DELETE_FRIEND_IS_LOADING';
export const DELETE_FRIEND_IS_LOADED = 'DELETE_FRIEND_IS_LOADED';
export const SELECT_FRIEND = 'SELECT_FRIEND';
export const UNSELECT_FRIEND = 'UNSELECT_FRIEND';
export const CLEAR_SELECTED_FRIENDS = 'CLEAR_SELECTED_FRIENDS';
export const SEND_FRIEND_REQUEST_FAIL = 'SEND_FRIEND_REQUEST_FAIL';
export const CLEAR_SEND_FRIEND_REQUEST_ERROR_MESSAGE = 'CLEAR_SEND_FRIEND_REQUEST_ERROR_MESSAGE';
export const SEND_FRIEND_REQUEST_LOADING = 'SEND_FRIEND_REQUEST_LOADING';
export const SEND_FRIEND_REQUEST_LOADED = 'SEND_FRIEND_REQUEST_LOADED';
export const CREATE_STRIPE_SUBSCRIPTION = 'CREATE_STRIPE_SUBSCRIPTION';
export const CREATE_STRIPE_SUBSCRIPTION_FAIL = 'CREATE_STRIPE_SUBSCRIPTION_FAIL';
export const CLEAR_STRIPE_SUBSCRIPTION_ERROR_MESSAGE = 'CLEAR_STRIPE_SUBSCRIPTION_ERROR_MESSAGE';
export const CREATE_STRIPE_SUBSCRIPTION_LOADING = 'CREATE_STRIPE_SUBSCRIPTION_LOADING';
export const CREATE_STRIPE_SUBSCRIPTION_LOADED = 'CREATE_STRIPE_SUBSCRIPTION_LOADED';
export const SEND_CONTACT_US_EMAIL = 'SEND_CONTACT_US_EMAIL';
export const SEND_CONTACT_US_EMAIL_FAIL = 'SEND_CONTACT_US_EMAIL_FAIL';
export const SEND_CONTACT_US_EMAIL_LOADING = 'SEND_CONTACT_US_EMAIL_LOADING';
export const SEND_CONTACT_US_EMAIL_LOADED = 'SEND_CONTACT_US_EMAIL_LOADED';
export const CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES = 'CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES';
export const SEND_CANCEL_MEMBERSHIP_EMAIL = 'SEND_CANCEL_MEMBERSHIP_EMAIL';
export const SEND_CANCEL_MEMBERSHIP_EMAIL_FAIL = 'SEND_CANCEL_MEMBERSHIP_EMAIL_FAIL';
export const SEND_CANCEL_MEMBERSHIP_EMAIL_LOADING = 'SEND_CANCEL_MEMBERSHIP_EMAIL_LOADING';
export const SEND_CANCEL_MEMBERSHIP_EMAIL_LOADED = 'SEND_CANCEL_MEMBERSHIP_EMAIL_LOADED';
export const CLEAR_SEND_CANCEL_MEMBERSHIP_EMAIL_MESSAGES = 'CLEAR_SEND_CANCEL_MEMBERSHIP_EMAIL_MESSAGES';
export const UPLOAD_PROFILE_IMAGE = 'UPLOAD_PROFILE_IMAGE';
export const UPLOAD_PROFILE_IMAGE_FAIL = 'UPLOAD_PROFILE_IMAGE_FAIL';
export const UPLOAD_PROFILE_IMAGE_IS_LOADING = 'UPLOAD_PROFILE_IMAGE_IS_LOADING';
export const UPLOAD_PROFILE_IMAGE_IS_LOADED = 'UPLOAD_PROFILE_IMAGE_IS_LOADED';
export const CLEAR_UPLOAD_PROFILE_IMAGE_MESSAGES = 'CLEAR_UPLOAD_PROFILE_IMAGE_MESSAGES';
export const GET_FRIENDS_IS_LOADING = 'GET_FRIENDS_IS_LOADING';
export const GET_FRIENDS_IS_LOADED = 'GET_FRIENDS_IS_LOADED';

export interface GetUsersAction {
    type: typeof GET_USERS;
    payload: UserWithClientData[];
}

export interface GetUsersFailAction {
    type: typeof GET_USERS_FAIL;
    errorMessage: string;
}

export interface GetUsersIsLoadingAction {
    type: typeof GET_USERS_IS_LOADING;
}

export interface GetUsersIsLoadedAction {
    type: typeof GET_USERS_IS_LOADED;
}

export interface GetUserAction {
    type: typeof GET_USER;
    payload: SelectedUser;
}

export interface GetUserFailAction {
    type: typeof GET_USER_FAIL;
    payload: string;
}

export interface GetUserIsLoadingAction {
    type: typeof GET_USER_IS_LOADING;
}

export interface GetUserIsLoadedAction {
    type: typeof GET_USER_IS_LOADED;
}

export interface UpdateCurrentUserAction {
    type: typeof UPDATE_CURRENT_USER;
    user: PopulatedCurrentUserWithStreakCompleteInfo;
}

export interface UpdateCurrentUserFailAction {
    type: typeof UPDATE_CURRENT_USER_FAIL;
    errorMessage: string;
}

export interface UpdateCurrentUserIsLoadingAction {
    type: typeof UPDATE_CURRENT_USER_IS_LOADING;
}

export interface UpdateCurrentUserIsLoadedAction {
    type: typeof UPDATE_CURRENT_USER_IS_LOADED;
}

export interface GetCurrentUserAction {
    type: typeof GET_CURRENT_USER;
    payload: PopulatedCurrentUserWithStreakCompleteInfo;
}

export interface GetCurrentUserFailAction {
    type: typeof GET_CURRENT_USER_FAIL;
    errorMessage: string;
}

export interface GetCurrentUserIsLoadingAction {
    type: typeof GET_CURRENT_USER_IS_LOADING;
}

export interface GetCurrentUserIsLoadedAction {
    type: typeof GET_CURRENT_USER_IS_LOADED;
}

export interface GetFriendsAction {
    type: typeof GET_FRIENDS;
    friends: FriendStateWithClientData[];
}

export interface GetFriendsFailAction {
    type: typeof GET_FRIENDS_FAIL;
    errorMessage: string;
}

export interface DeleteFriendAction {
    type: typeof DELETE_FRIEND;
    friends: FriendStateWithClientData[];
}

export interface DeleteFriendFailAction {
    type: typeof DELETE_FRIEND_FAIL;
    payload: { errorMessage: string; friendId: string };
}

export interface DeleteFriendIsLoadingAction {
    type: typeof DELETE_FRIEND_IS_LOADING;
    friendId: string;
}

export interface DeleteFriendIsLoadedAction {
    type: typeof DELETE_FRIEND_IS_LOADED;
    friendId: string;
}

export interface SelectFriendAction {
    type: typeof SELECT_FRIEND;
    friendId: string;
}

export interface UnselectFriendAction {
    type: typeof UNSELECT_FRIEND;
    friendId: string;
}

export interface ClearSelectedFriendsAction {
    type: typeof CLEAR_SELECTED_FRIENDS;
}

export interface SendFriendRequestFailAction {
    type: typeof SEND_FRIEND_REQUEST_FAIL;
    payload: { errorMessage: string; friendId: string };
}

export interface ClearSendFriendRequestErrorMessage {
    type: typeof CLEAR_SEND_FRIEND_REQUEST_ERROR_MESSAGE;
    friendId: string;
}

export interface SendFriendRequestLoadingAction {
    type: typeof SEND_FRIEND_REQUEST_LOADING;
    friendId: string;
}

export interface SendFriendRequestLoadedAction {
    type: typeof SEND_FRIEND_REQUEST_LOADED;
    friendId: string;
}

export interface CreateStripeSubscriptionAction {
    type: typeof CREATE_STRIPE_SUBSCRIPTION;
    payload: FormattedUser;
}

export interface CreateStripeSubscriptionActionFail {
    type: typeof CREATE_STRIPE_SUBSCRIPTION_FAIL;
    payload: string;
}

export interface ClearStripeSubscriptionErrorMessageAction {
    type: typeof CLEAR_STRIPE_SUBSCRIPTION_ERROR_MESSAGE;
}

export interface CreateStripeSubscriptionLoadingAction {
    type: typeof CREATE_STRIPE_SUBSCRIPTION_LOADING;
}

export interface CreateStripeSubscriptionLoadedAction {
    type: typeof CREATE_STRIPE_SUBSCRIPTION_LOADED;
}

export interface SendContactUsEmailAction {
    type: typeof SEND_CONTACT_US_EMAIL;
    payload: string;
}

export interface SendContactUsEmailFailAction {
    type: typeof SEND_CONTACT_US_EMAIL_FAIL;
    payload: string;
}

export interface SendContactUsEmailLoadingAction {
    type: typeof SEND_CONTACT_US_EMAIL_LOADING;
}

export interface SendContactUsEmailLoadedAction {
    type: typeof SEND_CONTACT_US_EMAIL_LOADED;
}

export interface ClearSendContactUsEmailMessagesAction {
    type: typeof CLEAR_SEND_CONTACT_US_EMAIL_MESSAGES;
}

export interface SendCancelMembershipEmailAction {
    type: typeof SEND_CANCEL_MEMBERSHIP_EMAIL;
    payload: string;
}

export interface SendCancelMembershipEmailFailAction {
    type: typeof SEND_CANCEL_MEMBERSHIP_EMAIL_FAIL;
    payload: string;
}

export interface SendCancelMembershipEmailLoadingAction {
    type: typeof SEND_CANCEL_MEMBERSHIP_EMAIL_LOADING;
}

export interface SendCancelMembershipEmailLoadedAction {
    type: typeof SEND_CANCEL_MEMBERSHIP_EMAIL_LOADED;
}

export interface ClearSendCancelMembershipEmailMessagesAction {
    type: typeof CLEAR_SEND_CANCEL_MEMBERSHIP_EMAIL_MESSAGES;
}

export interface UploadProfileImageAction {
    type: typeof UPLOAD_PROFILE_IMAGE;
    payload: ProfileImages;
}

export interface UploadProfileImageFailAction {
    type: typeof UPLOAD_PROFILE_IMAGE_FAIL;
    payload: string;
}

export interface UploadProfileIsLoadingAction {
    type: typeof UPLOAD_PROFILE_IMAGE_IS_LOADING;
}

export interface UploadProfileIsLoadedAction {
    type: typeof UPLOAD_PROFILE_IMAGE_IS_LOADED;
}

export interface ClearUploadProfileImageMessages {
    type: typeof CLEAR_UPLOAD_PROFILE_IMAGE_MESSAGES;
}

export interface GetFriendsIsLoadingAction {
    type: typeof GET_FRIENDS_IS_LOADING;
}

export interface GetFriendsIsLoadedAction {
    type: typeof GET_FRIENDS_IS_LOADED;
}

export type UserActionTypes =
    | GetUsersAction
    | GetUsersFailAction
    | GetUsersIsLoadingAction
    | GetUsersIsLoadedAction
    | GetUserAction
    | GetUserFailAction
    | GetUserIsLoadingAction
    | GetUserIsLoadedAction
    | UpdateCurrentUserAction
    | UpdateCurrentUserFailAction
    | UpdateCurrentUserIsLoadingAction
    | UpdateCurrentUserIsLoadedAction
    | GetCurrentUserAction
    | GetCurrentUserFailAction
    | GetCurrentUserIsLoadingAction
    | GetCurrentUserIsLoadedAction
    | GetFriendsAction
    | GetFriendsFailAction
    | DeleteFriendAction
    | DeleteFriendFailAction
    | DeleteFriendIsLoadingAction
    | DeleteFriendIsLoadedAction
    | SendFriendRequestAction
    | SendFriendRequestFailAction
    | ClearSendFriendRequestErrorMessage
    | SendFriendRequestLoadingAction
    | SendFriendRequestLoadedAction
    | SelectFriendAction
    | UnselectFriendAction
    | ClearSelectedFriendsAction
    | SendFriendRequestFailAction
    | ClearSendFriendRequestErrorMessage
    | SendFriendRequestLoadingAction
    | SendFriendRequestLoadedAction
    | CreateStripeSubscriptionAction
    | CreateStripeSubscriptionActionFail
    | ClearStripeSubscriptionErrorMessageAction
    | CreateStripeSubscriptionLoadingAction
    | CreateStripeSubscriptionLoadedAction
    | SendContactUsEmailAction
    | SendContactUsEmailFailAction
    | SendContactUsEmailLoadingAction
    | SendContactUsEmailLoadedAction
    | ClearSendContactUsEmailMessagesAction
    | SendCancelMembershipEmailAction
    | SendCancelMembershipEmailFailAction
    | SendCancelMembershipEmailLoadingAction
    | SendCancelMembershipEmailLoadedAction
    | ClearSendCancelMembershipEmailMessagesAction
    | UploadProfileImageAction
    | UploadProfileImageFailAction
    | UploadProfileIsLoadingAction
    | UploadProfileIsLoadedAction
    | ClearUploadProfileImageMessages
    | GetFriendsIsLoadingAction
    | GetFriendsIsLoadedAction;

export const GET_PENDING_FRIEND_REQUESTS = 'GET_PENDING_FRIEND_REQUESTS';
export const GET_PENDING_FRIEND_REQUESTS_FAIL = 'GET_PENDING_FRIEND_REQUEST_FAIL';
export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
export const ACCEPT_FRIEND_REQUEST_FAIL = 'ACCEPT_FRIEND_REQUEST_FAIL';
export const CLEAR_ACCEPT_FRIEND_REQUEST_ERROR_MESSAGE = 'CLEAR_ACCEPT_FRIEND_REQUEST_ERROR_MESSAGE';
export const ACCEPT_FRIEND_REQUEST_IS_LOADING = 'ACCEPT_FRIEND_REQUEST_IS_LOADING';
export const ACCEPT_FRIEND_REQUEST_IS_LOADED = 'ACCEPT_FRIEND_REQUEST_IS_LOADED';
export const REJECT_FRIEND_REQUEST = 'REJECT_FRIEND_REQUEST';
export const REJECT_FRIEND_REQUEST_FAIL = 'REJECT_FRIEND_REQUEST_FAIL';
export const CLEAR_REJECT_FRIEND_REQUEST_ERROR_MESSAGE = 'CLEAR_REJECT_FRIEND_REQUEST_ERROR_MESSAGE';
export const REJECT_FRIEND_REQUEST_IS_LOADING = 'REJECT_FRIEND_REQUEST_IS_LOADING';
export const REJECT_FRIEND_REQUEST_IS_LOADED = 'REJECT_FRIEND_REQUEST_IS_LOADED';
export const GET_SENT_FRIEND_REQUESTS = 'GET_SENT_FRIEND_REQUESTS';
export const GET_SENT_FRIEND_REQUESTS_FAIL = 'GET_SENT_FRIEND_REQUESTS_FAIL';
export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
export const GET_SENT_FRIEND_REQUESTS_IS_LOADING = 'GET_SENT_FRIEND_REQUESTS_IS_LOADING';
export const GET_SENT_FRIEND_REQUESTS_IS_LOADED = 'GET_SENT_FRIEND_REQUEST_IS_LOADED';
export const GET_PENDING_FRIEND_REQUESTS_IS_LOADING = 'GET_PENDING_FRIEND_REQUESTS_IS_LOADING';
export const GET_PENDING_FRIEND_REQUESTS_IS_LOADED = 'GET_PENDING_FRIEND_REQUEST_IS_LOADED';

export interface GetPendingFriendRequestsAction {
    type: typeof GET_PENDING_FRIEND_REQUESTS;
    pendingFriendRequests: FriendRequestStateWithClientData[];
}

export interface GetPendingFriendRequestActionFail {
    type: typeof GET_PENDING_FRIEND_REQUESTS_FAIL;
    errorMessage: string;
}

export interface AcceptFriendRequestAction {
    type: typeof ACCEPT_FRIEND_REQUEST;
    friendRequestId: string;
}

export interface AcceptFriendRequestFailAction {
    type: typeof ACCEPT_FRIEND_REQUEST_FAIL;
    payload: { errorMessage: string; friendRequestId: string };
}

export interface ClearAcceptFriendRequestErrorMessageAction {
    type: typeof CLEAR_ACCEPT_FRIEND_REQUEST_ERROR_MESSAGE;
    friendRequestId: string;
}

export interface AcceptFriendRequestIsLoadingAction {
    type: typeof ACCEPT_FRIEND_REQUEST_IS_LOADING;
    friendRequestId: string;
}

export interface AcceptFriendRequestIsLoadedAction {
    type: typeof ACCEPT_FRIEND_REQUEST_IS_LOADED;
    friendRequestId: string;
}

export interface RejectFriendRequestAction {
    type: typeof REJECT_FRIEND_REQUEST;
    friendRequestId: string;
}

export interface RejectFriendRequestFailAction {
    type: typeof REJECT_FRIEND_REQUEST_FAIL;
    payload: { errorMessage: string; friendRequestId: string };
}

export interface ClearRejectFriendRequestErrorMessageAction {
    type: typeof CLEAR_REJECT_FRIEND_REQUEST_ERROR_MESSAGE;
    friendRequestId: string;
}

export interface RejectFriendRequestIsLoadingAction {
    type: typeof REJECT_FRIEND_REQUEST_IS_LOADING;
    friendRequestId: string;
}

export interface RejectFriendRequestIsLoadedAction {
    type: typeof REJECT_FRIEND_REQUEST_IS_LOADED;
    friendRequestId: string;
}

export interface GetSentFriendRequestsAction {
    type: typeof GET_SENT_FRIEND_REQUESTS;
    sentFriendRequests: PopulatedFriendRequest[];
}

export interface GetSentFriendRequestActionFail {
    type: typeof GET_SENT_FRIEND_REQUESTS_FAIL;
    errorMessage: string;
}

export interface SendFriendRequestAction {
    type: typeof SEND_FRIEND_REQUEST;
    friendRequest: PopulatedFriendRequest;
}

export interface GetSentFriendRequestsIsLoadingAction {
    type: typeof GET_SENT_FRIEND_REQUESTS_IS_LOADING;
}

export interface GetSentFriendRequestsIsLoadedAction {
    type: typeof GET_SENT_FRIEND_REQUESTS_IS_LOADED;
}

export interface GetPendingFriendRequestsIsLoadingAction {
    type: typeof GET_PENDING_FRIEND_REQUESTS_IS_LOADING;
}

export interface GetPendingFriendRequestsIsLoadedAction {
    type: typeof GET_PENDING_FRIEND_REQUESTS_IS_LOADED;
}

export type FriendRequestActionTypes =
    | GetPendingFriendRequestsAction
    | GetPendingFriendRequestActionFail
    | AcceptFriendRequestAction
    | AcceptFriendRequestFailAction
    | ClearAcceptFriendRequestErrorMessageAction
    | AcceptFriendRequestIsLoadingAction
    | AcceptFriendRequestIsLoadedAction
    | RejectFriendRequestAction
    | RejectFriendRequestFailAction
    | ClearRejectFriendRequestErrorMessageAction
    | RejectFriendRequestIsLoadingAction
    | RejectFriendRequestIsLoadedAction
    | GetSentFriendRequestsAction
    | GetSentFriendRequestActionFail
    | SendFriendRequestAction
    | GetSentFriendRequestsIsLoadingAction
    | GetSentFriendRequestsIsLoadedAction
    | GetPendingFriendRequestsIsLoadingAction
    | GetPendingFriendRequestsIsLoadedAction;

export const GET_BADGES = 'GET_BADGES';
export const GET_BADGES_FAIL = 'GET_BADGES_FAIL';
export const GET_BADGES_IS_LOADING = 'GET_BADGES_IS_LOADING';
export const GET_BADGES_IS_LOADED = 'GET_BADGES_IS_LOADED';

export const GET_USER_BADGES = 'GET_USER_BADGES';
export const GET_USER_BADGES_FAIL = 'GET_USER_BADGES_FAIL';
export const GET_USER_BADGES_IS_LOADING = 'GET_USER_BADGES_IS_LOADING';
export const GET_USER_BADGES_IS_LOADED = 'GET_USER_BADGES_IS_LOADED';

export const GET_BADGE = 'GET_BADGE';
export const GET_BADGE_FAIL = 'GET_BADGE_FAIL';
export const GET_BADGE_LOADING = 'GET_BADGE_LOADING';
export const GET_BADGE_LOADED = 'GET_BADGE_LOADED';

export interface GetBadgesAction {
    type: typeof GET_BADGES;
    payload: Badge[];
}

export interface GetBadgesFailAction {
    type: typeof GET_BADGES_FAIL;
    payload: string;
}

export interface GetBadgesIsLoadingAction {
    type: typeof GET_BADGES_IS_LOADING;
}

export interface GetBadgesIsLoadedAction {
    type: typeof GET_BADGES_IS_LOADED;
}

export interface GetBadgeAction {
    type: typeof GET_BADGE;
    payload: UserBadge;
}

export interface GetBadgeFailAction {
    type: typeof GET_BADGE_FAIL;
}

export interface GetBadgeLoadingAction {
    type: typeof GET_BADGE_LOADING;
}

export interface GetBadgeLoadedAction {
    type: typeof GET_BADGE_LOADED;
}

export interface GetUserBadgesAction {
    type: typeof GET_USER_BADGES;
    payload: UserBadge[];
}

export interface GetUserBadgesFailAction {
    type: typeof GET_USER_BADGES_FAIL;
    payload: string;
}

export interface GetUserBadgesIsLoadingAction {
    type: typeof GET_USER_BADGES_IS_LOADING;
}

export interface GetUserBadgesIsLoadedAction {
    type: typeof GET_USER_BADGES_IS_LOADED;
}

export type BadgesActionTypes =
    | GetBadgesAction
    | GetBadgesFailAction
    | GetBadgesIsLoadingAction
    | GetBadgesIsLoadedAction
    | GetBadgeAction
    | GetBadgeFailAction
    | GetBadgeLoadingAction
    | GetBadgeLoadedAction
    | GetUserBadgesAction
    | GetUserBadgesFailAction
    | GetUserBadgesIsLoadingAction
    | GetUserBadgesIsLoadedAction;

export const GET_CHALLENGES = 'GET_CHALLENGES';
export const GET_CHALLENGES_FAIL = 'GET_CHALLENGES_FAIL';
export const GET_CHALLENGES_IS_LOADING = 'GET_CHALLENGES_IS_LOADING';
export const GET_CHALLENGES_IS_LOADED = 'GET_CHALLENGES_IS_LOADED';
export const GET_CHALLENGE = 'GET_CHALLENGE';
export const GET_CHALLENGE_FAIL = 'GET_CHALLENGE_FAIL';
export const GET_CHALLENGE_IS_LOADING = 'GET_CHALLENGE_IS_LOADING';
export const GET_CHALLENGE_IS_LOADED = 'GET_CHALLENGE_IS_LOADED';
export const JOIN_CHALLENGE = 'JOIN_CHALLENGE';
export const JOIN_CHALLENGE_FAIL = 'JOIN_CHALLENGE_FAIL';
export const JOIN_CHALLENGE_LOADING = 'JOIN_CHALLENGE_LOADING';
export const JOIN_CHALLENGE_LOADED = 'JOIN_CHALLENGE_LOADED';

export interface GetChallengesAction {
    type: typeof GET_CHALLENGES;
    payload: Challenge[];
}

export interface GetChallengesFailAction {
    type: typeof GET_CHALLENGES_FAIL;
    payload: string;
}

export interface GetChallengesIsLoadingAction {
    type: typeof GET_CHALLENGES_IS_LOADING;
}

export interface GetChallengesIsLoadedAction {
    type: typeof GET_CHALLENGES_IS_LOADED;
}

export interface GetChallengeAction {
    type: typeof GET_CHALLENGE;
    payload: PopulatedChallenge;
}

export interface GetChallengeFailAction {
    type: typeof GET_CHALLENGE_FAIL;
    payload: string;
}

export interface GetChallengeIsLoadingAction {
    type: typeof GET_CHALLENGE_IS_LOADING;
}

export interface GetChallengeIsLoadedAction {
    type: typeof GET_CHALLENGE_IS_LOADED;
}

export interface JoinChallengeAction {
    type: typeof JOIN_CHALLENGE;
}

export interface JoinChallengeFailAction {
    type: typeof JOIN_CHALLENGE_FAIL;
    payload: string;
}

export interface JoinChallengeIsLoadingAction {
    type: typeof JOIN_CHALLENGE_LOADING;
}

export interface JoinChallengeIsLoadedAction {
    type: typeof JOIN_CHALLENGE_LOADED;
}

export type ChallengeActionTypes =
    | GetChallengesAction
    | GetChallengesFailAction
    | GetChallengesIsLoadingAction
    | GetChallengesIsLoadedAction
    | GetChallengeAction
    | GetChallengeFailAction
    | GetChallengeIsLoadingAction
    | GetChallengeIsLoadedAction
    | JoinChallengeAction
    | JoinChallengeFailAction
    | JoinChallengeIsLoadingAction
    | JoinChallengeIsLoadedAction;

export const GET_LIVE_CHALLENGE_STREAKS = 'GET_CHALLENGE_STREAKS';
export const GET_LIVE_CHALLENGE_STREAKS_FAIL = 'GET_CHALLENGE_STREAKS_FAIL';
export const GET_LIVE_CHALLENGE_STREAKS_LOADING = 'GET_CHALLENGE_STREAKS_LOADING';
export const GET_LIVE_CHALLENGE_STREAKS_LOADED = 'GET_CHALLENGE_STREAKS_LOADED';

export const GET_ARCHIVED_CHALLENGE_STREAKS = 'GET_ARCHIVED_CHALLENGE_STREAKS';
export const GET_ARCHIVED_CHALLENGE_STREAKS_FAIL = 'GET_ARCHIVED_CHALLENGE_STREAKS_FAIL';
export const GET_ARCHIVED_CHALLENGE_STREAKS_LOADING = 'GET_ARCHIVED_CHALLENGE_STREAKS_LOADING';
export const GET_ARCHIVED_CHALLENGE_STREAKS_LOADED = 'GET_ARCHIVED_CHALLENGE_STREAKS_LOADED';

export const GET_SELECTED_LIVE_CHALLENGE_STREAK = 'GET_SELECTED_LIVE_CHALLENGE_STREAK';
export const GET_SELECTED_LIVE_CHALLENGE_STREAK_FAIL = 'GET_SELECTED_LIVE_CHALLENGE_STREAK_FAIL';
export const GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADING = 'GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADING';
export const GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADED = 'GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADED';

export const GET_SELECTED_ARCHIVED_CHALLENGE_STREAK = 'GET_SELECTED_ARCHIVED_CHALLENGE_STREAK';
export const GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_FAIL = 'GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_FAIL';
export const GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADING = 'GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADING';
export const GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADED = 'GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADED';

export const ARCHIVE_CHALLENGE_STREAK = 'ARCHIVE_CHALLENGE_STREAK';
export const ARCHIVE_CHALLENGE_STREAK_FAIL = 'ARCHIVE_CHALLENGE_STREAK_FAIL';
export const ARCHIVE_CHALLENGE_STREAK_LOADING = 'ARCHIVE_CHALLENGE_STREAK_LOADING';
export const ARCHIVE_CHALLENGE_STREAK_LOADED = 'ARCHIVE_CHALLENGE_STREAK_LOADED';
export const CLEAR_ARCHIVE_CHALLENGE_STREAK_ERROR_MESSAGE = 'CLEAR_ARCHIVE_CHALLENGE_STREAK_ERROR_MESSAGE';

export const RESTORE_ARCHIVED_CHALLENGE_STREAK = 'RESTORE_ARCHIVED_CHALLENGE_STREAK';
export const RESTORE_ARCHIVED_CHALLENGE_STREAK_FAIL = 'RESTORE_ARCHIVED_CHALLENGE_STREAK_FAIL';
export const RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADING = 'RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADING';
export const RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED = 'RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED';
export const CLEAR_RESTORE_ARCHIVED_CHALLENGE_STREAK_ERROR_MESSAGE =
    'CLEAR_RESTORE_ARCHIVED_CHALLENGE_STREAK_ERROR_MESSAGE';

export const DELETE_ARCHIVED_CHALLENGE_STREAK = 'DELETE_ARCHIVED_CHALLENGE_STREAK';
export const DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL = 'DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL';
export const DELETE_ARCHIVED_CHALLENGE_STREAK_LOADING = 'DELETE_ARCHIVED_CHALLENGE_STREAK_LOADING';
export const DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED = 'DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED';

export const CREATE_CHALLENGE_STREAK = 'CREATE_CHALLENGE_STREAK';
export const CREATE_CHALLENGE_STREAK_FAIL = 'CREATE_CHALLENGE_STREAK_FAIL';
export const CREATE_CHALLENGE_STREAK_LOADING = 'CREATE_CHALLENGE_STREAK_LOADING';
export const CREATE_CHALLENGE_STREAK_LOADED = 'CREATE_CHALLENGE_STREAK_LOADED';
export const CREATE_COMPLETE_CHALLENGE_STREAK_TASK = 'CREATE_COMPLETE_CHALLENGE_STREAK_TASK ';
export const CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL = 'CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL';
export const CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING = 'CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING';
export const CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED = 'CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED';
export const CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK = 'CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK';
export const CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL = 'CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL';
export const CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING = 'CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING';
export const CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED = 'CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED';
export const UPDATE_CHALLENGE_STREAK_TIMEZONES = 'UPDATE_CHALLENGE_STREAK_TIMEZONES';
export const UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL = 'UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL';

export interface GetLiveChallengeStreaksAction {
    type: typeof GET_LIVE_CHALLENGE_STREAKS;
    payload: ChallengeStreakWithClientData[];
}

export interface GetLiveChallengeStreaksFailAction {
    type: typeof GET_LIVE_CHALLENGE_STREAKS_FAIL;
    payload: string;
}

export interface GetLiveChallengeStreaksIsLoadingAction {
    type: typeof GET_LIVE_CHALLENGE_STREAKS_LOADING;
}

export interface GetLiveChallengeStreaksIsLoadedAction {
    type: typeof GET_LIVE_CHALLENGE_STREAKS_LOADED;
}

export interface GetArchivedChallengeStreaksAction {
    type: typeof GET_ARCHIVED_CHALLENGE_STREAKS;
    payload: ChallengeStreakWithClientData[];
}

export interface GetArchivedChallengeStreaksFailAction {
    type: typeof GET_ARCHIVED_CHALLENGE_STREAKS_FAIL;
    payload: string;
}

export interface GetArchivedChallengeStreaksIsLoadingAction {
    type: typeof GET_ARCHIVED_CHALLENGE_STREAKS_LOADING;
}

export interface GetArchivedChallengeStreaksIsLoadedAction {
    type: typeof GET_ARCHIVED_CHALLENGE_STREAKS_LOADED;
}

export interface GetSelectedLiveChallengeStreakAction {
    type: typeof GET_SELECTED_LIVE_CHALLENGE_STREAK;
    payload: ChallengeStreakWithClientData;
}

export interface GetSelectedLiveChallengeStreakFailAction {
    type: typeof GET_SELECTED_LIVE_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface GetSelectedLiveChallengeStreakIsLoadingAction {
    type: typeof GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADING;
}

export interface GetSelectedLiveChallengeStreakIsLoadedAction {
    type: typeof GET_SELECTED_LIVE_CHALLENGE_STREAK_LOADED;
}

export interface GetSelectedArchivedChallengeStreakAction {
    type: typeof GET_SELECTED_ARCHIVED_CHALLENGE_STREAK;
    payload: ChallengeStreakWithClientData;
}

export interface GetSelectedArchivedChallengeStreakFailAction {
    type: typeof GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface GetSelectedArchivedChallengeStreakIsLoadingAction {
    type: typeof GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADING;
}

export interface GetSelectedArchivedChallengeStreakIsLoadedAction {
    type: typeof GET_SELECTED_ARCHIVED_CHALLENGE_STREAK_LOADED;
}

export interface ArchiveChallengeStreakAction {
    type: typeof ARCHIVE_CHALLENGE_STREAK;
    payload: ChallengeStreakWithClientData;
}

export interface ArchiveChallengeStreakFailAction {
    type: typeof ARCHIVE_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface ArchiveChallengeStreakIsLoadingAction {
    type: typeof ARCHIVE_CHALLENGE_STREAK_LOADING;
}

export interface ClearArchiveChallengeStreakErrorMessageAction {
    type: typeof CLEAR_ARCHIVE_CHALLENGE_STREAK_ERROR_MESSAGE;
}

export interface ArchiveChallengeStreakIsLoadedAction {
    type: typeof ARCHIVE_CHALLENGE_STREAK_LOADED;
}

export interface RestoreArchivedChallengeStreakAction {
    type: typeof RESTORE_ARCHIVED_CHALLENGE_STREAK;
    payload: ChallengeStreakWithClientData;
}

export interface RestoreArchivedChallengeStreakFailAction {
    type: typeof RESTORE_ARCHIVED_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface RestoreArchivedChallengeStreakIsLoadingAction {
    type: typeof RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADING;
}

export interface RestoreArchivedChallengeStreakIsLoadedAction {
    type: typeof RESTORE_ARCHIVED_CHALLENGE_STREAK_LOADED;
}

export interface ClearRestoreArchivedChallengeStreakErrorMessageAction {
    type: typeof CLEAR_RESTORE_ARCHIVED_CHALLENGE_STREAK_ERROR_MESSAGE;
}

export interface DeleteArchivedChallengeStreakAction {
    type: typeof DELETE_ARCHIVED_CHALLENGE_STREAK;
    payload: string;
}

export interface DeleteArchivedChallengeStreakFailAction {
    type: typeof DELETE_ARCHIVED_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface DeleteArchivedChallengeStreakIsLoadingAction {
    type: typeof DELETE_ARCHIVED_CHALLENGE_STREAK_LOADING;
}

export interface DeleteArchivedChallengeStreakIsLoadedAction {
    type: typeof DELETE_ARCHIVED_CHALLENGE_STREAK_LOADED;
}

export interface CreateChallengeStreakAction {
    type: typeof CREATE_CHALLENGE_STREAK;
    payload: ChallengeStreakWithClientData;
}

export interface CreateChallengeStreakFailAction {
    type: typeof CREATE_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface CreateChallengeStreakIsLoadingAction {
    type: typeof CREATE_CHALLENGE_STREAK_LOADING;
}

export interface CreateChallengeStreakIsLoadedAction {
    type: typeof CREATE_CHALLENGE_STREAK_LOADED;
}

export interface CreateCompleteChallengeStreakTaskAction {
    type: typeof CREATE_COMPLETE_CHALLENGE_STREAK_TASK;
    payload: string;
}

export interface CreateCompleteChallengeStreakTaskFailAction {
    type: typeof CREATE_COMPLETE_CHALLENGE_STREAK_TASK_FAIL;
    payload: { challengeStreakId: string; errorMessage: string };
}

export interface CreateCompleteChallengeStreakTaskLoadingAction {
    type: typeof CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADING;
    challengeStreakId: string;
}

export interface CreateCompleteChallengeStreakTaskLoadedAction {
    type: typeof CREATE_COMPLETE_CHALLENGE_STREAK_TASK_LOADED;
    challengeStreakId: string;
}

export interface CreateIncompleteChallengeStreakTaskAction {
    type: typeof CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK;
    payload: string;
}

export interface CreateIncompleteChallengeStreakTaskFailAction {
    type: typeof CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_FAIL;
    payload: { challengeStreakId: string; errorMessage: string };
}

export interface CreateIncompleteChallengeStreakTaskLoadingAction {
    type: typeof CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADING;
    challengeStreakId: string;
}

export interface CreateIncompleteChallengeStreakTaskLoadedAction {
    type: typeof CREATE_INCOMPLETE_CHALLENGE_STREAK_TASK_LOADED;
    challengeStreakId: string;
}

export interface UpdateChallengeStreaksTimezoneAction {
    type: typeof UPDATE_CHALLENGE_STREAK_TIMEZONES;
    payload: string;
}

export interface UpdateChallengeStreaksTimezoneActionFail {
    type: typeof UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL;
    payload: string;
}

export type ChallengeStreakActionTypes =
    | GetLiveChallengeStreaksAction
    | GetLiveChallengeStreaksFailAction
    | GetLiveChallengeStreaksIsLoadingAction
    | GetLiveChallengeStreaksIsLoadedAction
    | GetArchivedChallengeStreaksAction
    | GetArchivedChallengeStreaksFailAction
    | GetArchivedChallengeStreaksIsLoadingAction
    | GetArchivedChallengeStreaksIsLoadedAction
    | GetSelectedLiveChallengeStreakAction
    | GetSelectedLiveChallengeStreakFailAction
    | GetSelectedLiveChallengeStreakIsLoadingAction
    | GetSelectedLiveChallengeStreakIsLoadedAction
    | GetSelectedArchivedChallengeStreakAction
    | GetSelectedArchivedChallengeStreakFailAction
    | GetSelectedArchivedChallengeStreakIsLoadingAction
    | GetSelectedArchivedChallengeStreakIsLoadedAction
    | ArchiveChallengeStreakAction
    | ArchiveChallengeStreakFailAction
    | ArchiveChallengeStreakIsLoadingAction
    | ArchiveChallengeStreakIsLoadedAction
    | ClearArchiveChallengeStreakErrorMessageAction
    | RestoreArchivedChallengeStreakAction
    | RestoreArchivedChallengeStreakFailAction
    | RestoreArchivedChallengeStreakIsLoadingAction
    | RestoreArchivedChallengeStreakIsLoadedAction
    | ClearRestoreArchivedChallengeStreakErrorMessageAction
    | DeleteArchivedChallengeStreakAction
    | DeleteArchivedChallengeStreakFailAction
    | DeleteArchivedChallengeStreakIsLoadingAction
    | DeleteArchivedChallengeStreakIsLoadedAction
    | CreateChallengeStreakAction
    | CreateChallengeStreakFailAction
    | CreateChallengeStreakIsLoadingAction
    | CreateChallengeStreakIsLoadedAction
    | CreateCompleteChallengeStreakTaskAction
    | CreateCompleteChallengeStreakTaskFailAction
    | CreateCompleteChallengeStreakTaskLoadingAction
    | CreateCompleteChallengeStreakTaskLoadedAction
    | CreateIncompleteChallengeStreakTaskAction
    | CreateIncompleteChallengeStreakTaskFailAction
    | CreateIncompleteChallengeStreakTaskLoadingAction
    | CreateIncompleteChallengeStreakTaskLoadedAction
    | UpdateChallengeStreaksTimezoneAction
    | UpdateChallengeStreaksTimezoneActionFail;

export const GET_NOTES = 'GET_NOTES';
export const GET_NOTES_FAIL = 'GET_NOTES_FAIL';
export const GET_NOTES_LOADING = 'GET_NOTES_LOADING';
export const GET_NOTES_LOADED = 'GET_NOTES_LOADED';
export const GET_NOTE = 'GET_NOTE';
export const GET_NOTE_FAIL = 'GET_NOTE_FAIL';
export const GET_NOTE_LOADING = 'GET_NOTE_LOADING';
export const GET_NOTE_LOADED = 'GET_NOTE_LOADED';
export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTE_FAIL = 'CREATE_NOTE_FAIL';
export const CREATE_NOTE_LOADING = 'CREATE_NOTE_LOADING';
export const CREATE_NOTE_LOADED = 'CREATE_NOTE_LOADED';

export interface GetNotesAction {
    type: typeof GET_NOTES;
    payload: Note[];
}

export interface GetNotesFailAction {
    type: typeof GET_NOTES_FAIL;
    payload: string;
}

export interface GetNotesLoadingAction {
    type: typeof GET_NOTES_LOADING;
}

export interface GetNotesLoadedAction {
    type: typeof GET_NOTES_LOADED;
}

export interface GetNoteAction {
    type: typeof GET_NOTE;
}

export interface GetNoteFailAction {
    type: typeof GET_NOTE_FAIL;
}

export interface GetNoteLoadingAction {
    type: typeof GET_NOTE_LOADING;
}

export interface GetNoteLoadedAction {
    type: typeof GET_NOTE_LOADED;
}

export interface CreateNoteAction {
    type: typeof CREATE_NOTE;
}

export interface CreateNoteFailAction {
    type: typeof CREATE_NOTE_FAIL;
}

export interface CreateNoteLoadingAction {
    type: typeof CREATE_NOTE_LOADING;
}

export interface CreateNoteLoadedAction {
    type: typeof CREATE_NOTE_LOADED;
}

export type NotesActionTypes =
    | GetNotesAction
    | GetNotesFailAction
    | GetNotesLoadingAction
    | GetNotesLoadedAction
    | GetNoteAction
    | GetNoteFailAction
    | GetNoteLoadingAction
    | GetNotesLoadedAction
    | CreateNoteAction
    | CreateNoteFailAction
    | CreateNoteLoadingAction
    | CreateNoteLoadedAction;

export type AppActions =
    | NavigationActionTypes
    | AuthActionTypes
    | SoloStreakActionTypes
    | StreakRecommendationsActionTypes
    | TeamStreakActionTypes
    | UserActionTypes
    | FriendRequestActionTypes
    | BadgesActionTypes
    | ChallengeActionTypes
    | ChallengeStreakActionTypes
    | NotesActionTypes;
