import {
    PopulatedTeamStreakWithClientData,
    PopulatedTeamMemberWithClientData,
    SelectedTeamStreak,
} from '../reducers/teamStreakReducer';
import { SoloStreakListItem, ArchivedSoloStreakListItem, SelectedSoloStreak } from '../reducers/soloStreakReducer';
import {
    PopulatedCurrentUserWithClientData,
    FormattedUserWithClientData,
    SelectedUser,
    FollowingWithClientData,
} from '../reducers/userReducer';
import CognitoPayload from '../cognitoPayload';
import { StreakRecommendationWithClientData } from '../reducers/streakRecommendationsReducer';
import {
    SelectedChallengeStreak,
    ChallengeStreakListItem,
    ArchivedChallengeStreakListItem,
} from '../reducers/challengeStreakReducer';
import { NoteWithClientData } from '../reducers/notesReducer';
import { SelectedChallenge } from '../reducers/challengesReducer';
import { SelectedTeamMemberStreak } from '../reducers/teamMemberStreakReducer';
import {
    SoloStreakLeaderboardItem,
    TeamStreakLeaderboardItem,
    ChallengeStreakLeaderboardItem,
} from '../reducers/leaderboardReducer';
import ClientActivityFeedItemType from '../helpers/activityFeed/ClientActivityFeedItem';
import {
    CustomStreakReminder,
    CompleteAllStreaksReminder,
    CustomSoloStreakReminder,
    CustomTeamStreakReminder,
    CustomChallengeStreakReminder,
} from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import { FormattedUser } from '@streakoid/streakoid-models/lib/Models/FormattedUser';
import { ProfileImages } from '@streakoid/streakoid-models/lib/Models/ProfileImages';
import { Challenge } from '@streakoid/streakoid-models/lib/Models/Challenge';
import { Note } from '@streakoid/streakoid-models/lib/Models/Note';
import { DatabaseStats } from '@streakoid/streakoid-models/lib/Models/DatabaseStats';
import { BasicUser } from '@streakoid/streakoid-models/lib/Models/BasicUser';
import { PopulatedTeamStreak } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamStreak';

export const NAVIGATE_TO_HOME = 'NAVIGATE_TO_HOME';
export const NAVIGATE_TO_LOGIN = 'NAVIGATE_TO_LOGIN';
export const NAVIGATE_TO_UPDATE_PASSWORD = 'NAVIGATE_TO_UPDATE_PASSWORD';
export const NAVIGATE_TO_SPECIFIC_SOLO_STREAK = 'NAVIGATE_TO_SPECIFIC_SOLO_STREAK';
export const NAVIGATE_TO_THANK_YOU = 'NAVIGATE_TO_THANK_YOU';
export const NAVIGATE_TO_SPECIFIC_TEAM_STREAK = 'NAVIGATE_TO_SPECIFIC_TEAM_STREAK';
export const NAVIGATE_TO_SPECIFIC_CHALLENGE_STREAK = 'NAVIGATE_TO_SPECIFIC_CHALLENGE_STREAK';
export const NAVIGATE_TO_PAYMENT = 'NAVIGATE_TO_PAYMENT';
export const NAVIGATE_TO_STREAK_LIMIT_REACHED = 'NAVIGATE_TO_STREAK_LIMIT_REACHED';
export const NAVIGATE_TO_WELCOME = 'NAVIGATE_TO_WELCOME';
export const NAVIGATE_TO_VERIFY_EMAIL = 'NAVIGATE_TO_VERIFY_EMAIL';
export const NAVIGATE_TO_CHOOSE_PASSWORD = 'NAVIGATE_TO_CHOOSE_PASSWORD';
export const NAVIGATE_TO_COMPLETED_REGISTRATION = 'NAVIGATE_TO_COMPLETED_REGISTRATION';
export const NAVIGATE_TO_CHOOSE_A_PROFILE_PICTURE = 'NAVIGATE_TO_CHOOSE_A_PROFILE_PICTURE';
export const NAVIGATE_TO_ADD_TEAM_MEMBER = 'NAVIGATE_TO_ADD_TEAM_MEMBER';

export interface NavigateToHomeAction {
    type: typeof NAVIGATE_TO_HOME;
}

export interface NavigateToVerifyEmailAction {
    type: typeof NAVIGATE_TO_VERIFY_EMAIL;
}

export interface NavigateToLoginAction {
    type: typeof NAVIGATE_TO_LOGIN;
}

export interface NavigateToUpdatePasswordAction {
    type: typeof NAVIGATE_TO_UPDATE_PASSWORD;
}

export interface NavigateToSpecificSoloStreakAction {
    type: typeof NAVIGATE_TO_SPECIFIC_SOLO_STREAK;
    payload: string;
}

