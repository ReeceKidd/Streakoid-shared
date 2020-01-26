import {
    GET_ACTIVITIES,
    GET_ACTIVITIES_FAIL,
    GET_ACTIVITIES_LOADED,
    GET_ACTIVITIES_LOADING,
    ActivitiesActionTypes,
} from '../actions/types';
import { Activity } from '@streakoid/streakoid-sdk/lib';

export interface ActivityReducerState {
    activities: Activity[];
    getAllActivitiesLoading: boolean;
    getAllActivitiesErrorMessage: string;
}

const initialState: ActivityReducerState = {
    activities: [],
    getAllActivitiesLoading: false,
    getAllActivitiesErrorMessage: '',
};

const activityReducer = (state = initialState, action: ActivitiesActionTypes): ActivityReducerState => {
    switch (action.type) {
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            };

        case GET_ACTIVITIES_FAIL:
            return {
                ...state,
                getAllActivitiesErrorMessage: action.payload,
            };

        case GET_ACTIVITIES_LOADING:
            return {
                ...state,
                getAllActivitiesLoading: true,
            };

        case GET_ACTIVITIES_LOADED:
            return {
                ...state,
                getAllActivitiesLoading: false,
            };

        default:
            return state;
    }
};

export { activityReducer };
