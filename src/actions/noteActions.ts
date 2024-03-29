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
    NAVIGATE_TO_SPECIFIC_CHALLENGE_STREAK,
    NAVIGATE_TO_SPECIFIC_TEAM_STREAK,
    CLEAR_NOTES,
} from './types';
import { AppActions, AppState } from '..';
import { StreakoidSDK } from '@streakoid/streakoid-sdk/lib/streakoidSDKFactory';
import { NoteWithClientData } from '../reducers/notesReducer';
import StreakTypes from '@streakoid/streakoid-models/lib/Types/StreakTypes';

const noteActions = (streakoid: StreakoidSDK) => {
    const getNotes = ({ subjectId, userId }: { subjectId?: string; userId?: string }) => async (
        dispatch: Dispatch<AppActions>,
    ): Promise<void> => {
        try {
            dispatch({ type: GET_NOTES_LOADING });
            let query: { userId?: string; subjectId?: string } = {};
            if (userId) {
                query = { ...query, userId };
            }
            if (subjectId) {
                query = { ...query, subjectId };
            }

            const notes = await streakoid.notes.getAll(query);
            const notesWithClientData = await Promise.all(
                notes.map(async note => {
                    const noteCreator = await streakoid.users.getOne(note.userId);
                    return {
                        ...note,
                        deleteNoteIsLoading: false,
                        noteCreatorUsername: noteCreator && noteCreator.username,
                        noteCreatorProfilePicture:
                            noteCreator && noteCreator.profileImages && noteCreator.profileImages.originalImageUrl,
                    };
                }),
            );
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

    const createNote = ({
        text,
        subjectId,
        streakType,
    }: {
        text: string;
        subjectId: string;
        streakType: StreakTypes;
    }) => async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        try {
            dispatch({ type: CREATE_NOTE_LOADING });
            const userId = getState().users.currentUser._id;
            const noteCreator = await streakoid.users.getOne(userId);
            const note = await streakoid.notes.create({
                userId,
                subjectId,
                text,
                streakType,
            });
            const notesWithClientData: NoteWithClientData = {
                ...note,
                deleteNoteIsLoading: false,
                noteCreatorUsername: noteCreator && noteCreator.username,
                noteCreatorProfilePicture:
                    noteCreator && noteCreator.profileImages && noteCreator.profileImages.originalImageUrl,
            };
            dispatch({ type: CREATE_NOTE, payload: notesWithClientData });
            if (streakType === StreakTypes.solo) {
                dispatch({ type: NAVIGATE_TO_SPECIFIC_SOLO_STREAK, payload: subjectId });
            }
            if (streakType === StreakTypes.challenge) {
                dispatch({ type: NAVIGATE_TO_SPECIFIC_CHALLENGE_STREAK, payload: subjectId });
            }
            if (streakType === StreakTypes.team) {
                dispatch({ type: NAVIGATE_TO_SPECIFIC_TEAM_STREAK, payload: subjectId });
            }
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

    const clearNotes = (): AppActions => ({
        type: CLEAR_NOTES,
    });

    return {
        getNotes,
        getNote,
        createNote,
        deleteNote,
        clearNotes,
    };
};

export { noteActions };
