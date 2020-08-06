import { Dispatch } from 'redux';
import GhostContentApi from '@tryghost/content-api';

import {
    GET_POSTS,
    GET_POSTS_LOADING,
    GET_POSTS_LOADED,
    GET_POSTS_FAIL,
    GET_POST_LOADING,
    GET_POST,
    GET_POST_LOADED,
} from './types';
import { AppActions } from '..';

const api = new GhostContentApi({
    url: 'https://ghost.streakoid.com',
    key: 'a3d6da37ffb78c9edf10bf0c92',
    version: 'v3',
});

const contentActions = () => {
    const getPosts = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_POSTS_LOADING });
            const posts = await api.posts.browse({ limit: 5 });
            dispatch({ type: GET_POSTS, payload: { posts } });
            dispatch({ type: GET_POSTS_LOADED });
        } catch (err) {
            dispatch({ type: GET_POSTS_LOADED });
            if (err.response) {
                dispatch({ type: GET_POSTS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_POSTS_FAIL, payload: err.message });
            }
        }
    };

    const getPost = ({ postId }: { postId: string }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_POST_LOADING });

            const post = await api.posts.read({ id: postId });

            dispatch({ type: GET_POST, payload: { post } });
            dispatch({ type: GET_POST_LOADED });
        } catch (err) {
            dispatch({ type: GET_POST_LOADED });
            if (err.response) {
                dispatch({ type: GET_POSTS_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_POSTS_FAIL, payload: err.message });
            }
        }
    };

    return {
        getPosts,
        getPost,
    };
};

export { contentActions };
