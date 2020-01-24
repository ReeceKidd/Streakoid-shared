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
    NAVIGATE_TO_SPECIFIC_SOLO_STREAK,
    DELETE_NOTE_LOADING,
    DELETE_NOTE,
    DELETE_NOTE_LOADED,
    DELETE_NOTE_FAIL,
} from './types';
import { AppActions, AppState } from '..';
import { streakoid as streakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoid';

const noteActions = (streakoid: typeof streakoidSDK) => {
    const getNotes = ({ streakId }: { streakId?: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_NOTES_LOADING });
            const userId = getState().users.currentUser._id;
            let query: { userId: string; streakId?: string } = { userId };
            if (streakId) {
                query = { ...query, streakId };
            }
            const notes = await streakoid.notes.getAll(query);
            const notesWithClientData = notes.map(note => ({
                ...note,
                deleteNoteIsLoading: false,
            }));
            dispatch({ type: GET_NOTES, payload: notesWithClientData });
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

    const createNoteForSoloStreak = ({ text, soloStreakId }: { text: string; soloStreakId: string }) => async (
        dispatch: Dispatch<AppActions>,
        getState: () => AppState,
    ): Promise<void> => {
        try {
            dispatch({ type: CREATE_NOTE_LOADING });
            const userId = getState().users.currentUser._id;
            const note = await streakoid.notes.create({
                userId,
                streakId: soloStreakId,
                text,
            });
            dispatch({ type: CREATE_NOTE, payload: note });
            dispatch({ type: NAVIGATE_TO_SPECIFIC_SOLO_STREAK, payload: soloStreakId });
            dispatch({ type: CREATE_NOTE_LOADED });
        } catch (err) {
            dispatch({ type: CREATE_NOTE_LOADED });
            if (err.response) {
                dispatch({ type: CREATE_NOTE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: CREATE_NOTE_FAIL, payload: err.message });
            }
        }
    };

    const deleteNote = ({ noteId }: { noteId: string }) => async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            dispatch({ type: DELETE_NOTE_LOADING, payload: noteId });
            await streakoid.notes.deleteOne({ noteId });
            dispatch({ type: DELETE_NOTE, payload: noteId });
            dispatch({ type: DELETE_NOTE_LOADED, payload: noteId });
        } catch (err) {
            dispatch({ type: DELETE_NOTE_LOADED, payload: noteId });
            if (err.response) {
                dispatch({ type: DELETE_NOTE_FAIL, payload: err.response.data.message });
            } else {
                dispatch({ type: DELETE_NOTE_FAIL, payload: err.message });
            }
        }
    };

    return {
        getNotes,
        getNote,
        createNoteForSoloStreak,
        deleteNote,
    };
};

export { noteActions };
