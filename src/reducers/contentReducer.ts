import {
    GET_POSTS,
    GET_POSTS_FAIL,
    GET_POSTS_LOADED,
    GET_POSTS_LOADING,
    GET_POST,
    GET_POST_FAIL,
    GET_POST_LOADED,
    GET_POST_LOADING,
    ContentActionTypes,
} from '../actions/types';
import { PostsOrPages, PostOrPage } from '@tryghost/content-api';

export interface ContentReducerState {
    getPostsIsLoading: boolean;
    getPostsErrorMessage: string;

    getSelectedPostIsLoading: boolean;
    getSelectedPostErrorMessage: string;
    posts?: PostsOrPages;
    selectedPost?: PostOrPage;
}

const initialState: ContentReducerState = {
    getPostsIsLoading: false,
    getPostsErrorMessage: '',
    getSelectedPostIsLoading: false,
    getSelectedPostErrorMessage: '',
};

const contentReducer = (state = initialState, action: ContentActionTypes): ContentReducerState => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
            };

        case GET_POSTS_FAIL:
            return {
                ...state,
                getPostsErrorMessage: action.payload,
            };

        case GET_POSTS_LOADING:
            return {
                ...state,
                getPostsIsLoading: true,
            };

        case GET_POSTS_LOADED:
            return {
                ...state,
                getPostsIsLoading: false,
            };

        case GET_POST:
            return {
                ...state,
                selectedPost: action.payload.post,
            };

        case GET_POST_FAIL:
            return {
                ...state,
                getSelectedPostErrorMessage: action.payload,
            };

        case GET_POST_LOADING:
            return {
                ...state,
                getSelectedPostIsLoading: true,
            };

        case GET_POST_LOADED:
            return {
                ...state,
                getSelectedPostIsLoading: false,
            };

        default:
            return state;
    }
};

export { contentReducer };
