import { Note } from '@streakoid/streakoid-sdk/lib';

import {
    GET_NOTES,
    GET_NOTES_FAIL,
    GET_NOTES_LOADED,
    GET_NOTES_LOADING,
    GET_NOTE,
    GET_NOTE_FAIL,
    GET_NOTE_LOADED,
    GET_NOTE_LOADING,
    CREATE_NOTE_FAIL,
    CREATE_NOTE_LOADING,
    CREATE_NOTE_LOADED,
    NotesActionTypes,
} from '../actions/types';

export interface NoteReducerState {
    notes: Note[];
    getMultipleNotesIsLoading: boolean;
    getMultipleNotesErrorMessage: string;
    selectedNote: Note;
    getSelectedNoteIsLoading: boolean;
    getSelectedNoteErrorMessage: string;
    createNoteIsLoading: boolean;
    createNoteErrorMessage: string;
}

const initialState: NoteReducerState = {
    notes: [],
    selectedNote: { _id: '', streakId: '', text: '', userId: '', updatedAt: '', createdAt: '' },
    getMultipleNotesIsLoading: false,
    getMultipleNotesErrorMessage: '',
    getSelectedNoteIsLoading: false,
    getSelectedNoteErrorMessage: '',
    createNoteIsLoading: false,
    createNoteErrorMessage: '',
};

const noteReducer = (state = initialState, action: NotesActionTypes): NoteReducerState => {
    switch (action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload,
            };

        case GET_NOTES_FAIL:
            return {
                ...state,
                getMultipleNotesErrorMessage: action.payload,
            };

        case GET_NOTES_LOADING:
            return {
                ...state,
                getMultipleNotesIsLoading: true,
            };

        case GET_NOTES_LOADED:
            return {
                ...state,
                getMultipleNotesIsLoading: false,
            };

        case GET_NOTE:
            return {
                ...state,
                selectedNote: action.payload,
            };

        case GET_NOTE_FAIL:
            return {
                ...state,
                getSelectedNoteErrorMessage: action.payload,
            };

        case GET_NOTE_LOADING:
            return {
                ...state,
                getSelectedNoteIsLoading: true,
            };

        case GET_NOTE_LOADED:
            return {
                ...state,
                getSelectedNoteIsLoading: false,
            };

        case CREATE_NOTE_FAIL:
            return {
                ...state,
                createNoteErrorMessage: action.payload,
            };

        case CREATE_NOTE_LOADING:
            return {
                ...state,
                createNoteIsLoading: true,
            };

        case CREATE_NOTE_LOADED:
            return {
                ...state,
                createNoteIsLoading: false,
            };

        default:
            return state;
    }
};

export { noteReducer };
