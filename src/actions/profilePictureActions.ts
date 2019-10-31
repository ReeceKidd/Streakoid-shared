import { SupportedRequestHeaders, ProfileImages, RouterCategories } from '@streakoid/streakoid-sdk/lib';
import {
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_IS_LOADED,
    NAVIGATE_TO_LOGIN,
    SESSION_EXPIRED,
    UPLOAD_PROFILE_IMAGE_FAIL,
    CLEAR_UPLOAD_PROFILE_IMAGE_MESSAGES,
    UPLOAD_PROFILE_IMAGE_IS_LOADING,
} from './types';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { AppActions, AppState } from '..';

const profilePictureActions = (apiUrl: string, getIdToken: () => string | Promise<string>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadProfileImage = ({ formData }: { formData: any }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            const { users } = getState();
            const { currentUser } = users;
            const { timezone } = currentUser;
            dispatch({ type: UPLOAD_PROFILE_IMAGE_IS_LOADING });
            const idToken = await getIdToken();
            const response: AxiosResponse<ProfileImages> = await axios.post(
                `${apiUrl}/v1/${RouterCategories.profileImages}`,
                formData,
                {
                    headers: {
                        [SupportedRequestHeaders.Authorization]: idToken,
                        [SupportedRequestHeaders.xTimezone]: timezone,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            const profileImages = response.data;
            dispatch({ type: UPLOAD_PROFILE_IMAGE, payload: profileImages });
            dispatch({ type: UPLOAD_PROFILE_IMAGE_IS_LOADED });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch({ type: NAVIGATE_TO_LOGIN });
                dispatch({ type: SESSION_EXPIRED });
            }
            dispatch({ type: UPLOAD_PROFILE_IMAGE_IS_LOADED });
            if (error.response) {
                dispatch({ type: UPLOAD_PROFILE_IMAGE_FAIL, payload: error.response.data.message });
            } else {
                dispatch({ type: UPLOAD_PROFILE_IMAGE_FAIL, payload: error.message });
            }
        }
    };

    const clearUploadProfileImageMessages = (): AppActions => ({
        type: CLEAR_UPLOAD_PROFILE_IMAGE_MESSAGES,
    });

    return {
        uploadProfileImage,
        clearUploadProfileImageMessages,
    };
};

export { profilePictureActions };