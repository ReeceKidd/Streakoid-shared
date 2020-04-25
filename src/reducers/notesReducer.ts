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
    DELETE_NOTE,
    DELETE_NOTE_FAIL,
    DELETE_NOTE_LOADING,
    DELETE_NOTE_LOADED,
    CLEAR_NOTES,
    CREATE_NOTE,
} from '../actions/types';
import { Note } from '@streakoid/streakoid-models/lib/Models/Note';

export interface NoteReducerState {
    notes: NoteWithClientData[];
    getMultipleNotesIsLoading: boolean;
    getMultipleNotesErrorMessage: string;
    selectedNote: Note;
    getSelectedNoteIsLoading: boolean;
    getSelectedNoteErrorMessage: string;
    createNoteIsLoading: boolean;
    createNoteErrorMessage: string;
    deleteNoteErrorMessage: string;
}

const initialState: NoteReducerState = {
    notes: [],
    selectedNote: {
        _id: '',
        text: '',
        subjectId: '',
        userId: '',
        updatedAt: '',
        createdAt: '',
    },
    getMultipleNotesIsLoading: false,
    getMultipleNotesErrorMessage: '',
    getSelectedNoteIsLoading: false,
    getSelectedNoteErrorMessage: '',
    createNoteIsLoading: false,
    createNoteErrorMessage: '',
    deleteNoteErrorMessage: '',
};

export interface NoteWithClientData extends Note {
    deleteNoteIsLoading: boolean;
    noteCreatorUsername: string;
    noteCreatorProfilePicture: string;
}

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

        case CREATE_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload],
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

        case DELETE_NOTE:
            return {
                ...state,
                notes: [...state.notes.filter(note => note._id !== action.payload)],
            };

        case DELETE_NOTE_FAIL:
            return {
                ...state,
                deleteNoteErrorMessage: action.payload,
            };

        case DELETE_NOTE_LOADING:
            return {
                ...state,
                notes: [
                    ...state.notes.map(note => {
                        if (note._id === action.payload) {
                            return { ...note, deleteNoteIsLoading: true };
                        }
                        return note;
                    }),
                ],
            };

        case DELETE_NOTE_LOADED:
            return {
                ...state,
                notes: [
                    ...state.notes.map(note => {
                        if (note._id === action.payload) {
                            return { ...note, deleteNoteIsLoading: false };
                        }
                        return note;
                    }),
                ],
            };

        case CLEAR_NOTES:
            return {
                ...state,
                notes: [],
            };

        default:
            return state;
    }
};

export { noteReducer };