export interface NavigateToThankYouAction {
    type: typeof NAVIGATE_TO_THANK_YOU;
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

export interface NavigateToSpecificChallengeStreakAction {
    type: typeof NAVIGATE_TO_SPECIFIC_CHALLENGE_STREAK;
    payload: string;
}

export interface NavigateToChoosePasswordAction {
    type: typeof NAVIGATE_TO_CHOOSE_PASSWORD;
}

export interface NavigateToCompletedRegistrationAction {
    type: typeof NAVIGATE_TO_COMPLETED_REGISTRATION;
}

export interface NavigateToChooseAProfilePictureAction {
    type: typeof NAVIGATE_TO_CHOOSE_A_PROFILE_PICTURE;
}

export interface NavigateToAddTeamMember {
    type: typeof NAVIGATE_TO_ADD_TEAM_MEMBER;
    payload: { teamStreakId: string };
}

export type NavigationActionTypes =
    | NavigateToHomeAction
    | NavigateToVerifyEmailAction
    | NavigateToLoginAction
    | NavigateToUpdatePasswordAction
    | NavigateToSpecificSoloStreakAction
    | NavigateToWelcomeAction
    | NavigateToThankYouAction
    | NavigateToSpecificTeamStreakAction
    | NavigateToPaymentAction
    | NavigateToStreakLimitReachedAction
    | NavigateToSpecificChallengeStreakAction
    | NavigateToChoosePasswordAction
    | NavigateToCompletedRegistrationAction
    | NavigateToChooseAProfilePictureAction
    | NavigateToAddTeamMember;

export const AUTH_ERROR = 'AUTH_ERROR';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_IS_LOADING = 'LOGIN_IS_LOADING';
export const LOGIN_IS_LOADED = 'LOGIN_IS_LOADED';
export const CLEAR_LOG_IN_ERROR_MESSAGE = 'CLEAR_LOGIN_ERROR_MESSAGE';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN_FAIL';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const SESSION_EXPIRED = 'SESSION_EXPIRED';
export const CLEAR_REGISTRATION_ERROR_MESSAGE = 'CLEAR_REGISTRATION_ERROR_MESSAGE';

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
export const CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE = 'CLEAR_FORGOT_PASSWORD_ERROR_MESSAGE';

export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL';
export const UPDATE_PASSWORD_IS_LOADING = 'UPDATE_PASSWORD_IS_LOADING';
export const UPDATE_PASSWORD_IS_LOADED = 'UPDATE_PASSWORD_IS_LOADED';
export const CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE = 'CLEAR_UPDATE_PASSWORD_SUCCESS_MESSAGE';
export const CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE = 'CLEAR_UPDATE_PASSWORD_ERROR_MESSAGE';

export const REGISTER_WITH_IDENTIFIER_USER_FAIL = 'REGISTER_WITH_IDENTIFIER_USER_FAIL';
export const REGISTER_WITH_IDENTIFIER_USER_IS_LOADING = 'REGISTER_WITH_IDENTIFIER_USER_IS_LOADING';
export const REGISTER_WITH_IDENTIFIER_USER_IS_LOADED = 'REGISTER_WITH_IDENTIFIER_USER_IS_LOADED';

export const VERIFY_EMAIL_FAIL = 'VERIFY_EMAIL_FAIL';
export const CLEAR_VERIFY_EMAIL_ERROR_MESSAGE = 'CLEAR_VERIFY_EMAIL_ERROR_MESSAGE';
export const VERIFY_EMAIL_IS_LOADING = 'VERIFY_EMAIL_IS_LOADING';
export const VERIFY_EMAIL_IS_LOADED = 'VERIFY_EMAIL_IS_LOADED';

export const FORGOT_PASSWORD_IS_LOADING = 'FORGOT_PASSWORD_IS_LOADING';
export const FORGOT_PASSWORD_IS_LOADED = 'FORGOT_PASSWORD_IS_LOADED';

export const UPDATE_USER_PASSWORD_FAIL = 'UPDATE_USER_PASSWORD_FAIL';
export const UPDATE_USER_PASSWORD_IS_LOADING = 'UPDATE_USER_PASSWORD_IS_LOADING';
export const UPDATE_USER_PASSWORD_IS_LOADED = 'UPDATE_USER_PASSWORD_IS_LOADED';

export const UPDATE_USER_EMAIL_ATTRIBUTE_FAIL = 'UPDATE_USER_EMAIL_ATTRIBUTE_FAIL';
export const UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADING = 'UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADING';
export const UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADED = 'UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADED';
export const CLEAR_UPDATE_USER_EMAIL_ATTRIBUTE_ERROR_MESSAGE = 'CLEAR_UPDATE_USER_EMAIL_ATTRIBUTE_ERROR_MESSAGE';

export const UPDATE_USERNAME_ATTRIBUTE_FAIL = 'UPDATE_USERNAME_ATTRIBUTE_FAIL';
export const UPDATE_USERNAME_ATTRIBUTE_IS_LOADING = 'UPDATE_USERNAME_ATTRIBUTE_IS_LOADING';
export const UPDATE_USERNAME_ATTRIBUTE_IS_LOADED = 'UPDATE_USERNAME_ATTRIBUTE_IS_LOADED';
export const CLEAR_UPDATE_USERNAME_ATTRIBUTE_ERROR_MESSAGE = 'CLEAR_UPDATE_USERNAME_ATTRIBUTE_ERROR_MESSAGE';

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

export interface ClearRegistrationErrorMessageAction {
    type: typeof CLEAR_REGISTRATION_ERROR_MESSAGE;
}

export interface VerifyEmailFailAction {
    type: typeof VERIFY_EMAIL_FAIL;
    errorMessage: string;
}

export interface ClearVerifyEmailErrorMessageAction {
    type: typeof CLEAR_VERIFY_EMAIL_ERROR_MESSAGE;
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

export interface RegisterWithIdentifierUserFailAction {
    type: typeof REGISTER_WITH_IDENTIFIER_USER_FAIL;
    errorMessage: string;
}

export interface RegisterWithIdentifierUserIsLoadingAction {
    type: typeof REGISTER_WITH_IDENTIFIER_USER_IS_LOADING;
}

export interface RegisterWithIdentifierUserIsLoadedAction {
    type: typeof REGISTER_WITH_IDENTIFIER_USER_IS_LOADED;
}

export interface LoginIsLoadingAction {
    type: typeof LOGIN_IS_LOADING;
}

export interface LoginIsLoadedAction {
    type: typeof LOGIN_IS_LOADED;
}

export interface VerifyEmailIsLoadingAction {
    type: typeof VERIFY_EMAIL_IS_LOADING;
}

export interface VerifyEmailIsLoadedAction {
    type: typeof VERIFY_EMAIL_IS_LOADED;
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

export interface UpdateUserPasswordFailAction {
    type: typeof UPDATE_USER_PASSWORD_FAIL;
    payload: { errorMessage: string };
}

export interface UpdateUserPasswordIsLoadingAction {
    type: typeof UPDATE_USER_PASSWORD_IS_LOADING;
}

export interface UpdateUserPasswordIsLoadedAction {
    type: typeof UPDATE_USER_PASSWORD_IS_LOADED;
}

export interface UpdateUserEmailAttributeFailAction {
    type: typeof UPDATE_USER_EMAIL_ATTRIBUTE_FAIL;
    payload: { errorMessage: string };
}

export interface UpdateUserEmailAttributeIsLoadingAction {
    type: typeof UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADING;
}

export interface UpdateUserEmailAttributeIsLoadedAction {
    type: typeof UPDATE_USER_EMAIL_ATTRIBUTE_IS_LOADED;
}

export interface ClearUpdateUserEmailAttributeErrorMessageAction {
    type: typeof CLEAR_UPDATE_USER_EMAIL_ATTRIBUTE_ERROR_MESSAGE;
}

export interface UpdateUsernameAttributeFailAction {
    type: typeof UPDATE_USERNAME_ATTRIBUTE_FAIL;
    payload: { errorMessage: string };
}

export interface UpdateUsernameAttributeIsLoadingAction {
    type: typeof UPDATE_USERNAME_ATTRIBUTE_IS_LOADING;
}

export interface UpdateUsernameAttributeIsLoadedAction {
    type: typeof UPDATE_USERNAME_ATTRIBUTE_IS_LOADED;
}

export interface ClearUpdateUsernameAttributeErrorMessageAction {
    type: typeof CLEAR_UPDATE_USERNAME_ATTRIBUTE_ERROR_MESSAGE;
}

export type AuthActionTypes =
    | LoginSuccessAction
    | LoginFailAction
    | RefreshTokenAction
    | RefreshTokenFailAction
    | LogoutSuccessAction
    | ClearLogInErrorMessageAction
    | SessionExpiredAction
    | ClearRegistrationErrorMessageAction
    | VerifyEmailFailAction
    | ClearVerifyEmailErrorMessageAction
    | ForgotPasswordSuccessAction
    | ForgotPasswordFailAction
    | ClearForgotPasswordErrorMessage
    | UpdatePasswordSuccessAction
    | ClearUpdatePasswordSuccessMessage
    | UpdatePasswordFailAction
    | ClearUpdatePasswordErrorMessage
    | RegisterWithIdentifierUserFailAction
    | RegisterWithIdentifierUserIsLoadingAction
    | RegisterWithIdentifierUserIsLoadedAction
    | LoginIsLoadingAction
    | LoginIsLoadedAction
    | VerifyEmailIsLoadingAction
    | VerifyEmailIsLoadedAction
    | ForgotPasswordIsLoadingAction
    | ForgotPasswordIsLoadedAction
    | NewPasswordIsLoadingAction
    | NewPasswordIsLoadedAction
    | UpdateUserPasswordFailAction
    | UpdateUserPasswordIsLoadingAction
    | UpdateUserPasswordIsLoadedAction
    | UpdateUserEmailAttributeFailAction
    | UpdateUserEmailAttributeIsLoadingAction
    | UpdateUserEmailAttributeIsLoadedAction
    | ClearUpdateUserEmailAttributeErrorMessageAction
    | UpdateUsernameAttributeFailAction
    | UpdateUsernameAttributeIsLoadingAction
    | UpdateUsernameAttributeIsLoadedAction
    | ClearUpdateUsernameAttributeErrorMessageAction;

export const GET_LIVE_SOLO_STREAKS = 'GET_LIVE_SOLO_STREAKS';
export const GET_LIVE_SOLO_STREAKS_FAIL = 'GET_LIVE_SOLO_STREAKS_FAIL';
export const GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING = 'GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADING';
export const GET_MULTIPLE_LIVE_SOLO_STREAKS_IS_LOADED = 'GET_MULTIPLE_SOLO_STREAKS_IS_LOADED';

export const GET_ARCHIVED_SOLO_STREAKS = 'GET_ARCHIVED_SOLO_STREAKS';
export const GET_ARCHIVED_SOLO_STREAKS_FAIL = 'GET_ARCHIVED_SOLO_STREAKS_FAIL';
export const GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING = 'GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADING';
export const GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED = 'GET_MULTIPLE_ARCHIVED_SOLO_STREAKS_IS_LOADED';

export const GET_SOLO_STREAK = 'GET_SOLO_STREAK';
export const GET_SOLO_STREAK_FAIL = 'GET_SOLO_STREAK_FAIL';
export const GET_SOLO_STREAK_IS_LOADING = 'GET_SOLO_STREAK_IS_LOADING';
export const GET_SOLO_STREAK_IS_LOADED = 'GET_SOLO_STREAK_IS_LOADED';

export const CREATE_SOLO_STREAK = 'CREATE_SOLO_STREAK';
export const CREATE_SOLO_STREAK_ERROR = 'CREATE_SOLO_STREAK_ERROR';
export const CREATE_SOLO_STREAK_IS_LOADING = 'CREATE_SOLO_STREAK_IS_LOADING';
export const CREATE_SOLO_STREAK_IS_LOADED = 'CREATE_SOLO_STREAK_IS_LOADED';
export const CLEAR_CREATE_SOLO_STREAK_ERROR = 'CLEAR_CREATE_SOLO_STREAK_ERROR';

export const EDIT_SOLO_STREAK = 'EDIT_SOLO_STREAK';
export const EDIT_SOLO_STREAK_FAIL = 'EDIT_SOLO_STREAK_FAIL';
export const EDIT_SOLO_STREAK_IS_LOADING = 'EDIT_SOLO_STREAK_IS_LOADING';
export const EDIT_SOLO_STREAK_IS_LOADED = 'EDIT_SOLO_STREAK_IS_LOADED';

export const CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE = 'CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE';

export const CREATE_COMPLETE_SOLO_STREAK_LIST_TASK = 'CREATE_COMPLETE__SOLO_STREAK_TASK';
export const CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_FAIL = 'CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_FAIL';
export const CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADING = 'CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADING';
export const CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED = 'CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED';

export const CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK = 'CREATE_INCOMPLETE__SOLO_STREAK_TASK';
export const CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_FAIL = 'CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_FAIL';
export const CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADING = 'CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADING';
export const CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADED = 'CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADED';

export const UPDATE_SOLO_STREAK_TIMEZONES = 'UPDATE_SOLO_STREAK_TIMEZONES';
export const UPDATE_SOLO_STREAK_TIMEZONES_FAIL = 'UPDATE_SOLO_STREAK_TIMEZONES_FAIL';

export const ARCHIVE_SOLO_STREAK = 'ARCHIVE_SOLO_STREAK';
export const ARCHIVE_SOLO_STREAK_FAIL = 'ARCHIVE_SOLO_STREAK_FAIL';
export const ARCHIVE_SOLO_STREAK_IS_LOADING = 'ARCHIVE_SOLO_STREAK_IS_LOADING';
export const ARCHIVE_SOLO_STREAK_IS_LOADED = 'ARCHIVE_SOLO_STREAK_IS_LOADED';
export const CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE = 'CLEAR_ARCHIVE_SOLO_STREAK_ERROR_MESSAGE';

export const RESTORE_ARCHIVED_SOLO_STREAK = 'RESTORE_ARCHIVED_SOLO_STREAK';
export const RESTORE_ARCHIVED_SOLO_STREAK_FAIL = 'RESTORE_ARCHIVED_SOLO_STREAK_FAIL';
export const RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING = 'RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADING';
export const RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED = 'RESTORE_ARCHIVED_SOLO_STREAK_IS_LOADED';
export const CLEAR_RESTORE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE = 'CLEAR_RESTORE_ACHIVED_SOLO_STREAK_ERROR_MESSAGE';

export const DELETE_ARCHIVED_SOLO_STREAK = 'DELETE_ARCHIVED_SOLO_STREAK';
export const DELETE_ARCHIVED_SOLO_STREAK_FAIL = 'DELETE_ARCHIVED_SOLO_STREAK_FAIL';
export const DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING = 'DELETE_ARCHIVED_SOLO_STREAK_IS_LOADING';
export const DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED = 'DELETE_ARCHIVED_SOLO_STREAK_IS_LOADED';
export const CLEAR_DELETE_ARCHIVED_SOLO_STREAK_ERROR_MESSAGE = 'DELETE_ACHIVED_SOLO_STREAK_ERROR_MESSAGE';

export const CLEAR_SELECTED_SOLO_STREAK = 'CLEAR_SELECTED_SOLO_STREAK';

export const COMPLETE_SELECTED_SOLO_STREAK = 'COMPLETE_SELECTED_SOLO_STREAK';
export const COMPLETE_SELECTED_SOLO_STREAK_FAIL = 'COMPLETE_SELECTED_SOLO_STREAK_FAIL';
export const COMPLETE_SELECTED_SOLO_STREAK_IS_LOADING = 'COMPLETE_SELECTED_SOLO_STREAK_IS_LOADING';
export const COMPLETE_SELECTED_SOLO_STREAK_IS_LOADED = 'COMPLETE_SELECTED_SOLO_STREAK_IS_LOADED';

export const INCOMPLETE_SELECTED_SOLO_STREAK = 'INCOMPLETE_SELECTED_SOLO_STREAK';
export const INCOMPLETE_SELECTED_SOLO_STREAK_FAIL = 'INCOMPLETE_SELECTED_SOLO_STREAK_FAIL';
export const INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADING = 'INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADING';
export const INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADED = 'INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADED';

export const UPDATE_SOLO_STREAK_REMINDER_INFO = 'UPDATE_SOLO_STREAK_REMINDER_INFO';
export const UPDATE_SOLO_STREAK_REMINDER_INFO_FAIL = 'UPDATE_SOLO_STREAK_REMINDER_INFO_FAIL';
export const UPDATE_SOLO_STREAK_REMINDER_INFO_LOADING = 'UPDATE_SOLO_STREAK_REMINDER_INFO_LOADING';
export const UPDATE_SOLO_STREAK_REMINDER_INFO_LOADED = 'UPDATE_SOLO_STREAK_REMINDER_INFO_LOADED';

export const REORDER_LIVE_SOLO_STREAKS = 'REORDER_LIVE_SOLO_STREAKS';
export const REORDER_LIVE_SOLO_STREAKS_FAIL = 'REORDER_LIVE_SOLO_STREAKS_FAIL';
export const REORDER_LIVE_SOLO_STREAKS_LOADING = 'REORDER_LIVE_SOLO_STREAKS_LOADING';
export const REORDER_LIVE_SOLO_STREAKS_LOADED = 'REORDER_LIVE_SOLO_STREAKS_LOADED';

export interface GetLiveSoloStreaksAction {
    type: typeof GET_LIVE_SOLO_STREAKS;
    payload: SoloStreakListItem[];
}

export interface GetLiveSoloStreaksFailAction {
    type: typeof GET_LIVE_SOLO_STREAKS_FAIL;
    errorMessage: string;
}

export interface GetArchivedSoloStreaksAction {
    type: typeof GET_ARCHIVED_SOLO_STREAKS;
    payload: ArchivedSoloStreakListItem[];
}

export interface GetArchivedSoloStreaksFailAction {
    type: typeof GET_ARCHIVED_SOLO_STREAKS_FAIL;
    errorMessage: string;
}

export interface GetSoloStreakAction {
    type: typeof GET_SOLO_STREAK;
    payload: SelectedSoloStreak;
}

export interface GetSoloStreakFailAction {
    type: typeof GET_SOLO_STREAK_FAIL;
    errorMessage: string;
}

export interface CreateSoloStreakAction {
    type: typeof CREATE_SOLO_STREAK;
    payload: SoloStreakListItem;
}

export interface EditSoloStreakAction {
    type: typeof EDIT_SOLO_STREAK;
    soloStreak: SoloStreakListItem;
}

export interface EditSoloStreakFailAction {
    type: typeof EDIT_SOLO_STREAK_FAIL;
    errorMessage: string;
}

export interface ClearEditSoloStreakErrorMessageAction {
    type: typeof CLEAR_EDIT_SOLO_STREAK_ERROR_MESSAGE;
}

export interface CreateCompleteSoloStreakListTaskAction {
    type: typeof CREATE_COMPLETE_SOLO_STREAK_LIST_TASK;
    payload: string;
}

export interface CreateCompleteSoloStreakListTaskFailAction {
    type: typeof CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_FAIL;
    payload: { soloStreakId: string; errorMessage: string };
}

export interface CreateCompleteSoloStreakListTaskLoadingAction {
    type: typeof CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADING;
    soloStreakId: string;
}

export interface CreateCompleteSoloStreakListTaskLoadedAction {
    type: typeof CREATE_COMPLETE_SOLO_STREAK_LIST_TASK_LOADED;
    soloStreakId: string;
}

export interface IncompleteSoloStreakListTaskAction {
    type: typeof CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK;
    payload: string;
}

export interface IncompleteSoloStreakListTaskFailAction {
    type: typeof CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_FAIL;
    payload: { soloStreakId: string; errorMessage: string };
}

export interface IncompleteSoloStreakListTaskLoadingAction {
    type: typeof CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADING;
    soloStreakId: string;
}

export interface IncompleteSoloStreakListTaskLoadedAction {
    type: typeof CREATE_INCOMPLETE_SOLO_STREAK_LIST_TASK_LOADED;
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
    payload: ArchivedSoloStreakListItem;
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
    payload: SoloStreakListItem;
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

export interface GetSoloStreakIsLoadingAction {
    type: typeof GET_SOLO_STREAK_IS_LOADING;
}

export interface GetSoloStreakIsLoadedAction {
    type: typeof GET_SOLO_STREAK_IS_LOADED;
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

export interface ClearSelectedSoloStreakAction {
    type: typeof CLEAR_SELECTED_SOLO_STREAK;
}

export interface CompleteSelectedSoloStreakAction {
    type: typeof COMPLETE_SELECTED_SOLO_STREAK;
    payload: { selectedSoloStreakId: string };
}

export interface CompleteSelectedSoloStreakFailAction {
    type: typeof COMPLETE_SELECTED_SOLO_STREAK_FAIL;
    payload: string;
}

export interface CompleteSelectedSoloStreakIsLoadingAction {
    type: typeof COMPLETE_SELECTED_SOLO_STREAK_IS_LOADING;
}

export interface CompleteSelectedSoloStreakIsLoadedAction {
    type: typeof COMPLETE_SELECTED_SOLO_STREAK_IS_LOADED;
}

export interface IncompleteSelectedSoloStreakAction {
    type: typeof INCOMPLETE_SELECTED_SOLO_STREAK;
    payload: { selectedSoloStreakId: string };
}

export interface IncompleteSelectedSoloStreakFailAction {
    type: typeof INCOMPLETE_SELECTED_SOLO_STREAK_FAIL;
    payload: string;
}

export interface IncompleteSelectedSoloStreakIsLoadingAction {
    type: typeof INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADING;
}

export interface IncompleteSelectedSoloStreakIsLoadedAction {
    type: typeof INCOMPLETE_SELECTED_SOLO_STREAK_IS_LOADED;
}

export interface UpdateSoloStreakReminderInfoAction {
    type: typeof UPDATE_SOLO_STREAK_REMINDER_INFO;
    payload: { customSoloStreakReminder: CustomSoloStreakReminder };
}

export interface UpdateSoloStreakReminderInfoFailAction {
    type: typeof UPDATE_SOLO_STREAK_REMINDER_INFO_FAIL;
    payload: string;
}

export interface UpdateSoloStreakReminderInfoIsLoadingAction {
    type: typeof UPDATE_SOLO_STREAK_REMINDER_INFO_LOADING;
}

export interface UpdateSoloStreakReminderInfoIsLoadedAction {
    type: typeof UPDATE_SOLO_STREAK_REMINDER_INFO_LOADED;
}

export interface ReorderLiveSoloStreaksAction {
    type: typeof REORDER_LIVE_SOLO_STREAKS;
    payload: { liveSoloStreaks: SoloStreakListItem[] };
}

export interface ReorderLiveSoloStreaksFailAction {
    type: typeof REORDER_LIVE_SOLO_STREAKS_FAIL;
    payload: string;
}

export interface ReorderLiveSoloStreaksIsLoadingAction {
    type: typeof REORDER_LIVE_SOLO_STREAKS_LOADING;
}

export interface ReorderLiveSoloStreaksIsLoadedAction {
    type: typeof REORDER_LIVE_SOLO_STREAKS_LOADED;
}

export type SoloStreakActionTypes =
    | GetLiveSoloStreaksAction
    | GetLiveSoloStreaksFailAction
    | GetArchivedSoloStreaksAction
    | GetArchivedSoloStreaksFailAction
    | GetSoloStreakAction
    | GetSoloStreakFailAction
    | CreateSoloStreakAction
    | EditSoloStreakAction
    | EditSoloStreakFailAction
    | ClearEditSoloStreakErrorMessageAction
    | CreateCompleteSoloStreakListTaskAction
    | CreateCompleteSoloStreakListTaskFailAction
    | CreateCompleteSoloStreakListTaskLoadingAction
    | CreateCompleteSoloStreakListTaskLoadedAction
    | IncompleteSoloStreakListTaskAction
    | IncompleteSoloStreakListTaskFailAction
    | IncompleteSoloStreakListTaskLoadingAction
    | IncompleteSoloStreakListTaskLoadedAction
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
    | GetSoloStreakIsLoadingAction
    | GetSoloStreakIsLoadedAction
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
    | ClearCreateSoloStreakErrorAction
    | ClearSelectedSoloStreakAction
    | CompleteSelectedSoloStreakAction
    | CompleteSelectedSoloStreakFailAction
    | CompleteSelectedSoloStreakIsLoadingAction
    | CompleteSelectedSoloStreakIsLoadedAction
    | IncompleteSelectedSoloStreakAction
    | IncompleteSelectedSoloStreakFailAction
    | IncompleteSelectedSoloStreakIsLoadingAction
    | IncompleteSelectedSoloStreakIsLoadedAction
    | UpdateSoloStreakReminderInfoAction
    | UpdateSoloStreakReminderInfoFailAction
    | UpdateSoloStreakReminderInfoIsLoadingAction
    | UpdateSoloStreakReminderInfoIsLoadedAction
    | ReorderLiveSoloStreaksAction
    | ReorderLiveSoloStreaksFailAction
    | ReorderLiveSoloStreaksIsLoadingAction
    | ReorderLiveSoloStreaksIsLoadedAction;

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

export const GET_SELECTED_TEAM_STREAK = 'GET_SELECTED_TEAM_STREAK';
export const GET_SELECTED_TEAM_STREAK_FAIL = 'GET_SELECTED_TEAM_STREAK_FAIL';
export const GET_SELECTED_TEAM_STREAK_IS_LOADING = 'GET_SELECTED_TEAM_STREAK_IS_LOADING';
export const GET_SELECTED_TEAM_STREAK_IS_LOADED = 'GET_SELECTED_TEAM_STREAK_IS_LOADED';

export const CREATE_TEAM_STREAK = 'CREATE_TEAM_STREAK';

export const EDIT_TEAM_STREAK = 'EDIT_TEAM_STREAK';
export const EDIT_TEAM_STREAK_FAIL = 'EDIT_TEAM_STREAK_FAIL';
export const EDIT_TEAM_STREAK_LOADING = 'EDIT_TEAM_STREAK_LOADING';
export const EDIT_TEAM_STREAK_LOADED = 'EDIT_TEAM_STREAK_LOADED';
export const CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE = 'CLEAR_EDIT_TEAM_STREAK_ERROR_MESSAGE';

export const ADD_USER_TO_TEAM_STREAK = 'ADD_USER_TO_TEAM_STREAK';
export const ADD_USER_TO_TEAM_STREAK_FAIL = 'ADD_USER_TO_TEAM_STREAK_FAIL';
export const ADD_USER_TO_TEAM_STREAK_LOADING = 'ADD_USER_TO_TEAM_STREAK_LOADING';
export const ADD_USER_TO_TEAM_STREAK_LOADED = 'ADD_USER_TO_TEAM_STREAK_LOADED';

export const COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL = 'COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL';
export const COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING = 'COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING';
export const COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED = 'COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED';

export const INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL = 'INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL';
export const INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING = 'INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING';
export const INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED = 'INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED';

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

export const CLEAR_SELECTED_TEAM_STREAK = 'CLEAR_SELECTED_TEAM_STREAK';

export const UPDATE_TEAM_STREAK_REMINDER_INFO = 'UPDATE_TEAM_STREAK_REMINDER_INFO';
export const UPDATE_TEAM_STREAK_REMINDER_INFO_FAIL = 'UPDATE_TEAM_STREAK_REMINDER_INFO_FAIL';
export const UPDATE_TEAM_STREAK_REMINDER_INFO_LOADING = 'UPDATE_TEAM_STREAK_REMINDER_INFO_LOADING';
export const UPDATE_TEAM_STREAK_REMINDER_INFO_LOADED = 'UPDATE_TEAM_STREAK_REMINDER_INFO_LOADED';

export interface GetLiveTeamStreaksAction {
    type: typeof GET_LIVE_TEAM_STREAKS;
    payload: PopulatedTeamStreakWithClientData[];
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
    payload: PopulatedTeamStreakWithClientData[];
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

export interface GetSelectedTeamStreakAction {
    type: typeof GET_SELECTED_TEAM_STREAK;
    payload: SelectedTeamStreak;
}

export interface GetSelectedTeamStreakFailAction {
    type: typeof GET_SELECTED_TEAM_STREAK_FAIL;
    errorMessage: string;
}

export interface GetSelectedTeamStreakLoadingAction {
    type: typeof GET_SELECTED_TEAM_STREAK_IS_LOADING;
}

export interface GetSelectedTeamStreakLoadedAction {
    type: typeof GET_SELECTED_TEAM_STREAK_IS_LOADED;
}

export interface CreateTeamStreakAction {
    type: typeof CREATE_TEAM_STREAK;
    payload: PopulatedTeamStreakWithClientData;
}

export interface EditTeamStreakAction {
    type: typeof EDIT_TEAM_STREAK;
    payload: PopulatedTeamStreak;
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

export interface AddUserToTeamStreakAction {
    type: typeof ADD_USER_TO_TEAM_STREAK;
    payload: PopulatedTeamMemberWithClientData;
}

export interface AddUserToTeamStreakFailAction {
    type: typeof ADD_USER_TO_TEAM_STREAK_FAIL;
    payload: string;
}

export interface AddUserToTeamStreakLoadingAction {
    type: typeof ADD_USER_TO_TEAM_STREAK_LOADING;
}

export interface AddUserToTeamStreakLoadedAction {
    type: typeof ADD_USER_TO_TEAM_STREAK_LOADED;
}

export interface CompleteTeamMemberStreakListTaskFailAction {
    type: typeof COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL;
    payload: { teamMemberStreakId: string; errorMessage: string };
}

export interface CompleteTeamMemberStreakListTaskLoadingAction {
    type: typeof COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING;
    teamMemberStreakId: string;
}

export interface CompleteTeamMemberStreakListTaskLoadedAction {
    type: typeof COMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED;
    teamMemberStreakId: string;
}

export interface IncompleteTeamMemberStreakListTaskFailAction {
    type: typeof INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_FAIL;
    payload: { teamMemberStreakId: string; errorMessage: string };
}

export interface IncompleteTeamMemberStreakListTaskLoadingAction {
    type: typeof INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADING;
    teamMemberStreakId: string;
}

export interface IncompleteTeamMemberStreakListTaskLoadedAction {
    type: typeof INCOMPLETE_TEAM_MEMBER_STREAK_LIST_TASK_LOADED;
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
    payload: PopulatedTeamStreakWithClientData;
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
    payload: PopulatedTeamStreakWithClientData;
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
    payload: SelectedTeamStreak;
}

export interface UpdateTimezoneFailAction {
    type: typeof UPDATE_TEAM_STREAK_TIMEZONE_FAIL;
    payload: string;
}

export interface ClearSelectedTeamStreakAction {
    type: typeof CLEAR_SELECTED_TEAM_STREAK;
}

export interface UpdateTeamStreakReminderInfoAction {
    type: typeof UPDATE_TEAM_STREAK_REMINDER_INFO;
    payload: { customTeamStreakReminder: CustomTeamStreakReminder };
}

export interface UpdateTeamStreakReminderInfoFailAction {
    type: typeof UPDATE_TEAM_STREAK_REMINDER_INFO_FAIL;
    payload: string;
}

export interface UpdateTeamStreakReminderInfoIsLoadingAction {
    type: typeof UPDATE_TEAM_STREAK_REMINDER_INFO_LOADING;
}

export interface UpdateTeamStreakReminderInfoIsLoadedAction {
    type: typeof UPDATE_TEAM_STREAK_REMINDER_INFO_LOADED;
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
    | GetSelectedTeamStreakAction
    | GetSelectedTeamStreakFailAction
    | GetSelectedTeamStreakLoadingAction
    | GetSelectedTeamStreakLoadedAction
    | CreateTeamStreakAction
    | EditTeamStreakAction
    | EditTeamStreakFailAction
    | EditTeamStreakLoadingAction
    | EditTeamStreakLoadedAction
    | ClearEditTeamStreakErrorMessageAction
    | AddUserToTeamStreakAction
    | AddUserToTeamStreakFailAction
    | AddUserToTeamStreakLoadingAction
    | AddUserToTeamStreakLoadedAction
    | CompleteTeamMemberStreakListTaskFailAction
    | CompleteTeamMemberStreakListTaskLoadingAction
    | CompleteTeamMemberStreakListTaskLoadedAction
    | IncompleteTeamMemberStreakListTaskFailAction
    | IncompleteTeamMemberStreakListTaskLoadingAction
    | IncompleteTeamMemberStreakListTaskLoadedAction
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
    | UpdateTimezoneFailAction
    | ClearSelectedTeamStreakAction
    | UpdateTeamStreakReminderInfoAction
    | UpdateTeamStreakReminderInfoFailAction
    | UpdateTeamStreakReminderInfoIsLoadingAction
    | UpdateTeamStreakReminderInfoIsLoadedAction;

export const GET_TEAM_MEMBER_STREAK = 'GET_TEAM_MEMBER_STREAK';
export const GET_TEAM_MEMBER_STREAK_FAIL = 'GET_TEAM_MEMBER_STREAK_FAIL';
export const GET_TEAM_MEMBER_STREAK_IS_LOADING = 'GET_TEAM_MEMBER_STREAK_IS_LOADING';
export const GET_TEAM_MEMBER_STREAK_IS_LOADED = 'GET_TEAM_MEMBER_STREAK_IS_LOADED';
export const CLEAR_SELECTED_TEAM_MEMBER_STREAK = 'CLEAR_SELECTED_TEAM_MEMBER_STREAK';

export interface GetTeamMemberStreakAction {
    type: typeof GET_TEAM_MEMBER_STREAK;
    payload: SelectedTeamMemberStreak;
}

export interface GetTeamMemberStreakFailAction {
    type: typeof GET_TEAM_MEMBER_STREAK_FAIL;
    errorMessage: string;
}

export interface GetTeamMemberStreakLoadingAction {
    type: typeof GET_TEAM_MEMBER_STREAK_IS_LOADING;
}

export interface GetTeamMemberStreakLoadedAction {
    type: typeof GET_TEAM_MEMBER_STREAK_IS_LOADED;
}

export interface ClearSelectedTeamMemberStreakAction {
    type: typeof CLEAR_SELECTED_TEAM_MEMBER_STREAK;
}

export type TeamMemberStreakActionTypes =
    | GetTeamMemberStreakAction
    | GetTeamMemberStreakFailAction
    | GetTeamMemberStreakLoadingAction
    | GetTeamMemberStreakLoadedAction
    | ClearSelectedTeamMemberStreakAction;

export const GET_USERS = 'GET_USERS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';
export const GET_USERS_IS_LOADING = 'GET_USERS_IS_LOADING';
export const GET_USERS_IS_LOADED = 'GET_USERS_IS_LOADED';

export const GET_USER = 'GET_USER';
export const GET_USER_FAIL = 'GET_USER_FAIL';
export const GET_USER_IS_LOADING = 'GET_USER_IS_LOADING';
export const GET_USER_IS_LOADED = 'GET_USER_IS_LOADED';

export const FOLLOW_SELECTED_USER = 'FOLLOW_SELECTED_USER';
export const FOLLOW_SELECTED_USER_FAIL = 'FOLLOW_SELECTED_USER_FAIL';
export const FOLLOW_SELECTED_USER_IS_LOADING = 'FOLLOW_SELECTED_USER_IS_LOADING';
export const FOLLOW_SELECTED_USER_IS_LOADED = 'FOLLOW_SELECTED_USER_IS_LOADED';

export const UNFOLLOW_SELECTED_USER = 'UNFOLLOW_SELECTED_USER';
export const UNFOLLOW_SELECTED_USER_FAIL = 'UNFOLLOW_SELECTED_USER_FAIL';
export const UNFOLLOW_SELECTED_USER_IS_LOADING = 'UNFOLLOW_SELECTED_USER_IS_LOADING';
export const UNFOLLOW_SELECTED_USER_IS_LOADED = 'UNFOLLOW_SELECTED_USER_IS_LOADED';

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const UPDATE_CURRENT_USER_FAIL = 'UPDATE_CURRENT_USER_FAIL';
export const UPDATE_CURRENT_USER_IS_LOADING = 'UPDATE_CURRENT_USER_IS_LOADING';
export const UPDATE_CURRENT_USER_IS_LOADED = 'UPDATE_CURRENT_USER_IS_LOADED';
export const CLEAR_UPDATE_CURRENT_USER_ERROR_MESSAGE = 'CLEAR_UPDATE_CURRENT_USER_ERROR_MESSAGE';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_FAIL = 'GET_CURRENT_USER_FAIL';
export const GET_CURRENT_USER_IS_LOADING = 'GET_CURRENT_USER_IS_LOADING';
export const GET_CURRENT_USER_IS_LOADED = 'GET_CURRENT_USER_IS_LOADED';

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
export const CLEAR_SELECTED_USER = 'CLEAR_SELECTED_USER';

export const FOLLOW_USERS_LIST_USER = 'FOLLOW_USERS_LIST_USER';
export const FOLLOW_USERS_LIST_USER_FAIL = 'FOLLOW_USERS_LIST_USER_FAIL';
export const FOLLOW_USERS_LIST_USER_IS_LOADING = 'FOLLOW_USERS_LIST_USER_IS_LOADING';
export const FOLLOW_USERS_LIST_USER_IS_LOADED = 'FOLLOW_USERS_LIST_IS_LOADED';

export const UNFOLLOW_USERS_LIST_USER = 'UNFOLLOW_USERS_LIST_USER';
export const UNFOLLOW_USERS_LIST_USER_FAIL = 'UNFOLLOW_USERS_LIST_USER_FAIL';
export const UNFOLLOW_USERS_LIST_USER_IS_LOADING = 'UNFOLLOW_USERS_LIST_USER_IS_LOADING';
export const UNFOLLOW_USERS_LIST_USER_IS_LOADED = 'UNFOLLOW_USERS_LIST_USER_IS_LOADED';

export const SELECT_FOLLOWER = 'SELECT_FOLLOWER';
export const UNSELECT_FOLLOWER = 'UNSELECT_FOLLOWER';
export const CLEAR_SELECTED_FOLLOWERS = 'CLEAR_SELECTED_FOLLOWERS';

export const UPDATE_PUSH_NOTIFICATIONS = 'UPDATE_PUSH_NOTIFICATIONS';
export const UPDATE_PUSH_NOTIFICATIONS_FAIL = 'UPDATE_PUSH_NOTIFICATIONS_FAIL';
export const UPDATE_PUSH_NOTIFICATIONS_IS_LOADING = 'UPDATE_PUSH_NOTIFICATIONS_IS_LOADING';
export const UPDATE_PUSH_NOTIFICATIONS_IS_LOADED = 'UPDATE_PUSH_NOTIFICATIONS_IS_LOADED';
export const CLEAR_UPDATE_PUSH_NOTIFICATION_ERROR_MESSAGE = 'CLEAR_UPDATE_PUSH_NOTIFICATION_ERROR_MESSAGE';

export interface GetUsersAction {
    type: typeof GET_USERS;
    payload: FormattedUserWithClientData[];
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

export interface FollowSelectedUserAction {
    type: typeof FOLLOW_SELECTED_USER;
    payload: { currentUser: BasicUser; userToFollow: BasicUser };
}

export interface FollowSelectedUserFailAction {
    type: typeof FOLLOW_SELECTED_USER_FAIL;
    payload: string;
}

export interface FollowSelectedUserIsLoadingAction {
    type: typeof FOLLOW_SELECTED_USER_IS_LOADING;
}

export interface FollowSelectedUserIsLoadedAction {
    type: typeof FOLLOW_SELECTED_USER_IS_LOADED;
}

export interface UnfollowSelectedUserAction {
    type: typeof UNFOLLOW_SELECTED_USER;
    payload: { currentUserId: string; userToUnfollowId: string };
}

export interface UnfollowSelectedUserFailAction {
    type: typeof UNFOLLOW_SELECTED_USER_FAIL;
    payload: string;
}

export interface UnfollowSelectedUserIsLoadingAction {
    type: typeof UNFOLLOW_SELECTED_USER_IS_LOADING;
}

export interface UnfollowSelectedUserIsLoadedAction {
    type: typeof UNFOLLOW_SELECTED_USER_IS_LOADED;
}

export interface UpdateCurrentUserAction {
    type: typeof UPDATE_CURRENT_USER;
    payload: PopulatedCurrentUserWithClientData;
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

export interface ClearUpdateCurrentUserErrorMessageAction {
    type: typeof CLEAR_UPDATE_CURRENT_USER_ERROR_MESSAGE;
}

export interface GetCurrentUserAction {
    type: typeof GET_CURRENT_USER;
    payload: PopulatedCurrentUserWithClientData;
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
    payload?: ProfileImages;
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

export interface ClearUploadProfileImageMessagesAction {
    type: typeof CLEAR_UPLOAD_PROFILE_IMAGE_MESSAGES;
}

export interface ClearSelectedUserAction {
    type: typeof CLEAR_SELECTED_USER;
}

export interface FollowUsersListUserAction {
    type: typeof FOLLOW_USERS_LIST_USER;
    payload: { userToFollow: FollowingWithClientData; currentUserId: string };
}

export interface FollowerUsersListUserFailAction {
    type: typeof FOLLOW_USERS_LIST_USER_FAIL;
    payload: { errorMessage: string; userToFollowId: string };
}

export interface FollowerUsersListUserIsLoadingAction {
    type: typeof FOLLOW_USERS_LIST_USER_IS_LOADING;
    payload: string;
}

export interface FollowerUsersListUserIsLoadedAction {
    type: typeof FOLLOW_USERS_LIST_USER_IS_LOADED;
    payload: string;
}

export interface UnfollowUsersListUserAction {
    type: typeof UNFOLLOW_USERS_LIST_USER;
    payload: { userToUnfollowId: string; currentUserId: string };
}

export interface UnfollowUsersListUserFailAction {
    type: typeof UNFOLLOW_USERS_LIST_USER_FAIL;
    payload: { errorMessage: string; userToUnfollowId: string };
}

export interface UnfollowUsersListUserIsLoadingAction {
    type: typeof UNFOLLOW_USERS_LIST_USER_IS_LOADING;
    payload: string;
}

export interface UnfollowerUsersListUserIsLoadedAction {
    type: typeof UNFOLLOW_USERS_LIST_USER_IS_LOADED;
    payload: string;
}

export interface SelectFollowerAction {
    type: typeof SELECT_FOLLOWER;
    payload: string;
}

export interface UnselectFollowerAction {
    type: typeof UNSELECT_FOLLOWER;
    payload: string;
}

export interface ClearSelectedFollowersAction {
    type: typeof CLEAR_SELECTED_FOLLOWERS;
}

export interface UpdatePushNotificationsAction {
    type: typeof UPDATE_PUSH_NOTIFICATIONS;
    payload: {
        teamStreakUpdates?: { enabled: boolean };
        newFollowerUpdates?: { enabled: boolean };
        customStreakReminders?: CustomStreakReminder[];
        completeAllStreaksReminder?: CompleteAllStreaksReminder;
    };
}

export interface UpdatePushNotificationsFailAction {
    type: typeof UPDATE_PUSH_NOTIFICATIONS_FAIL;
    payload: string;
}

export interface UpdatePushNotificationsIsLoadingAction {
    type: typeof UPDATE_PUSH_NOTIFICATIONS_IS_LOADING;
}

export interface UpdatePushNotificationsIsLoadedAction {
    type: typeof UPDATE_PUSH_NOTIFICATIONS_IS_LOADED;
}

export interface ClearUpdatePushNotificationsErrorMessage {
    type: typeof CLEAR_UPDATE_PUSH_NOTIFICATION_ERROR_MESSAGE;
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
    | FollowSelectedUserAction
    | FollowSelectedUserFailAction
    | FollowSelectedUserIsLoadingAction
    | FollowSelectedUserIsLoadedAction
    | UnfollowSelectedUserAction
    | UnfollowSelectedUserFailAction
    | UnfollowSelectedUserIsLoadingAction
    | UnfollowSelectedUserIsLoadedAction
    | UpdateCurrentUserAction
    | UpdateCurrentUserFailAction
    | UpdateCurrentUserIsLoadingAction
    | UpdateCurrentUserIsLoadedAction
    | ClearUpdateCurrentUserErrorMessageAction
    | GetCurrentUserAction
    | GetCurrentUserFailAction
    | GetCurrentUserIsLoadingAction
    | GetCurrentUserIsLoadedAction
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
    | ClearUploadProfileImageMessagesAction
    | ClearSelectedUserAction
    | FollowUsersListUserAction
    | FollowerUsersListUserFailAction
    | FollowerUsersListUserIsLoadingAction
    | FollowerUsersListUserIsLoadedAction
    | UnfollowUsersListUserAction
    | UnfollowUsersListUserFailAction
    | UnfollowUsersListUserIsLoadingAction
    | UnfollowerUsersListUserIsLoadedAction
    | SelectFollowerAction
    | UnselectFollowerAction
    | ClearSelectedFollowersAction
    | UpdatePushNotificationsAction
    | UpdatePushNotificationsFailAction
    | UpdatePushNotificationsIsLoadingAction
    | UpdatePushNotificationsIsLoadedAction
    | ClearUpdatePushNotificationsErrorMessage;

export const GET_CHALLENGES = 'GET_CHALLENGES';
export const GET_CHALLENGES_FAIL = 'GET_CHALLENGES_FAIL';
export const GET_CHALLENGES_IS_LOADING = 'GET_CHALLENGES_IS_LOADING';
export const GET_CHALLENGES_IS_LOADED = 'GET_CHALLENGES_IS_LOADED';

export const GET_SELECTED_CHALLENGE = 'GET_SELECTED_CHALLENGE';
export const GET_SELECTED_CHALLENGE_FAIL = 'GET_SELECTED_CHALLENGE_FAIL';
export const GET_SELECTED_CHALLENGE_IS_LOADING = 'GET_SELECTED_CHALLENGE_IS_LOADING';
export const GET_SELECTED_CHALLENGE_IS_LOADED = 'GET_SELECTED_CHALLENGE_IS_LOADED';

export const UPDATE_SELECTED_CHALLENGE = 'UPDATE_SELECTED_CHALLENGE';
export const UPDATE_SELECTED_CHALLENGE_FAIL = 'UPDATE_SELECTED_CHALLENGE_FAIL';
export const UPDATE_SELECTED_CHALLENGE_IS_LOADING = 'UPDATE_SELECTED_CHALLENGE_IS_LOADING';
export const UPDATE_SELECTED_CHALLENGE_IS_LOADED = 'UPDATE_SELECTED_CHALLENGE_IS_LOADED';

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

export interface GetSelectedChallengeAction {
    type: typeof GET_SELECTED_CHALLENGE;
    payload: SelectedChallenge;
}

export interface GetSelectedChallengeFailAction {
    type: typeof GET_SELECTED_CHALLENGE_FAIL;
    payload: string;
}

export interface GetSelectedChallengeIsLoadingAction {
    type: typeof GET_SELECTED_CHALLENGE_IS_LOADING;
}

export interface GetSelectedChallengeIsLoadedAction {
    type: typeof GET_SELECTED_CHALLENGE_IS_LOADED;
}

export interface UpdateSelectedChallengeAction {
    type: typeof UPDATE_SELECTED_CHALLENGE;
    payload: SelectedChallenge;
}

export interface UpdateSelectedChallengeFailAction {
    type: typeof UPDATE_SELECTED_CHALLENGE_FAIL;
    payload: string;
}

export interface UpdateSelectedChallengeIsLoadingAction {
    type: typeof UPDATE_SELECTED_CHALLENGE_IS_LOADING;
}

export interface UpdateSelectedChallengeIsLoadedAction {
    type: typeof UPDATE_SELECTED_CHALLENGE_IS_LOADED;
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
    | GetSelectedChallengeAction
    | GetSelectedChallengeFailAction
    | GetSelectedChallengeIsLoadingAction
    | GetSelectedChallengeIsLoadedAction
    | UpdateSelectedChallengeAction
    | UpdateSelectedChallengeFailAction
    | UpdateSelectedChallengeIsLoadingAction
    | UpdateSelectedChallengeIsLoadedAction
    | JoinChallengeFailAction
    | JoinChallengeIsLoadingAction
    | JoinChallengeIsLoadedAction;

export const GET_LIVE_CHALLENGE_STREAKS = 'GET_LIVE_CHALLENGE_STREAKS';
export const GET_LIVE_CHALLENGE_STREAKS_FAIL = 'GET_LIVE_CHALLENGE_STREAKS_FAIL';
export const GET_LIVE_CHALLENGE_STREAKS_LOADING = 'GET_LIVE_CHALLENGE_STREAKS_LOADING';
export const GET_LIVE_CHALLENGE_STREAKS_LOADED = 'GET_LIVE_CHALLENGE_STREAKS_LOADED';

export const GET_ARCHIVED_CHALLENGE_STREAKS = 'GET_ARCHIVED_CHALLENGE_STREAKS';
export const GET_ARCHIVED_CHALLENGE_STREAKS_FAIL = 'GET_ARCHIVED_CHALLENGE_STREAKS_FAIL';
export const GET_ARCHIVED_CHALLENGE_STREAKS_LOADING = 'GET_ARCHIVED_CHALLENGE_STREAKS_LOADING';
export const GET_ARCHIVED_CHALLENGE_STREAKS_LOADED = 'GET_ARCHIVED_CHALLENGE_STREAKS_LOADED';

export const GET_CHALLENGE_STREAK = 'GET_CHALLENGE_STREAK';
export const GET_CHALLENGE_STREAK_FAIL = 'GET_CHALLENGE_STREAK_FAIL';
export const GET_CHALLENGE_STREAK_LOADING = 'GET_CHALLENGE_STREAK_LOADING';
export const GET_CHALLENGE_STREAK_LOADED = 'GET_CHALLENGE_STREAK_LOADED';

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

export const COMPLETE_CHALLENGE_STREAK_LIST_TASK = 'COMPLETE_CHALLENGE_STREAK_LIST_TASK ';
export const COMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL = 'COMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL';
export const COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING = 'COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING';
export const COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED = 'COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED';

export const COMPLETE_SELECTED_CHALLENGE_STREAK = 'COMPLETE_SELECTED_CHALLENGE_STREAK';
export const COMPLETE_SELECTED_CHALLENGE_STREAK_FAIL = 'COMPLETE_SELECTED_CHALLENGE_STREAK_FAIL';
export const COMPLETE_SELECTED_CHALLENGE_STREAK_LOADING = 'COMPLETE_SELECTED_CHALLENGE_STREAK_LOADING';
export const COMPLETE_SELECTED_CHALLENGE_STREAK_LOADED = 'COMPLETE_SELECTED_CHALLENGE_STREAK_LOADED';

export const INCOMPLETE_CHALLENGE_STREAK_LIST_TASK = 'INCOMPLETE_CHALLENGE_STREAK_LIST_TASK';
export const INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL = 'INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL';
export const INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING = 'INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING';
export const INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED = 'INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED';

export const INCOMPLETE_SELECTED_CHALLENGE_STREAK = 'INCOMPLETE_SELECTED_CHALLENGE_STREAK';
export const INCOMPLETE_SELECTED_CHALLENGE_STREAK_FAIL = 'INCOMPLETE_SELECTED_CHALLENGE_STREAK_FAIL';
export const INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADING = 'INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADING';
export const INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADED = 'INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADED';

export const UPDATE_CHALLENGE_STREAK_TIMEZONES = 'UPDATE_CHALLENGE_STREAK_TIMEZONES';
export const UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL = 'UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL';
export const CLEAR_SELECTED_CHALLENGE_STREAK = 'CLEAR_SELECTED_CHALLENGE_STREAK';

export const UPDATE_CHALLENGE_STREAK_REMINDER_INFO = 'UPDATE_CHALLENGE_STREAK_REMINDER_INFO';
export const UPDATE_CHALLENGE_STREAK_REMINDER_INFO_FAIL = 'UPDATE_CHALLENGE_STREAK_REMINDER_INFO_FAIL';
export const UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADING = 'UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADING';
export const UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADED = 'UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADED';

export const REORDER_LIVE_CHALLENGE_STREAKS = 'REORDER_LIVE_CHALLENGE_STREAKS';
export const REORDER_LIVE_CHALLENGE_STREAKS_FAIL = 'REORDER_LIVE_CHALLENGE_STREAKS_FAIL';
export const REORDER_LIVE_CHALLENGE_STREAKS_LOADING = 'REORDER_LIVE_CHALLENGE_STREAKS_LOADING';
export const REORDER_LIVE_CHALLENGE_STREAKS_LOADED = 'REORDER_LIVE_CHALLENGE_STREAKS_LOADED';

export interface GetLiveChallengeStreaksAction {
    type: typeof GET_LIVE_CHALLENGE_STREAKS;
    payload: ChallengeStreakListItem[];
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
    payload: ArchivedChallengeStreakListItem[];
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

export interface GetChallengeStreakAction {
    type: typeof GET_CHALLENGE_STREAK;
    payload: SelectedChallengeStreak;
}

export interface GetChallengeStreakFailAction {
    type: typeof GET_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface GetChallengeStreakIsLoadingAction {
    type: typeof GET_CHALLENGE_STREAK_LOADING;
}

export interface GetChallengeStreakIsLoadedAction {
    type: typeof GET_CHALLENGE_STREAK_LOADED;
}

export interface ArchiveChallengeStreakAction {
    type: typeof ARCHIVE_CHALLENGE_STREAK;
    payload: SelectedChallengeStreak;
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
    payload: SelectedChallengeStreak;
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
    payload: SelectedChallengeStreak;
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

export interface CompleteChallengeStreakListTaskAction {
    type: typeof COMPLETE_CHALLENGE_STREAK_LIST_TASK;
    payload: string;
}

export interface CompleteChallengeStreakListTaskFailAction {
    type: typeof COMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL;
    payload: { challengeStreakId: string; errorMessage: string };
}

export interface CompleteChallengeStreakListTaskLoadingAction {
    type: typeof COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING;
    challengeStreakId: string;
}

export interface CompleteChallengeStreakListTaskLoadedAction {
    type: typeof COMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED;
    challengeStreakId: string;
}

export interface CompleteSelectedChallengeStreakTaskAction {
    type: typeof COMPLETE_SELECTED_CHALLENGE_STREAK;
    payload: string;
}

export interface CompleteSelectedChallengeStreakTaskFailAction {
    type: typeof COMPLETE_SELECTED_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface CompleteSelectedChallengeStreakTaskLoadingAction {
    type: typeof COMPLETE_SELECTED_CHALLENGE_STREAK_LOADING;
}

export interface CompleteSelectedChallengeStreakTaskLoadedAction {
    type: typeof COMPLETE_SELECTED_CHALLENGE_STREAK_LOADED;
}

export interface IncompleteChallengeStreakListTaskAction {
    type: typeof INCOMPLETE_CHALLENGE_STREAK_LIST_TASK;
    payload: string;
}

export interface IncompleteChallengeStreakListTaskFailAction {
    type: typeof INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_FAIL;
    payload: { challengeStreakId: string; errorMessage: string };
}

export interface IncompleteChallengeStreakListTaskLoadingAction {
    type: typeof INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADING;
    challengeStreakId: string;
}

export interface IncompleteChallengeStreakListTaskLoadedAction {
    type: typeof INCOMPLETE_CHALLENGE_STREAK_LIST_TASK_LOADED;
    challengeStreakId: string;
}

export interface IncompleteSelectedChallengeStreakTaskAction {
    type: typeof INCOMPLETE_SELECTED_CHALLENGE_STREAK;
    payload: string;
}

export interface IncompleteSelectedChallengeStreakTaskFailAction {
    type: typeof INCOMPLETE_SELECTED_CHALLENGE_STREAK_FAIL;
    payload: string;
}

export interface IncompleteSelectedChallengeStreakTaskLoadingAction {
    type: typeof INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADING;
}

export interface IncompleteSelectedChallengeStreakTaskLoadedAction {
    type: typeof INCOMPLETE_SELECTED_CHALLENGE_STREAK_LOADED;
}

export interface UpdateChallengeStreaksTimezoneAction {
    type: typeof UPDATE_CHALLENGE_STREAK_TIMEZONES;
    payload: string;
}

export interface UpdateChallengeStreaksTimezoneActionFail {
    type: typeof UPDATE_CHALLENGE_STREAK_TIMEZONES_FAIL;
    payload: string;
}

export interface ClearSelectedChallengeStreakAction {
    type: typeof CLEAR_SELECTED_CHALLENGE_STREAK;
}

export interface UpdateChallengeStreakReminderInfoAction {
    type: typeof UPDATE_CHALLENGE_STREAK_REMINDER_INFO;
    payload: { customChallengeStreakReminder: CustomChallengeStreakReminder };
}

export interface UpdateChallengeStreakReminderInfoFailAction {
    type: typeof UPDATE_CHALLENGE_STREAK_REMINDER_INFO_FAIL;
    payload: string;
}

export interface UpdateChallengeStreakReminderInfoIsLoadingAction {
    type: typeof UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADING;
}

export interface UpdateChallengeStreakReminderInfoIsLoadedAction {
    type: typeof UPDATE_CHALLENGE_STREAK_REMINDER_INFO_LOADED;
}

export interface ReorderLiveChallengeStreaksAction {
    type: typeof REORDER_LIVE_CHALLENGE_STREAKS;
    payload: { liveChallengeStreaks: ChallengeStreakListItem[] };
}

export interface ReorderLiveChallengeStreaksFailAction {
    type: typeof REORDER_LIVE_CHALLENGE_STREAKS_FAIL;
    payload: string;
}

export interface ReorderLiveChallengeStreaksIsLoadingAction {
    type: typeof REORDER_LIVE_CHALLENGE_STREAKS_LOADING;
}

export interface ReorderLiveChallengeStreaksIsLoadedAction {
    type: typeof REORDER_LIVE_CHALLENGE_STREAKS_LOADED;
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
    | GetChallengeStreakAction
    | GetChallengeStreakFailAction
    | GetChallengeStreakIsLoadingAction
    | GetChallengeStreakIsLoadedAction
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
    | CompleteChallengeStreakListTaskAction
    | CompleteChallengeStreakListTaskFailAction
    | CompleteChallengeStreakListTaskLoadingAction
    | CompleteChallengeStreakListTaskLoadedAction
    | CompleteSelectedChallengeStreakTaskAction
    | CompleteSelectedChallengeStreakTaskFailAction
    | CompleteSelectedChallengeStreakTaskLoadingAction
    | CompleteSelectedChallengeStreakTaskLoadedAction
    | IncompleteChallengeStreakListTaskAction
    | IncompleteChallengeStreakListTaskFailAction
    | IncompleteChallengeStreakListTaskLoadingAction
    | IncompleteChallengeStreakListTaskLoadedAction
    | IncompleteSelectedChallengeStreakTaskAction
    | IncompleteSelectedChallengeStreakTaskFailAction
    | IncompleteSelectedChallengeStreakTaskLoadingAction
    | IncompleteSelectedChallengeStreakTaskLoadedAction
    | UpdateChallengeStreaksTimezoneAction
    | UpdateChallengeStreaksTimezoneActionFail
    | ClearSelectedChallengeStreakAction
    | UpdateChallengeStreakReminderInfoAction
    | UpdateChallengeStreakReminderInfoFailAction
    | UpdateChallengeStreakReminderInfoIsLoadingAction
    | UpdateChallengeStreakReminderInfoIsLoadedAction
    | ReorderLiveChallengeStreaksAction
    | ReorderLiveChallengeStreaksFailAction
    | ReorderLiveChallengeStreaksIsLoadingAction
    | ReorderLiveChallengeStreaksIsLoadedAction;

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
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_FAIL = 'DELETE_NOTE_FAIL';
export const DELETE_NOTE_LOADING = 'DELETE_NOTE_LOADING';
export const DELETE_NOTE_LOADED = 'DELETE_NOTE_LOADED';
export const CLEAR_NOTES = 'CLEAR_NOTES';

export interface GetNotesAction {
    type: typeof GET_NOTES;
    payload: NoteWithClientData[];
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
    payload: Note;
}

export interface GetNoteFailAction {
    type: typeof GET_NOTE_FAIL;
    payload: string;
}

export interface GetNoteLoadingAction {
    type: typeof GET_NOTE_LOADING;
}

export interface GetNoteLoadedAction {
    type: typeof GET_NOTE_LOADED;
}

export interface CreateNoteAction {
    type: typeof CREATE_NOTE;
    payload: NoteWithClientData;
}

export interface CreateNoteFailAction {
    type: typeof CREATE_NOTE_FAIL;
    payload: string;
}

export interface CreateNoteLoadingAction {
    type: typeof CREATE_NOTE_LOADING;
}

export interface CreateNoteLoadedAction {
    type: typeof CREATE_NOTE_LOADED;
}

export interface DeleteNoteAction {
    type: typeof DELETE_NOTE;
    payload: string;
}

export interface DeleteNoteFailAction {
    type: typeof DELETE_NOTE_FAIL;
    payload: string;
}

export interface DeleteNoteLoadingAction {
    type: typeof DELETE_NOTE_LOADING;
    payload: string;
}

export interface DeleteNoteLoadedAction {
    type: typeof DELETE_NOTE_LOADED;
    payload: string;
}

export interface ClearNotesAction {
    type: typeof CLEAR_NOTES;
}

export type NotesActionTypes =
    | GetNotesAction
    | GetNotesFailAction
    | GetNotesLoadingAction
    | GetNotesLoadedAction
    | GetNoteAction
    | GetNoteFailAction
    | GetNoteLoadingAction
    | GetNoteLoadedAction
    | CreateNoteAction
    | CreateNoteFailAction
    | CreateNoteLoadingAction
    | CreateNoteLoadedAction
    | DeleteNoteAction
    | DeleteNoteFailAction
    | DeleteNoteLoadingAction
    | DeleteNoteLoadedAction
    | ClearNotesAction;

export const GET_FOLLOWING_ACTIVITY_FEED = 'GET_FOLLOWING_ACTIVITY_FEED';
export const GET_FOLLOWING_ACTIVITY_FEED_FAIL = 'GET_FOLLOWING_ACTIVITY_FEED_FAIL';
export const GET_FOLLOWING_ACTIVITY_FEED_LOADING = 'GET_FOLLOWING_ACTIVITY_FEED_LOADING';
export const GET_FOLLOWING_ACTIVITY_FEED_LOADED = 'GET_FOLLOWING_ACTIVITY_FEED_LOADED';
export const CLEAR_FOLLOWING_ACTIVITY_FEED = 'CLEAR_FOLLOWING_ACTIVITY_FEED';

export const GET_GLOBAL_ACTIVITY_FEED = 'GET_GLOBAL_ACTIVITY_FEED';
export const GET_GLOBAL_ACTIVITY_FEED_FAIL = 'GET_GLOBAL_ACTIVITY_FEED_FAIL';
export const GET_GLOBAL_ACTIVITY_FEED_LOADING = 'GET_GLOBAL_ACTIVITY_FEED_LOADING';
export const GET_GLOBAL_ACTIVITY_FEED_LOADED = 'GET_GLOBAL_ACTIVITY_FEED_LOADED';
export const CLEAR_GLOBAL_ACTIVITY_FEED = 'CLEAR_GLOBAL_ACTIVITY_FEED';

export interface GetFollowingActivityFeedItemsAction {
    type: typeof GET_FOLLOWING_ACTIVITY_FEED;
    payload: { activityFeedItems: ClientActivityFeedItemType[]; totalCountOfActivityFeedItems: number };
}

export interface GetFollowingActivityFeedItemsFailAction {
    type: typeof GET_FOLLOWING_ACTIVITY_FEED_FAIL;
    payload: string;
}

export interface GetFollowingActivityFeedItemsLoadingAction {
    type: typeof GET_FOLLOWING_ACTIVITY_FEED_LOADING;
}

export interface GetFollowingActivityFeedItemsLoadedAction {
    type: typeof GET_FOLLOWING_ACTIVITY_FEED_LOADED;
}

export interface ClearFollowingActivityFeedItemsAction {
    type: typeof CLEAR_FOLLOWING_ACTIVITY_FEED;
}

export interface GetGlobalActivityFeedItemsAction {
    type: typeof GET_GLOBAL_ACTIVITY_FEED;
    payload: { activityFeedItems: ClientActivityFeedItemType[]; totalCountOfActivityFeedItems: number };
}

export interface GetGlobalActivityFeedItemsFailAction {
    type: typeof GET_GLOBAL_ACTIVITY_FEED_FAIL;
    payload: string;
}

export interface GetGlobalActivityFeedItemsLoadingAction {
    type: typeof GET_GLOBAL_ACTIVITY_FEED_LOADING;
}

export interface GetGlobalActivityFeedItemsLoadedAction {
    type: typeof GET_GLOBAL_ACTIVITY_FEED_LOADED;
}

export interface ClearGlobalActivityFeedItemsAction {
    type: typeof CLEAR_GLOBAL_ACTIVITY_FEED;
}

export type ActivityFeedItemsActionTypes =
    | GetFollowingActivityFeedItemsAction
    | GetFollowingActivityFeedItemsFailAction
    | GetFollowingActivityFeedItemsLoadingAction
    | GetFollowingActivityFeedItemsLoadedAction
    | ClearFollowingActivityFeedItemsAction
    | GetGlobalActivityFeedItemsAction
    | GetGlobalActivityFeedItemsFailAction
    | GetGlobalActivityFeedItemsLoadingAction
    | GetGlobalActivityFeedItemsLoadedAction
    | ClearGlobalActivityFeedItemsAction;

export const GET_SOLO_STREAK_LEADERBOARD = 'GET_SOLO_STREAK_LEADERBOARD';
export const GET_SOLO_STREAK_LEADERBOARD_FAIL = 'GET_SOLO_STREAK_LEADERBOARD_FAIL';
export const GET_SOLO_STREAK_LEADERBOARD_LOADING = 'GET_SOLO_STREAK_LEADERBOARD_LOADING';
export const GET_SOLO_STREAK_LEADERBOARD_LOADED = 'GET_SOLO_STREAK_LEADERBOARD_LOADED';

export const GET_TEAM_STREAK_LEADERBOARD = 'GET_TEAM_STREAK_LEADERBOARD';
export const GET_TEAM_STREAK_LEADERBOARD_FAIL = 'GET_TEAM_STREAK_LEADERBOARD_FAIL';
export const GET_TEAM_STREAK_LEADERBOARD_LOADING = 'GET_TEAM_STREAK_LEADERBOARD_LOADING';
export const GET_TEAM_STREAK_LEADERBOARD_LOADED = 'GET_TEAM_STREAK_LEADERBOARD_LOADED';

export const GET_CHALLENGE_STREAK_LEADERBOARD = 'GET_CHALLENGE_STREAK_LEADERBOARD';
export const GET_CHALLENGE_STREAK_LEADERBOARD_FAIL = 'GET_CHALLENGE_STREAK_LEADERBOARD_FAIL';
export const GET_CHALLENGE_STREAK_LEADERBOARD_LOADING = 'GET_CHALLENGE_STREAK_LEADERBOARD_LOADING';
export const GET_CHALLENGE_STREAK_LEADERBOARD_LOADED = 'GET_CHALLENGE_STREAK_LEADERBOARD_LOADED';

export const GET_GLOBAL_USER_LEADERBOARD = 'GET_GLOBAL_USER_LEADERBOARD';
export const GET_GLOBAL_USER_LEADERBOARD_FAIL = 'GET_GLOBAL_USER_LEADERBOARD_FAIL';
export const GET_GLOBAL_USER_LEADERBOARD_LOADING = 'GET_GLOBAL_USER_LEADERBOARD_LOADING';
export const GET_GLOBAL_USER_LEADERBOARD_LOADED = 'GET_GLOBAL_USER_LEADERBOARD_LOADED';

export const GET_FOLLOWING_LEADERBOARD = 'GET_FOLLOWING_LEADERBOARD';
export const GET_FOLLOWING_LEADERBOARD_FAIL = 'GET_FOLLOWING_LEADERBOARD_FAIL';
export const GET_FOLLOWING_LEADERBOARD_LOADING = 'GET_FOLLOWING_LEADERBOARD_LOADING';
export const GET_FOLLOWING_LEADERBOARD_LOADED = 'GET_FOLLOWING_LEADERBOARD_LOADED';

export interface GetSoloStreakLeaderboardAction {
    type: typeof GET_SOLO_STREAK_LEADERBOARD;
    payload: SoloStreakLeaderboardItem[];
}

export interface GetSoloStreakLeaderboardFailAction {
    type: typeof GET_SOLO_STREAK_LEADERBOARD_FAIL;
    payload: string;
}

export interface GetSoloStreakLeaderboardLoadingAction {
    type: typeof GET_SOLO_STREAK_LEADERBOARD_LOADING;
}

export interface GetSoloStreakLeaderboardLoadedAction {
    type: typeof GET_SOLO_STREAK_LEADERBOARD_LOADED;
}

export interface GetTeamStreakLeaderboardAction {
    type: typeof GET_TEAM_STREAK_LEADERBOARD;
    payload: TeamStreakLeaderboardItem[];
}

export interface GetTeamStreakLeaderboardFailAction {
    type: typeof GET_TEAM_STREAK_LEADERBOARD_FAIL;
    payload: string;
}

export interface GetTeamStreakLeaderboardLoadingAction {
    type: typeof GET_TEAM_STREAK_LEADERBOARD_LOADING;
}

export interface GetTeamStreakLeaderboardLoadedAction {
    type: typeof GET_TEAM_STREAK_LEADERBOARD_LOADED;
}

export interface GetChallengeStreakLeaderboardAction {
    type: typeof GET_CHALLENGE_STREAK_LEADERBOARD;
    payload: ChallengeStreakLeaderboardItem[];
}

export interface GetChallengeStreakLeaderboardFailAction {
    type: typeof GET_CHALLENGE_STREAK_LEADERBOARD_FAIL;
    payload: string;
}

export interface GetChallengeStreakLeaderboardLoadingAction {
    type: typeof GET_CHALLENGE_STREAK_LEADERBOARD_LOADING;
}

export interface GetChallengeStreakLeaderboardLoadedAction {
    type: typeof GET_CHALLENGE_STREAK_LEADERBOARD_LOADED;
}

export interface GetGlobalUserLeaderboardAction {
    type: typeof GET_GLOBAL_USER_LEADERBOARD;
    payload: FormattedUser[];
}

export interface GetGlobalUserLeaderboardFailAction {
    type: typeof GET_GLOBAL_USER_LEADERBOARD_FAIL;
    payload: string;
}

export interface GetGlobalUserLeaderboardLoadingAction {
    type: typeof GET_GLOBAL_USER_LEADERBOARD_LOADING;
}

export interface GetGlobalUserLeaderboardLoadedAction {
    type: typeof GET_GLOBAL_USER_LEADERBOARD_LOADED;
}

export interface GetFollowingLeaderboardAction {
    type: typeof GET_FOLLOWING_LEADERBOARD;
    payload: FormattedUser[];
}

export interface GetFollowingLeaderboardFailAction {
    type: typeof GET_FOLLOWING_LEADERBOARD_FAIL;
    payload: string;
}

export interface GetFollowingLeaderboardLoadingAction {
    type: typeof GET_FOLLOWING_LEADERBOARD_LOADING;
}

export interface GetFollowingLeaderboardLoadedAction {
    type: typeof GET_FOLLOWING_LEADERBOARD_LOADED;
}

export type LeaderboardActionTypes =
    | GetSoloStreakLeaderboardAction
    | GetSoloStreakLeaderboardFailAction
    | GetSoloStreakLeaderboardLoadingAction
    | GetSoloStreakLeaderboardLoadedAction
    | GetTeamStreakLeaderboardAction
    | GetTeamStreakLeaderboardFailAction
    | GetTeamStreakLeaderboardLoadingAction
    | GetTeamStreakLeaderboardLoadedAction
    | GetChallengeStreakLeaderboardAction
    | GetChallengeStreakLeaderboardFailAction
    | GetChallengeStreakLeaderboardLoadingAction
    | GetChallengeStreakLeaderboardLoadedAction
    | GetGlobalUserLeaderboardAction
    | GetGlobalUserLeaderboardLoadingAction
    | GetGlobalUserLeaderboardLoadedAction
    | GetGlobalUserLeaderboardFailAction
    | GetFollowingLeaderboardAction
    | GetFollowingLeaderboardFailAction
    | GetFollowingLeaderboardLoadingAction
    | GetFollowingLeaderboardLoadedAction;

export const GET_DATABASE_STATS = 'GET_DATABASE_STATS';
export const GET_DATABASE_STATS_FAIL = 'GET_DATABASE_STATS_FAIL';
export const GET_DATABASE_STATS_LOADING = 'GET_DATABASE_STATS_LOADING';
export const GET_DATABASE_STATS_LOADED = 'GET_DATABASE_STATS_LOADED';

export interface GetDatabaseStatsAction {
    type: typeof GET_DATABASE_STATS;
    payload: DatabaseStats;
}

export interface GetDatabaseStatsFailAction {
    type: typeof GET_DATABASE_STATS_FAIL;
    payload: string;
}

export interface GetDatabaseStatsLoadingAction {
    type: typeof GET_DATABASE_STATS_LOADING;
}

export interface GetDatabaseStatsLoadedAction {
    type: typeof GET_DATABASE_STATS_LOADED;
}

export type DatabaseStatsActionTypes =
    | GetDatabaseStatsAction
    | GetDatabaseStatsFailAction
    | GetDatabaseStatsLoadingAction
    | GetDatabaseStatsLoadedAction;

export type AppActions =
    | NavigationActionTypes
    | AuthActionTypes
    | SoloStreakActionTypes
    | StreakRecommendationsActionTypes
    | TeamStreakActionTypes
    | TeamMemberStreakActionTypes
    | UserActionTypes
    | ChallengeActionTypes
    | ChallengeStreakActionTypes
    | NotesActionTypes
    | ActivityFeedItemsActionTypes
    | LeaderboardActionTypes
    | DatabaseStatsActionTypes;
