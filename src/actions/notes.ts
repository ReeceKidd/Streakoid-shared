import { Dispatch } from 'redux';

import {
    GET_NOTES,
    GET_NOTES_LOADING,
    GET_NOTES_LOADED,
    GET_NOTES_FAIL,
    GET_NOTE_LOADING,
    GET_NOTE,
    CREATE_NOTE_LOADING,
    CREATE_NOTE,
    CREATE_NOTE_LOADED,
    CREATE_NOTE_FAIL,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

const noteActions = (streakoid: typeof streakoidSDK) => {
    const getNotes = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: GET_NOTES_LOADING });
            const userId = getState().users.currentUser._id;
            const notes = await streakoid.notes.getAll({
                userId,
            });

            dispatch({ type: GET_NOTES, payload: notes });
            dispatch({ type: GET_NOTES_LOADED });
        } catch (err) {
            dispatch({ type: GET_NOTES_LOADED });
            if (err.response) {
                dispatch({ type: GET_NOTES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_NOTES_FAIL, payload: err.message });
            }
        }
    };

    const getNote = (noteId: string) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: GET_NOTE_LOADING });
            const note = await streakoid.notes.getOne(noteId);
            dispatch({ type: GET_NOTE, payload: note });
            dispatch({ type: GET_NOTES_LOADED });
        } catch (err) {
            dispatch({ type: GET_NOTES_LOADED });
            if (err.response) {
                dispatch({ type: GET_NOTES_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: GET_NOTES_FAIL, payload: err.message });
            }
        }
    };

    const createNote = ({ text, streakId }: { text: string; streakId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_NOTE_LOADING });
            const userId = getState().users.currentUser._id;
            const note = await streakoid.notes.create({
                userId,
                streakId,
                text,
            });
            dispatch({ type: CREATE_NOTE, payload: note });
            dispatch({ type: CREATE_NOTE_LOADED });
        } catch (err) {
            dispatch({ type: CREATE_NOTE_LOADED });
            if (err.response) {
                dispatch({ type: CREATE_NOTE_FAIL, errorMessage: err.response.data.message });
            } else {
                dispatch({ type: CREATE_NOTE_FAIL, errorMessage: err.message });
            }
        }
    };

    return {
        getNotes,
        getNote,
        createNote,
    };
};

export { noteActions };
